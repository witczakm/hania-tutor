import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  ACTIONS,
  applyAnswer,
  chooseAction,
  createInitialState,
  evaluateAnswer,
  getTaskPresentation,
  loadState,
  normalizeAnswer,
  renderApp,
  saveState,
  selectNextTask,
  switchMode,
  switchSubject,
  speakQuestion,
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

test("unknown stored active mode falls back safely", () => {
  const broken = { ...createInitialState(), activeMode: "broken" };
  const loaded = loadState(memoryStorage({ "hania-tutor-state-v1": JSON.stringify(broken) }));
  assert.deepEqual(loaded, createInitialState());
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
  assert.equal(result.state.modeSessions.focus.currentTaskId, TASKS[0].id);
});

test("a review error sends the exact difficult atom to focus mode", () => {
  const task = TASKS[1];
  const state = switchMode(createInitialState(), "review");
  state.knowledge[task.atomId] = { status: "SUPPORTED", nextReviewAt: 0 };
  state.modeSessions.focus.currentTaskId = "living-mushroom";
  const result = applyAnswer(state, "źle");
  assert.equal(result.state.modeSessions.focus.currentTaskId, task.id);
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
  state.activeSubject = "nature";
  state.modeSessions.explore.currentTaskId = "life-process-growing";
  assert.equal(selectNextTask(state, "explore").id, "living-mushroom");
});

test("mode-specific views expose explorer map, review counter and progress history", () => {
  const root = { className: "", innerHTML: "" };
  const explore = switchMode(createInitialState(), "explore");
  renderApp(root, explore);
  assert.match(root.innerHTML, /explorer-map/);

  const review = switchMode(createInitialState(), "review");
  review.knowledge[TASKS[0].atomId] = { status: "SUPPORTED", nextReviewAt: 0 };
  renderApp(root, review);
  assert.match(root.innerHTML, /pozostało: 5/);

  renderApp(root, { ...review, screen: "progress" });
  assert.match(root.innerHTML, /Ostatnie działania/);
});

test("subject focus filters every mode and keeps a cursor per subject", () => {
  let state = switchSubject(createInitialState(), "math");
  assert.equal(selectNextTask(state, "focus").subject, "math");
  state.modeSessions.focus.currentTaskId = "time-after-1445";
  state = switchSubject(state, "nature");
  assert.equal(selectNextTask(state, "focus").subject, "nature");
  state = switchSubject(state, "math");
  assert.equal(selectNextTask(state, "focus").id, "time-after-1445");

  state = switchMode(state, "review");
  state.knowledge[TASKS.find(task => task.subject === "math").atomId] = { status: "SUPPORTED", nextReviewAt: 0 };
  state.knowledge[TASKS.find(task => task.subject === "english").atomId] = { status: "SUPPORTED", nextReviewAt: 0 };
  assert.equal(selectNextTask(state, "review").subject, "math");
});

test("subject focus keeps diagnosis and feedback separate per subject", () => {
  let state = switchSubject(createInitialState(), "math");
  state = applyAnswer(state, "źle").state;
  assert.equal(state.modeSessions.focus.currentStep, 1);
  state = switchSubject(state, "english");
  assert.equal(state.modeSessions.focus.currentStep, 0);
  assert.equal(state.modeSessions.focus.lastFeedback, "");
  state = switchSubject(state, "math");
  assert.equal(state.modeSessions.focus.currentStep, 1);
});

test("the five-item review limit stays global while subjects change", () => {
  let state = switchMode(createInitialState(), "review");
  state.modeSessions.review.completedCount = 4;
  state = switchSubject(state, "english");
  assert.equal(state.modeSessions.review.completedCount, 4);
});

test("explorer resumes its unseen ready cursor", () => {
  const state = switchMode(switchSubject(createInitialState(), "math"), "explore");
  state.modeSessions.explore.currentTaskId = "roman-nine";
  state.modeSessions.explore.taskBySubject.math = "roman-nine";
  assert.equal(selectNextTask(state, "explore").id, "roman-nine");
});

