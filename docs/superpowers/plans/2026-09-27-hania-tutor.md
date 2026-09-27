# Hania Tutor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zbudować lokalną aplikację przeglądarkową z trzema trybami nauki, które korzystają ze wspólnego profilu wiedzy i zachowują osobne miejsca kontynuacji.

**Architecture:** Statyczna aplikacja HTML/CSS/JavaScript bez zależności i procesu budowania. Jeden plik `app.js` zawiera dane, czyste funkcje silnika i renderowanie; czyste funkcje są eksportowane do testu Node, a uruchomienie interfejsu jest chronione sprawdzeniem dostępności `document`.

**Tech Stack:** HTML5, CSS, JavaScript ES modules, Web Storage API, Node `node:test`.

**Spec:** `docs/superpowers/specs/2026-09-27-hania-tutor-design.md`

## Global Constraints

- Każdy ekran nauki pokazuje dokładnie jedno pytanie i oczekuje jednego wyniku.
- Po każdej odpowiedzi silnik zwraca dokładnie jedną akcję z zamkniętej listy specyfikacji.
- Diagnoza błędu kończy się najpóźniej po czterech mikro-krokach.
- Odpowiedź po pomocy nie może ustawić stanu `RETAINED` ani `TRANSFERRED`.
- Trzy tryby korzystają z jednego `knowledge`, ale każdy ma osobny wpis w `modeSessions`.
- Stan jest zapisywany pod kluczem `hania-tutor-state-v1`.
- Brak zewnętrznych bibliotek, serwera aplikacyjnego, kont użytkowników i połączenia z modelem AI.
- Interfejs spełnia WCAG AA, działa klawiaturą i respektuje `prefers-reduced-motion`.

## Review Focus

- Pusta odpowiedź ma zostać potraktowana jako brak odpowiedzi, nie jako błędna wiedza; test w zadaniu 1.
- „Nie wiem” ma prowadzić do jednej podpowiedzi i stanu `SUPPORTED`; test w zadaniu 1.
- Trzeci kolejny błąd ma zakończyć serię akcją `TAKE_BREAK`; test w zadaniu 1.
- Przełączenie trybu w połowie diagnozy ma zachować krok i atom; test w zadaniu 2.
- Uszkodzony lub starszy zapis `localStorage` ma bezpiecznie wrócić do stanu początkowego; test w zadaniu 2.

---

### Task 1: Silnik pojedynczej interakcji

**Files:**
- Create: `app.js`
- Create: `test.mjs`

**Interfaces:**
- Produces: `createInitialState(): AppState`
- Produces: `normalizeAnswer(value: string): string`
- Produces: `evaluateAnswer(task: Task, value: string): "correct" | "dont_know" | "no_response" | "incorrect"`
- Produces: `chooseAction(state: AppState, task: Task, result: Result): Action`
- Produces: `applyAnswer(state: AppState, value: string): { state: AppState, action: Action }`

- [ ] **Step 1: Write failing engine tests**

Create `test.mjs` with Node's standard test runner. Pin normalization, empty input, „nie wiem”, one-action output, diagnostic limit, supported knowledge and the third-error break:

