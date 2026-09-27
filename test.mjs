import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import {
  ACTIONS,
  advanceScene,
  answerScene,
  applyAnswer,
  beginScene,
  chooseAction,
  createInitialState,
  evaluateAnswer,
  getTaskPresentation,
  loadState,
  normalizeAnswer,
  renderApp,
  saveState,
  SCENES,
  selectNextTask,
  shouldOfferScene,
  skipScene,
  switchMode,
  switchSubject,
  speakQuestion,
  TASKS,
} from "./app.js";

test("each subject lesson teaches several ideas before its end quiz", () => {
  assert.deepEqual(Object.keys(SCENES), ["time-after-1445", "living-mushroom", "english-an-apple"]);
  Object.values(SCENES).forEach(scene => {
    assert.match(scene.art, /^\.\/images\/scene-/);
    assert.ok(scene.artAlt.length > 20);
    assert.ok(scene.steps.length >= 7, scene.id);
    assert.ok(scene.steps.every(step => step.beat && step.shot), scene.id);
    assert.ok(scene.checks.length >= 5, scene.id);
    scene.checks.forEach(check => {
      assert.equal((check.prompt.match(/\?/g) ?? []).length, 1, check.prompt);
      assert.ok(check.choices.length >= 2 && check.choices.length <= 3, check.prompt);
      assert.ok(check.choices.some(choice => check.answers.map(normalizeAnswer).includes(normalizeAnswer(choice))), check.prompt);
    });
  });
});

test("a new explorer subject offers its Nitka lesson once", () => {
  const state = switchSubject(switchMode(createInitialState(), "explore"), "math");
  const task = TASKS.find(item => item.id === "clock-minute-hand");
  assert.equal(shouldOfferScene(state, task), true);
  assert.equal(shouldOfferScene(skipScene(beginScene(state, task.id)), task), false);
});

test("a wrong scene answer replays one frame without changing knowledge", () => {
  let state = beginScene(createInitialState(), "time-after-1445");
  state.modeSessions.focus.scene.phase = "check";
  const before = structuredClone(state.knowledge);
  const result = answerScene(state, "15:45");
  assert.equal(result.result, "incorrect");
  assert.equal(result.state.modeSessions.focus.scene.step, SCENES["time-after-1445"].checks[0].replayStep);
  assert.equal(result.state.modeSessions.focus.scene.returnToQuiz, true);
  assert.deepEqual(result.state.knowledge, before);
});

test("correct quiz answers advance one at a time and record supported knowledge", () => {
  const state = beginScene(createInitialState(), "time-after-1445");
  state.modeSessions.focus.scene.phase = "check";
  const result = answerScene(state, "55");
  assert.equal(result.result, "correct");
  assert.equal(result.state.modeSessions.focus.scene.taskId, "time-after-1445");
  assert.equal(result.state.modeSessions.focus.scene.quizIndex, 1);
  assert.equal(result.state.knowledge["TIME.READ_MINUTES"].status, "SUPPORTED");
});

test("a replayed teaching frame returns to the same quiz question", () => {
  let state = beginScene(createInitialState(), "time-after-1445");
  state.modeSessions.focus.scene.phase = "check";
  state = answerScene(state, "50").state;
  state = advanceScene(state);
  assert.equal(state.modeSessions.focus.scene.phase, "check");
  assert.equal(state.modeSessions.focus.scene.quizIndex, 0);
});

test("old saved sessions receive safe scene defaults", () => {
  const old = createInitialState();
  Object.values(old.modeSessions).forEach(session => { delete session.scene; });
  const loaded = loadState(memoryStorage({ "hania-tutor-state-v1": JSON.stringify(old) }));
  assert.deepEqual(loaded.modeSessions.focus.scene, createInitialState().modeSessions.focus.scene);
});

test("an in-progress old scene receives the new quiz cursor safely", () => {
  const old = createInitialState();
  old.modeSessions.focus.scene = { taskId: "time-after-1445", step: 2, phase: "story", feedback: "", seenTaskIds: [] };
  const loaded = loadState(memoryStorage({ "hania-tutor-state-v1": JSON.stringify(old) }));
  assert.equal(loaded.modeSessions.focus.scene.quizIndex, 0);
  assert.equal(loaded.modeSessions.focus.scene.returnToQuiz, false);
});