test("the subject switch stays visible during learning", () => {
  const root = { className: "", innerHTML: "" };
  renderApp(root, switchMode(createInitialState(), "focus"));
  ["Wszystko", "Matematyka", "Przyroda", "Angielski"].forEach(label => assert.match(root.innerHTML, new RegExp(label)));
  assert.match(root.innerHTML, /subject-switcher/);
});

test("every task has a concise visual presentation and valid choices", () => {
  TASKS.forEach(task => {
    const presentation = getTaskPresentation(task);
    assert.ok(presentation.visualLabel, task.id);
    assert.ok(presentation.prompt.length <= 70, task.id);
    assert.ok(presentation.choices.length >= 2 && presentation.choices.length <= 3, task.id);
    assert.ok(presentation.choices.some(choice => task.answers.map(normalizeAnswer).includes(normalizeAnswer(choice))), task.id);
    assert.ok(presentation.prerequisiteChoices.some(choice => task.prerequisiteAnswers.map(normalizeAnswer).includes(normalizeAnswer(choice))), task.id);
  });
});

test("learning view leads with a graphic, listening and large answer choices", () => {
  const root = { className: "", innerHTML: "" };
  renderApp(root, switchMode(createInitialState(), "focus"));
  assert.match(root.innerHTML, /data-learning-visual/);
  assert.match(root.innerHTML, /id="listen-question"/);
  assert.match(root.innerHTML, /class="choice-grid"/);
  assert.doesNotMatch(root.innerHTML, /<input/);
});

test("a prerequisite question uses a neutral earlier-step graphic", () => {
  const root = { className: "", innerHTML: "" };
  const state = switchMode(createInitialState(), "focus");
  state.modeSessions.focus.currentStep = 1;
  renderApp(root, state);
  assert.match(root.innerHTML, /data-visual-step="prerequisite"/);
  assert.match(root.innerHTML, /data-prerequisite-for="clock-minute-hand"/);
  assert.match(root.innerHTML, /aria-label="Zegar z długą wskazówką na dwójce"/);
  assert.doesNotMatch(root.innerHTML, /Zegar z długą wskazówką na jedenastce/);
});

test("header navigation has unique focus targets", () => {
  const root = { className: "", innerHTML: "" };
  renderApp(root, createInitialState());
  assert.equal((root.innerHTML.match(/data-nav="brand"/g) ?? []).length, 1);
  assert.equal((root.innerHTML.match(/data-nav="modes"/g) ?? []).length, 1);
  assert.equal((root.innerHTML.match(/data-nav="progress"/g) ?? []).length, 1);
});

test("vocabulary speech never says the correct answer", () => {
  const pencilCase = getTaskPresentation(TASKS.find(task => task.id === "english-pencil-case"));
  const brownDesk = getTaskPresentation(TASKS.find(task => task.id === "english-brown-desk"));
  assert.doesNotMatch(normalizeAnswer(pencilCase.speech), /pencil case/);
  assert.doesNotMatch(normalizeAnswer(pencilCase.prerequisiteSpeech), /pencil/);
  assert.doesNotMatch(normalizeAnswer(brownDesk.speech), /brown desk/);
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

test("CSS includes calm educational motion with a reduced-motion path", async () => {
  const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");
  assert.match(css, /@keyframes clock-advance/);
  assert.match(css, /@keyframes signal-travel/);
  assert.match(css, /\.answer-choice/);
  assert.match(css, /prefers-reduced-motion/);
});

test("speech cleanup keeps its button reference after the click event ends", () => {
  const classes = new Set();
  const button = {
    dataset: { speech: "Which number is thirteen?", lang: "en-GB" },
    classList: { add: value => classes.add(value), remove: value => classes.delete(value) },
  };
  let utterance;
  class FakeUtterance {
    constructor(text) { this.text = text; this.listeners = {}; utterance = this; }
    addEventListener(name, callback) { this.listeners[name] = callback; }
  }
  const synthesis = { cancel() {}, speak() {} };
  speakQuestion(button, synthesis, FakeUtterance);
  assert.equal(utterance.lang, "en-GB");
  assert.equal(classes.has("is-speaking"), true);
  utterance.listeners.end();
  assert.equal(classes.has("is-speaking"), false);
});