```js
import test from "node:test";
import assert from "node:assert/strict";
import {
  ACTIONS,
  applyAnswer,
  chooseAction,
  createInitialState,
  evaluateAnswer,
  normalizeAnswer,
  TASKS,
} from "./app.js";

test("normalizes case, whitespace and Polish punctuation", () => {
  assert.equal(normalizeAnswer("  Piętnaście. "), "pietnascie");
});

test("empty answer is no_response", () => {
  assert.equal(evaluateAnswer(TASKS[0], "   "), "no_response");
});

test("nie wiem produces exactly GIVE_HINT", () => {
  const state = createInitialState();
  const result = evaluateAnswer(TASKS[0], "nie wiem");
  assert.equal(chooseAction(state, TASKS[0], result), ACTIONS.GIVE_HINT);
});

test("an answer after help is SUPPORTED, never RETAINED", () => {
  const state = createInitialState();
  state.modeSessions.focus.helpLevel = 1;
  const next = applyAnswer(state, TASKS[0].answers[0]).state;
  assert.equal(next.knowledge[TASKS[0].atomId].status, "SUPPORTED");
});

test("diagnosis never exceeds four questions", () => {
  const state = createInitialState();
  state.modeSessions.focus.diagnosticCount = 4;
  assert.notEqual(chooseAction(state, TASKS[0], "incorrect"), ACTIONS.CHECK_PREREQUISITE);
});

test("third consecutive error produces TAKE_BREAK", () => {
  const state = createInitialState();
  state.modeSessions.focus.consecutiveErrors = 2;
  assert.equal(chooseAction(state, TASKS[0], "incorrect"), ACTIONS.TAKE_BREAK);
});
```

- [ ] **Step 2: Run the tests and confirm the expected failure**

Run: `node --test test.mjs`

Expected: failure because `app.js` or its exports do not exist.

- [ ] **Step 3: Implement the minimal engine**

Create in `app.js`:

```js
export const ACTIONS = Object.freeze({
  ADVANCE: "ADVANCE",
  REPEAT_DIFFERENTLY: "REPEAT_DIFFERENTLY",
  SIMPLIFY: "SIMPLIFY",
  GIVE_HINT: "GIVE_HINT",
  SHOW_VISUAL: "SHOW_VISUAL",
  CHECK_PREREQUISITE: "CHECK_PREREQUISITE",
  GIVE_EXAMPLE: "GIVE_EXAMPLE",
  RETRIEVE_OLD_KNOWLEDGE: "RETRIEVE_OLD_KNOWLEDGE",
  TAKE_BREAK: "TAKE_BREAK",
  END_SESSION: "END_SESSION",
});

export const TASKS = [
  {
    id: "time-after-1445",
    atomId: "TIME.ADD_ACROSS_HOUR",
    subject: "math",
    prompt: "Która godzina będzie 30 minut po 14:45?",
    answers: ["15:15", "1515"],
    hint: "Najpierw policz minuty do 15:00.",
    prerequisitePrompt: "Ile minut brakuje od 14:45 do 15:00?",
    prerequisiteAnswers: ["15", "pietnascie"],
    example: "Od 13:50 do 14:00 mija 10 minut.",
  },
];

export function normalizeAnswer(value = "") {
  return value.trim().toLocaleLowerCase("pl-PL")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[.!?,]/g, "").replace(/\s+/g, " ");
}

export function evaluateAnswer(task, value) {
  const answer = normalizeAnswer(value);
  if (!answer) return "no_response";
  if (["nie wiem", "niewiem"].includes(answer)) return "dont_know";
  return task.answers.map(normalizeAnswer).includes(answer) ? "correct" : "incorrect";
}

export function createInitialState() {
  const session = () => ({ currentTaskId: TASKS[0].id, currentStep: 0, diagnosticCount: 0, helpLevel: 0, consecutiveErrors: 0 });
  return { version: 1, activeMode: "focus", knowledge: {}, modeSessions: { focus: session(), explore: session(), review: session() }, history: [] };
}

export function chooseAction(state, task, result) {
  const session = state.modeSessions[state.activeMode];
  if (session.consecutiveErrors >= 2 && result === "incorrect") return ACTIONS.TAKE_BREAK;
  if (result === "dont_know" || result === "no_response") return ACTIONS.GIVE_HINT;
  if (result === "correct") return ACTIONS.ADVANCE;
  if (session.diagnosticCount < 4) return ACTIONS.CHECK_PREREQUISITE;
  return ACTIONS.SIMPLIFY;
}
```