test("subject switching preserves the scene cursor for each subject", () => {
  let state = switchSubject(switchMode(createInitialState(), "explore"), "math");
  state = advanceScene(beginScene(state, "time-after-1445"));
  state = switchSubject(state, "nature");
  state = beginScene(state, "living-mushroom");
  state = switchSubject(state, "math");
  assert.equal(state.modeSessions.explore.scene.taskId, "time-after-1445");
  assert.equal(state.modeSessions.explore.scene.step, 1);
});

test("a located gap opens its matching scene as the single GIVE_EXAMPLE action", () => {
  const state = createInitialState();
  state.modeSessions.focus.currentTaskId = "time-after-1445";
  state.modeSessions.focus.currentStep = 1;
  const result = applyAnswer(state, "25");
  assert.equal(result.action, ACTIONS.GIVE_EXAMPLE);
  assert.equal(result.state.modeSessions.focus.scene.taskId, "time-after-1445");
});

test("a new explorer task shows one Nitka invitation instead of the task question", () => {
  const root = { className: "", innerHTML: "" };
  const state = switchSubject(switchMode(createInitialState(), "explore"), "math");
  state.knowledge["TIME.READ_MINUTES"] = { status: "INDEPENDENT" };
  state.modeSessions.explore.currentTaskId = "time-after-1445";
  state.modeSessions.explore.taskBySubject.math = "time-after-1445";
  renderApp(root, state);
  assert.match(root.innerHTML, /data-scene-start="time-after-1445"/);
  assert.doesNotMatch(root.innerHTML, /id="answer-form"/);
});

test("a scene frame uses cinematic story art and a visual knowledge beat", () => {
  const root = { className: "", innerHTML: "" };
  const state = beginScene(createInitialState(), "time-after-1445");
  renderApp(root, state);
  assert.match(root.innerHTML, /class="scene-art"/);
  assert.match(root.innerHTML, /class="scene-beat"/);
  assert.doesNotMatch(root.innerHTML, /scene-prop/);
  assert.match(root.innerHTML, /Nitka szykuje pokaz mody/);
  assert.match(root.innerHTML, /data-scene-next/);
  assert.match(root.innerHTML, /data-scene-skip/);
});

test("each subject chapter has a substantial generated illustration", async () => {
  for (const scene of Object.values(SCENES)) {
    const art = await stat(new URL(scene.art, import.meta.url));
    assert.ok(art.size > 100_000, scene.art);
  }
});

test("the scene check replaces playback controls with exactly one question", () => {
  const root = { className: "", innerHTML: "" };
  const state = beginScene(createInitialState(), "english-an-apple");
  state.modeSessions.focus.scene.phase = "check";
  renderApp(root, state);
  assert.equal((root.innerHTML.match(/\?/g) ?? []).length, 1);
  assert.match(root.innerHTML, /id="scene-answer-form"/);
  assert.doesNotMatch(root.innerHTML, /data-scene-next/);
});

test("Polish teaching scenes do not expose the rejected synthetic narration", () => {
  const root = { className: "", innerHTML: "" };
  const state = beginScene(createInitialState(), "time-after-1445");
  renderApp(root, state);
  assert.doesNotMatch(root.innerHTML, /<audio/);
  assert.doesNotMatch(root.innerHTML, /nitka-math-1\.mp3/);
});

test("home introduces Nitka without removing the three learning modes", () => {
  const root = { className: "", innerHTML: "" };
  renderApp(root, createInitialState());
  assert.match(root.innerHTML, /Króliczka Nitka/);
  assert.match(root.innerHTML, /Najpierw obrazkowa opowieść/);
  assert.equal((root.innerHTML.match(/class="mode-card"/g) ?? []).length, 3);
});

test("scene completion survives mode changes and knowledge stays shared", () => {
  let state = beginScene(createInitialState(), "living-mushroom");
  state.modeSessions.focus.scene.phase = "check";
  for (const answer of ["tak", "z komórek", "wzrost", "antropogeniczna", "światło", "ucho"]) {
    state = answerScene(state, answer).state;
  }
  state = switchMode(state, "explore");
  state = switchMode(state, "focus");
  assert.equal(state.modeSessions.focus.scene.seenTaskIds.includes("living-mushroom"), true);
  assert.equal(state.knowledge["NATURE.LIVING_CLASSIFICATION"].status, "SUPPORTED");
});

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

