import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  ACTIONS,
  applyAnswer,
  chooseAction,
  createInitialState,
  evaluateAnswer,
  loadState,
  normalizeAnswer,
  renderApp,
  saveState,
  selectNextTask,
  switchMode,
  TASKS,
} from "./app.js";

test("normalization catches changes to case, whitespace and Polish punctuation", () => {
  assert.equal(normalizeAnswer("  Piętnaście. "), "pietnascie");
});

test("an empty answer stays no_response instead of becoming a knowledge error", () => {
  assert.equal(evaluateAnswer(TASKS[0], "   "), "no_response");
});

test("nie wiem produces exactly one GIVE_HINT action", () => {
  const state = createInitialState();
  const result = evaluateAnswer(TASKS[0], "nie wiem");
  assert.equal(chooseAction(state, TASKS[0], result), ACTIONS.GIVE_HINT);
});

test("an answer after help is SUPPORTED and never retained", () => {
  const state = createInitialState();
  state.modeSessions.focus.helpLevel = 1;
  const next = applyAnswer(state, TASKS[0].answers[0]).state;
  assert.equal(next.knowledge[TASKS[0].atomId].status, "SUPPORTED");
});

test("diagnosis cannot select CHECK_PREREQUISITE after four questions", () => {
  const state = createInitialState();
  state.modeSessions.focus.diagnosticCount = 4;
  assert.notEqual(chooseAction(state, TASKS[0], "incorrect"), ACTIONS.CHECK_PREREQUISITE);
});

test("the third consecutive error produces TAKE_BREAK", () => {
  const state = createInitialState();
  state.modeSessions.focus.consecutiveErrors = 2;
  assert.equal(chooseAction(state, TASKS[0], "incorrect"), ACTIONS.TAKE_BREAK);
});

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test("switching mode preserves its cursor and the shared knowledge profile", () => {
  const state = createInitialState();
  state.modeSessions.focus.currentStep = 2;
  state.knowledge["TIME.ADD_ACROSS_HOUR"] = { status: "INDEPENDENT" };
  const explore = switchMode(state, "explore");
  const back = switchMode(explore, "focus");
  assert.equal(back.modeSessions.focus.currentStep, 2);
  assert.equal(back.knowledge["TIME.ADD_ACROSS_HOUR"].status, "INDEPENDENT");
});

test("state round-trips through storage", () => {
  const storage = memoryStorage();
  const state = switchMode(createInitialState(), "review");
  saveState(storage, state);
  assert.deepEqual(loadState(storage), state);
});

test("corrupt storage falls back to the initial state", () => {
  const storage = memoryStorage({ "hania-tutor-state-v1": "{" });
  assert.deepEqual(loadState(storage), createInitialState());
});

test("incomplete stored sessions fall back safely", () => {
  const storage = memoryStorage({
    "hania-tutor-state-v1": JSON.stringify({ version: 1, knowledge: {}, modeSessions: {} }),
  });
  assert.deepEqual(loadState(storage), createInitialState());
});

test("older valid sessions receive new safe defaults", () => {
  const old = createInitialState();
  Object.values(old.modeSessions).forEach(session => {
    delete session.completedCount;
    delete session.subject;
  });
  const loaded = loadState(memoryStorage({ "hania-tutor-state-v1": JSON.stringify(old) }));
  assert.equal(loaded.modeSessions.review.completedCount, 0);
  assert.equal(loaded.modeSessions.explore.subject, null);
});

test("review mode selects a due task and never unseen content", () => {
  const state = createInitialState();
  state.knowledge["TIME.ADD_ACROSS_HOUR"] = { status: "SUPPORTED", nextReviewAt: 0 };
  assert.equal(selectNextTask(state, "review").atomId, "TIME.ADD_ACROSS_HOUR");
});

test("the task bank covers every required topic group", () => {
  const topics = new Set(TASKS.map(task => task.topic));
  [
    "clock", "elapsed", "calendar", "roman", "length",
    "living", "organisms", "life-processes", "anthropogenic", "stimulus", "senses",
    "numbers", "classroom", "pronouns", "be", "articles", "adjective-noun",
  ].forEach(topic => assert.ok(topics.has(topic), `missing ${topic}`));
});

test("every learning task asks one question and supports an adaptive response", () => {
  TASKS.filter(task => task.kind !== "end").forEach(task => {
    assert.equal((task.prompt.match(/\?/g) ?? []).length, 1, task.id);
    assert.ok(task.hint || task.example || task.prerequisitePrompt, task.id);
  });
});

test("each answer records one allowed action", () => {
  const { state, action } = applyAnswer(createInitialState(), "wrong");
  assert.ok(Object.values(ACTIONS).includes(action));
  assert.equal(state.history.at(-1).action, action);
});

test("a wrong review answer ends review without starting diagnosis", () => {
  const state = switchMode(createInitialState(), "review");
  state.knowledge[TASKS[0].atomId] = { status: "SUPPORTED", nextReviewAt: 0 };
  const result = applyAnswer(state, "źle");
  assert.equal(result.action, ACTIONS.END_SESSION);
  assert.equal(result.state.modeSessions.review.currentStep, 0);
});

test("review ends after five completed micro-tasks", () => {
  let state = switchMode(createInitialState(), "review");
  TASKS.slice(0, 6).forEach(task => { state.knowledge[task.atomId] = { status: "SUPPORTED", nextReviewAt: 0 }; });
  let result;
  for (let index = 0; index < 5; index += 1) {
    const task = selectNextTask(state, "review");
    result = applyAnswer(state, task.answers[0]);
    state = result.state;
  }
  assert.equal(result.action, ACTIONS.END_SESSION);
  assert.equal(state.modeSessions.review.completedCount, 5);
});

test("independent answers in two modes create transfer evidence", () => {
  let state = createInitialState();
  state = applyAnswer(state, TASKS[0].answers[0]).state;
  state.knowledge[TASKS[0].atomId].nextReviewAt = 0;
  state = switchMode(state, "review");
  state = applyAnswer(state, TASKS[0].answers[0]).state;
  assert.equal(state.knowledge[TASKS[0].atomId].status, "TRANSFERRED");
});

test("explorer respects subject and prerequisite knowledge", () => {
  const state = switchMode(createInitialState(), "explore");
  state.modeSessions.explore.subject = "nature";
  state.modeSessions.explore.currentTaskId = "life-process-growing";
  assert.equal(selectNextTask(state, "explore").id, "living-mushroom");
});

test("mode-specific views expose explorer map, review counter and progress history", () => {
  const root = { className: "", innerHTML: "" };
  const explore = switchMode(createInitialState(), "explore");
  renderApp(root, explore);
  assert.match(root.innerHTML, /Wybierz dziedzinę/);
  explore.modeSessions.explore.subject = "nature";
  renderApp(root, explore);
  assert.match(root.innerHTML, /explorer-map/);

  const review = switchMode(createInitialState(), "review");
  review.knowledge[TASKS[0].atomId] = { status: "SUPPORTED", nextReviewAt: 0 };
  renderApp(root, review);
  assert.match(root.innerHTML, /pozostało: 5/);

  renderApp(root, { ...review, screen: "progress" });
  assert.match(root.innerHTML, /Ostatnie działania/);
});

test("HTML exposes the application shell and polite feedback", async () => {
  const html = await readFile(new URL("./index.html", import.meta.url), "utf8");
  assert.match(html, /<main[^>]+id="app"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /<script type="module" src="\.\/app\.js"><\/script>/);
});

test("CSS includes keyboard focus, reduced motion and mobile layout", async () => {
  const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media.*max-width/s);
});