Add `applyAnswer` as an immutable state update. A correct answer with `helpLevel > 0` sets `SUPPORTED`; an unassisted answer sets at most `INDEPENDENT`. Every call appends one history entry containing exactly one action.

- [ ] **Step 4: Run the engine tests**

Run: `node --test test.mjs`

Expected: all Task 1 tests pass.

---

### Task 2: Wspólny profil i kontynuacja trzech trybów

**Files:**
- Modify: `app.js`
- Modify: `test.mjs`

**Interfaces:**
- Consumes: `createInitialState`, `applyAnswer`
- Produces: `switchMode(state: AppState, modeId: "focus" | "explore" | "review"): AppState`
- Produces: `saveState(storage: StorageLike, state: AppState): void`
- Produces: `loadState(storage: StorageLike): AppState`
- Produces: `selectNextTask(state: AppState, modeId: ModeId): Task`

- [ ] **Step 1: Add failing state-sharing tests**

Append to `test.mjs`:

```js
import { loadState, saveState, selectNextTask, switchMode } from "./app.js";

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test("switching mode preserves each mode cursor and shared knowledge", () => {
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

test("corrupt state falls back safely", () => {
  const storage = memoryStorage({ "hania-tutor-state-v1": "{" });
  assert.deepEqual(loadState(storage), createInitialState());
});

test("review mode selects a due task and never new content", () => {
  const state = createInitialState();
  state.knowledge["TIME.ADD_ACROSS_HOUR"] = { status: "SUPPORTED", nextReviewAt: 0 };
  assert.equal(selectNextTask(state, "review").atomId, "TIME.ADD_ACROSS_HOUR");
});
```

- [ ] **Step 2: Run the new tests and confirm failure**

Run: `node --test test.mjs`

Expected: failure for missing persistence and mode functions.

- [ ] **Step 3: Implement state switching and storage**

Use one constant and validate only the fields required by version 1:

```js
export const STORAGE_KEY = "hania-tutor-state-v1";

export function switchMode(state, activeMode) {
  if (!state.modeSessions[activeMode]) return state;
  return { ...state, activeMode };
}

export function saveState(storage, state) {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState(storage) {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY));
    return value?.version === 1 && value.knowledge && value.modeSessions ? value : createInitialState();
  } catch {
    return createInitialState();
  }
}
```

Implement `selectNextTask`: focus selects a task for the lowest non-stable atom, explore selects a new atom whose prerequisite is stable, and review selects only a task with `nextReviewAt <= Date.now()`. If no review is due, return a special end-of-session task rather than introducing new material.

- [ ] **Step 4: Run all state tests**

Run: `node --test test.mjs`

Expected: all tests pass.

---

### Task 3: Dane materiału i pełne przepływy adaptacyjne

**Files:**
- Modify: `app.js`
- Modify: `test.mjs`

**Interfaces:**
- Consumes: `TASKS`, `selectNextTask`, `applyAnswer`
- Produces: at least 15 task records covering all subject groups in the spec
- Produces: `getTaskById(id: string): Task`
- Produces: `getActionContent(task: Task, action: Action): { prompt: string, visual?: Visual }`

- [ ] **Step 1: Add failing content coverage tests**

Append:

```js
test("content covers every required topic group", () => {
  const topics = new Set(TASKS.map(task => task.topic));
  ["clock", "elapsed", "calendar", "roman", "length", "living", "organisms", "life-processes", "anthropogenic", "stimulus", "senses", "numbers", "classroom", "pronouns", "be", "articles", "adjective-noun"]
    .forEach(topic => assert.ok(topics.has(topic), `missing ${topic}`));
});

test("every learning task contains one prompt and an adaptive response", () => {
  TASKS.filter(task => task.kind !== "end").forEach(task => {
    assert.equal((task.prompt.match(/\?/g) ?? []).length, 1);
    assert.ok(task.hint || task.example || task.prerequisitePrompt);
  });
});

test("each applyAnswer call records one allowed action", () => {
  const { state, action } = applyAnswer(createInitialState(), "wrong");
  assert.ok(Object.values(ACTIONS).includes(action));
  assert.equal(state.history.at(-1).action, action);
});
```