test("learning view leads with a graphic and large answer choices", () => {
  const root = { className: "", innerHTML: "" };
  renderApp(root, switchMode(createInitialState(), "focus"));
  assert.match(root.innerHTML, /data-learning-visual/);
  assert.match(root.innerHTML, /class="choice-grid"/);
  assert.doesNotMatch(root.innerHTML, /<input/);
});

test("Polish exercises do not offer the rejected synthetic voice", () => {
  const root = { className: "", innerHTML: "" };
  renderApp(root, switchMode(createInitialState(), "focus"));
  assert.doesNotMatch(root.innerHTML, /id="listen-question"/);
});

test("every question and prerequisite has a recorded audio file", async () => {
  for (const task of TASKS) {
    for (const step of ["question", "prerequisite"]) {
      const clip = await stat(new URL(`./audio/${task.id}-${step}.mp3`, import.meta.url));
      assert.ok(clip.size > 1_000, `${task.id}-${step}`);
    }
  }
});

test("only explicitly approved scene audio is exposed and its file exists", async () => {
  for (const scene of Object.values(SCENES)) {
    for (const step of scene.steps) {
      if (!step.audio) continue;
      assert.equal(step.lang, "en-GB");
      const clip = await stat(new URL(step.audio, import.meta.url));
      assert.ok(clip.size > 1_000, step.audio);
    }
  }
});

test("the math task transfers the scene rule to a new time", () => {
  const task = TASKS.find(item => item.id === "time-after-1445");
  assert.equal(task.prompt.includes("16:35"), true);
  assert.equal(evaluateAnswer(task, "17:05"), "correct");
  assert.equal(SCENES[task.id].checks.some(check => check.atomId === task.atomId), true);
});

test("the math chapter explains the clock before elapsed time", () => {
  assert.equal(
    SCENES["time-after-1445"].steps[1].transcript,
    "Na zegarze każda liczba to 5 minut. Długa wskazówka na 11 oznacza 55 minut.",
  );
});

test("scene transitions restore keyboard focus to the next micro-step", async () => {
  const source = await readFile(new URL("./app.js", import.meta.url), "utf8");
  assert.match(source, /commit\(beginScene\([^;]+, "", "\[data-scene-next\]"\)/);
  assert.match(source, /result === "correct" \? "\.answer-choice" : "\[data-scene-next\]"/);
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

test("Nitka art exists and scene motion has a reduced-motion path", async () => {
  const image = await stat(new URL("./images/kroliczka-nitka.png", import.meta.url));
  const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");
  assert.ok(image.size > 100_000);
  assert.match(css, /\.scene-frame/);
  assert.match(css, /@keyframes scene-reveal/);
  assert.match(css, /prefers-reduced-motion[\s\S]*\.scene-frame/);
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

test("recorded audio plays instead of browser speech synthesis", () => {
  const classes = new Set();
  const button = {
    dataset: { audio: "./audio/clock-minute-hand-question.mp3", speech: "Ile minut?", lang: "pl-PL" },
    classList: { add: value => classes.add(value), remove: value => classes.delete(value) },
  };
  let clip;
  class FakeAudio {
    constructor(src) { this.src = src; this.listeners = {}; clip = this; }
    addEventListener(name, callback) { this.listeners[name] = callback; }
    play() { this.played = true; return Promise.resolve(); }
  }
  const synthesis = { cancel() {}, speak() { throw new Error("synthesis should not run"); } };

  speakQuestion(button, synthesis, null, FakeAudio);

  assert.equal(clip.src, button.dataset.audio);
  assert.equal(clip.played, true);
  assert.equal(classes.has("is-speaking"), true);
  clip.listeners.ended();
  assert.equal(classes.has("is-speaking"), false);
});

test("Polish speech prefers the local Zosia voice", () => {
  const button = {
    dataset: { speech: "Która jest godzina?", lang: "pl-PL" },
    classList: { add() {}, remove() {} },
  };
  let utterance;
  class FakeUtterance {
    constructor(text) { this.text = text; utterance = this; }
    addEventListener() {}
  }
  const voices = [
    { name: "Default", lang: "pl-PL", localService: true },
    { name: "Zosia", lang: "pl-PL", localService: true },
  ];
  const synthesis = { cancel() {}, speak() {}, getVoices: () => voices };

  speakQuestion(button, synthesis, FakeUtterance);

  assert.equal(utterance.voice, voices[1]);
  assert.equal(utterance.rate, 0.9);
});