- [ ] **Step 2: Run coverage tests and confirm failure**

Run: `node --test test.mjs`

Expected: missing topic assertions fail.

- [ ] **Step 3: Add the minimum complete task bank**

Add one task per required topic. Each task record uses this concrete shape:

```js
{
  id: "en-he-is",
  atomId: "EN.BE.HE_IS",
  subject: "english",
  topic: "be",
  kind: "learn",
  prompt: "Uzupełnij: He ___ ten.",
  answers: ["is"],
  hint: "Dla he używamy is.",
  prerequisitePrompt: "Czy he oznacza jedną osobę?",
  prerequisiteAnswers: ["tak", "yes"],
  example: "She is ten.",
  visual: null,
}
```

Use exact examples from the approved scope: `14:45 + 30 min`, next Saturday after Monday 8 May, `IX`, `315 cm`, mushroom as organism, growth and development, road as anthropogenic, light as stimulus, ear and sound, `thirteen`, `pencil case`, `they`, `he is`, `an apple`, and `brown desk`.

- [ ] **Step 4: Run all content tests**

Run: `node --test test.mjs`

Expected: all tests pass.

---

### Task 4: Interfejs trzech trybów i dostępność

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Modify: `app.js`
- Modify: `test.mjs`

**Interfaces:**
- Consumes: all engine and persistence functions
- Produces: `renderApp(root: HTMLElement, state: AppState): void`
- Produces: browser event handlers that call `applyAnswer`, `switchMode`, `saveState`, then render once

- [ ] **Step 1: Add static contract tests**

Append tests that read the files with the standard library:

```js
import { readFile } from "node:fs/promises";

test("HTML exposes one labelled learning form and polite feedback", async () => {
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
```

- [ ] **Step 2: Run static tests and confirm failure**

Run: `node --test test.mjs`

Expected: file-not-found failures for `index.html` and `styles.css`.

- [ ] **Step 3: Build the accessible shell**

Create `index.html` with language `pl`, viewport metadata, a skip link, `main#app`, a persistent `div#announcer[aria-live="polite"]`, stylesheet and module script. Do not add external fonts or scripts.

Create `styles.css` with system fonts, high-contrast focus rings, one accent per mode, minimum 44px controls, responsive single-column layouts and reduced-motion overrides. Define three visually distinct but restrained mode roots: `.mode-focus`, `.mode-explore`, `.mode-review`.

- [ ] **Step 4: Render all application states**

In `renderApp` render exactly one of:

- mode chooser;
- focus learning card;
- explorer map plus one learning card;
- review deck plus one question;
- shared progress view;
- break view;
- end-of-session view.

The answer form has one labelled input and one submit button. Choice tasks render a single `fieldset` with one legend. The UI displays friendly action text, never raw internal action names. A mode change calls `saveState` before rendering the destination.

Initialize only in the browser:

```js
if (typeof document !== "undefined") {
  const root = document.querySelector("#app");
  let state = loadState(localStorage);
  renderApp(root, state);
}
```

- [ ] **Step 5: Run automated verification**

Run: `node --check app.js`

Run: `node --test test.mjs`

Expected: syntax check exits 0 and all tests pass.

- [ ] **Step 6: Run the browser smoke check**

Run: `python3 -m http.server 4173`

Open `http://localhost:4173/` and verify:

1. Each mode opens and shows one question.
2. Answering in one mode updates the shared progress screen.
3. Switching away and back preserves the current task.
4. „Nie wiem” produces one hint.
5. Three wrong answers produce a break.
6. Keyboard-only navigation reaches every control with a visible focus ring.
7. At a 390px viewport no horizontal scroll appears.

Expected: all seven checks pass.
