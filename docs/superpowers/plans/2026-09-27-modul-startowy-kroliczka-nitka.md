# Moduł startowy „Króliczka Nitka” Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dodać do istniejącej aplikacji trzy krótkie, dostępne mikro-scenki Króliczki Nitki — po jednej dla matematyki, przyrody i angielskiego — z naturalnymi nagraniami, jednym pytaniem na ekranie i pełną integracją ze wspólnym profilem wiedzy.

**Architecture:** Pozostajemy przy statycznym HTML/CSS/JS bez nowych zależności. Definicje trzech scen, stan odtwarzania i czyste funkcje przejść trafiają do istniejącego `app.js`; ilustracja Nitki i pliki MP3 są zwykłymi zasobami. Scenka pojawia się przed nowym atomem w „Ścieżce odkrywcy” albo po akcji `GIVE_EXAMPLE`, lecz sama nie zapisuje opanowania — dopiero następujące po niej zadanie transferowe aktualizuje `knowledge[atomId]`.

**Tech Stack:** HTML5, CSS, JavaScript ES modules, `localStorage`, natywny `<audio>`, Node.js `node:test`, statyczny GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-27-modul-startowy-kroliczka-nitka-design.md`

## Global Constraints

- Na ekranie znajduje się najwyżej jedno pytanie i jedna bieżąca decyzja.
- Nitka ma ilustracyjny, nieprzedszkolny wygląd odpowiedni dla 10-latki.
- Humor dotyczy sytuacji albo Nitki, nigdy Hani i nigdy jej błędu.
- Audio nie uruchamia się automatycznie i w normalnym przebiegu nie korzysta z syntezatora przeglądarki.
- Każdy klip jest pełnym zdaniem lub naturalną frazą MP3, bez składania wypowiedzi z osobnych słów.
- Animuje się tylko element niosący znaczenie; `prefers-reduced-motion` zachowuje pełną treść bez ruchu.
- Nie dodajemy frameworka, biblioteki animacji, odtwarzacza wideo, serwera, konta ani bazy danych.
- Wspólny profil wiedzy i osobne miejsca kontynuacji dla trybów i przedmiotów pozostają zgodne z `hania-tutor-state-v1`.

## Review Focus

- Stary zapis `localStorage` bez pola `scene` ma dostać bezpieczne wartości domyślne i nadal się otworzyć — test w zadaniu 1.
- Zmiana przedmiotu w środku scenki ma zachować jej kadr i przywrócić właściwą scenkę po powrocie — test w zadaniu 1.
- Błędna odpowiedź w scence nie może zmienić `knowledge`; ma cofnąć tylko do wskazanego kadru — test w zadaniu 1.
- Brak lub błąd pliku MP3 nie może zablokować przycisków „Dalej”, „Pomiń” ani odpowiedzi — test renderowania w zadaniu 2 i kontrola ręczna w zadaniu 5.
- Przy `prefers-reduced-motion: reduce` żaden ruch nie może się zapętlać, a pytanie i sterowanie muszą pozostać widoczne — test CSS w zadaniu 3 i kontrola ręczna w zadaniu 5.

---

### Task 1: Dane scen i czyste przejścia stanu

**Files:**
- Modify: `app.js:14-550`
- Modify: `test.mjs:1-240`

**Interfaces:**
- Consumes: istniejące `TASKS`, `normalizeAnswer`, `createInitialState`, `switchSubject`, `applyAnswer` i `knowledge[atomId]`.
- Produces: `SCENES`, `getSceneForTask(taskId)`, `shouldOfferScene(state, task)`, `beginScene(state, taskId)`, `advanceScene(state)`, `answerScene(state, value)` i `skipScene(state)`.

- [ ] **Step 1: Napisać testy trzech scen i ich pojedynczych pytań**

Rozszerzyć import z `app.js`, a następnie dodać:

```js
test("the pilot has one scene per subject and one check question per scene", () => {
  assert.deepEqual(Object.keys(SCENES), ["time-after-1445", "living-mushroom", "english-an-apple"]);
  Object.values(SCENES).forEach(scene => {
    assert.ok(scene.steps.length >= 3 && scene.steps.length <= 5, scene.id);
    assert.equal((scene.check.prompt.match(/\?/g) ?? []).length, 1, scene.id);
    assert.ok(scene.check.choices.length >= 2 && scene.check.choices.length <= 3, scene.id);
    assert.ok(scene.check.choices.some(choice => scene.check.answers.map(normalizeAnswer).includes(normalizeAnswer(choice))), scene.id);
  });
});

test("a new explorer atom offers its matching Nitka scene once", () => {
  const state = switchSubject(switchMode(createInitialState(), "explore"), "math");
  state.modeSessions.explore.currentTaskId = "time-after-1445";
  state.modeSessions.explore.taskBySubject.math = "time-after-1445";
  const task = TASKS.find(item => item.id === "time-after-1445");
  assert.equal(shouldOfferScene(state, task), true);
  assert.equal(shouldOfferScene(skipScene(beginScene(state, task.id)), task), false);
});

test("a wrong scene answer replays one frame without changing knowledge", () => {
  let state = beginScene(createInitialState(), "time-after-1445");
  state = advanceScene(advanceScene(advanceScene(state)));
  const before = structuredClone(state.knowledge);
  const result = answerScene(state, "15:45");
  assert.equal(result.result, "incorrect");
  assert.equal(result.state.modeSessions.focus.scene.step, SCENES["time-after-1445"].replayStep);
  assert.deepEqual(result.state.knowledge, before);
});

test("a correct scene answer reveals the transfer task without granting mastery", () => {
  let state = beginScene(createInitialState(), "time-after-1445");
  state.modeSessions.focus.scene.phase = "check";
  const result = answerScene(state, "15:15");
  assert.equal(result.result, "correct");
  assert.equal(result.state.modeSessions.focus.scene.taskId, "");
  assert.equal(result.state.modeSessions.focus.scene.seenTaskIds.includes("time-after-1445"), true);
  assert.equal(result.state.knowledge["TIME.ADD_ACROSS_HOUR"], undefined);
});
```

- [ ] **Step 2: Uruchomić testy i potwierdzić oczekiwaną porażkę**

Run: `node --test test.mjs`

Expected: FAIL, ponieważ eksporty `SCENES`, `beginScene`, `advanceScene`, `answerScene`, `skipScene` i `shouldOfferScene` jeszcze nie istnieją.

- [ ] **Step 3: Dodać dokładne definicje trzech scen**

Umieścić pod `TASKS` i wyeksportować:

```js
export const SCENES = Object.freeze({
  "time-after-1445": {
    id: "nitka-math-time",
    taskId: "time-after-1445",
    subject: "math",
    title: "Pokaz za pół godziny",
    replayStep: 1,
    steps: [
      { audio: "./audio/scenes/nitka-math-1.mp3", lang: "pl-PL", visual: "runway", transcript: "Wielkie wyzwanie Nitki: przygotować pokaz mody i nie spóźnić kokardy." },
      { audio: "./audio/scenes/nitka-math-2.mp3", lang: "pl-PL", visual: "clock-start", transcript: "Jest 14:45. Pokaz zaczyna się za 30 minut. Nitka obstawia 15:45, ale jej miarka czasu chyba się zaplątała." },
      { audio: "./audio/scenes/nitka-math-3.mp3", lang: "pl-PL", visual: "clock-jumps", transcript: "Robimy dwa spokojne skoki: 15 minut do 15:00 i jeszcze 15 minut do 15:15." },
    ],
    check: { prompt: "O której zacznie się pokaz Nitki?", choices: ["15:00", "15:15", "15:45"], answers: ["15:15", "1515"] },
  },
  "living-mushroom": {
    id: "nitka-nature-organism",
    taskId: "living-mushroom",
    subject: "nature",
    title: "Kapelusz, który nie rośnie",
    replayStep: 1,
    steps: [
      { audio: "./audio/scenes/nitka-nature-1.mp3", lang: "pl-PL", visual: "garden", transcript: "Nitka urządza ogród do zdjęcia nowej kolekcji: królik, roślina i bardzo elegancki kapelusz." },
      { audio: "./audio/scenes/nitka-nature-2.mp3", lang: "pl-PL", visual: "living", transcript: "Królik i roślina rosną, oddychają i potrzebują wody. To organizmy." },
      { audio: "./audio/scenes/nitka-nature-3.mp3", lang: "pl-PL", visual: "hat", transcript: "Kapelusz może być w kwiatki, ale sam nie rośnie i nie oddycha. Moda ma granice." },
    ],
    check: { prompt: "Co w ogrodzie Nitki jest organizmem?", choices: ["królik i roślina", "kapelusz", "wszystko"], answers: ["królik i roślina", "krolik i roslina"] },
  },
  "english-an-apple": {
    id: "nitka-english-an",
    taskId: "english-an-apple",
    subject: "english",
    title: "An orange scarf",
    replayStep: 1,
    steps: [
      { audio: "./audio/scenes/nitka-english-1.mp3", lang: "pl-PL", visual: "scarf", transcript: "Nitka wybiera pomarańczowy szalik. Po angielsku orange zaczyna się samogłoską." },
      { audio: "./audio/scenes/nitka-english-2.mp3", lang: "en-GB", visual: "english-line", transcript: "An orange scarf." },
      { audio: "./audio/scenes/nitka-english-3.mp3", lang: "pl-PL", visual: "article", transcript: "Przed orange używamy an: an orange scarf." },
    ],
    check: { prompt: "Który napis pasuje do pomarańczowego szalika?", choices: ["a orange scarf", "an orange scarf"], answers: ["an orange scarf"] },
  },
});

export function getSceneForTask(taskId) {
  return SCENES[taskId] ?? null;
}
```

- [ ] **Step 4: Dodać stan sceny i czyste funkcje przejść**

Rozszerzyć `createSession()` o:

```js
scene: { taskId: "", step: 0, phase: "story", feedback: "", seenTaskIds: [] },
```

Dodać `scene` do tablicy `fields` w `switchSubject`, a następnie dodać:

```js
export function shouldOfferScene(state, task) {
  const scene = state.modeSessions[state.activeMode].scene;
  return state.activeMode === "explore"
    && Boolean(SCENES[task?.id])
    && !state.knowledge[task.atomId]
    && !scene.seenTaskIds.includes(task.id);
}

export function beginScene(state, taskId) {
  if (!SCENES[taskId]) return state;
  const next = structuredClone(state);
  next.modeSessions[next.activeMode].scene = {
    ...next.modeSessions[next.activeMode].scene,
    taskId,
    step: 0,
    phase: "story",
    feedback: "",
  };
  return next;
}

export function advanceScene(state) {
  const next = structuredClone(state);
  const sceneState = next.modeSessions[next.activeMode].scene;
  const scene = SCENES[sceneState.taskId];
  if (!scene) return state;
  if (sceneState.step < scene.steps.length - 1) sceneState.step += 1;
  else sceneState.phase = "check";
  sceneState.feedback = "";
  return next;
}

function finishScene(next, taskId) {
  const sceneState = next.modeSessions[next.activeMode].scene;
  if (!sceneState.seenTaskIds.includes(taskId)) sceneState.seenTaskIds.push(taskId);
  sceneState.taskId = "";
  sceneState.step = 0;
  sceneState.phase = "story";
  sceneState.feedback = "";
}

export function answerScene(state, value) {
  const next = structuredClone(state);
  const sceneState = next.modeSessions[next.activeMode].scene;
  const scene = SCENES[sceneState.taskId];
  if (!scene || sceneState.phase !== "check") return { state, result: "no_response" };
  const answer = normalizeAnswer(value);
  const correct = scene.check.answers.map(normalizeAnswer).includes(answer);
  if (correct) finishScene(next, scene.taskId);
  else {
    sceneState.phase = "story";
    sceneState.step = scene.replayStep;
    sceneState.feedback = "Wróćmy tylko do jednego potrzebnego kadru.";
  }
  return { state: next, result: correct ? "correct" : "incorrect" };
}

export function skipScene(state) {
  const next = structuredClone(state);
  const taskId = next.modeSessions[next.activeMode].scene.taskId;
  if (taskId) finishScene(next, taskId);
  return next;
}
```

W `applyAnswer`, po wybraniu `GIVE_EXAMPLE`, jeżeli istnieje `SCENES[task.id]`, ustawić ten sam stan co `beginScene`, bez dodatkowego klonowania.

- [ ] **Step 5: Dodać test zgodności starego zapisu i zmiany przedmiotu w scenie**

```js
test("old saved sessions receive safe scene defaults", () => {
  const old = createInitialState();
  Object.values(old.modeSessions).forEach(session => { delete session.scene; });
  const loaded = loadState(memoryStorage({ "hania-tutor-state-v1": JSON.stringify(old) }));
  assert.deepEqual(loaded.modeSessions.focus.scene, createInitialState().modeSessions.focus.scene);
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
```

- [ ] **Step 6: Uruchomić testy**

Run: `node --test test.mjs`

Expected: wszystkie testy PASS.

- [ ] **Step 7: Commit**

```bash
git add app.js test.mjs
git commit -m "feat: add Nitka scene state and lesson data"
```

---

### Task 2: Dostępny odtwarzacz scenki i jedno pytanie

**Files:**
- Modify: `app.js:547-803`
- Modify: `test.mjs:240-386`

**Interfaces:**
- Consumes: `SCENES`, `shouldOfferScene`, `beginScene`, `advanceScene`, `answerScene`, `skipScene` z zadania 1.
- Produces: `sceneIntroView(task)`, `sceneView(state, task)`, przyciski `data-scene-start`, `data-scene-next`, `data-scene-skip`, `data-scene-replay` i formularz `#scene-answer-form`.

- [ ] **Step 1: Napisać test renderowania jednego kroku sceny**

```js
test("a new explorer task shows one Nitka invitation instead of the task question", () => {
  const root = { className: "", innerHTML: "" };
  const state = switchSubject(switchMode(createInitialState(), "explore"), "math");
  state.modeSessions.explore.currentTaskId = "time-after-1445";
  state.modeSessions.explore.taskBySubject.math = "time-after-1445";
  renderApp(root, state);
  assert.match(root.innerHTML, /data-scene-start="time-after-1445"/);
  assert.doesNotMatch(root.innerHTML, /id="answer-form"/);
});

test("a scene frame has recorded audio, transcript and controls even if audio fails", () => {
  const root = { className: "", innerHTML: "" };
  const state = beginScene(createInitialState(), "time-after-1445");
  renderApp(root, state);
  assert.match(root.innerHTML, /<audio[^>]+controls/);
  assert.match(root.innerHTML, /nitka-math-1\.mp3/);
  assert.match(root.innerHTML, /Wielkie wyzwanie Nitki/);
  assert.match(root.innerHTML, /data-scene-next/);
  assert.match(root.innerHTML, /data-scene-skip/);
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
```

- [ ] **Step 2: Uruchomić testy i potwierdzić porażkę**

Run: `node --test test.mjs`

Expected: FAIL, ponieważ widoki scenki jeszcze nie istnieją.

- [ ] **Step 3: Dodać minimalne widoki sceny**

Dodać obok `learningView`:

```js
function sceneIntroView(task) {
  const scene = SCENES[task.id];
  return `<section class="scene-card scene-intro" aria-labelledby="scene-title">
    <img class="nitka-portrait" src="./images/kroliczka-nitka.png" alt="Króliczka Nitka z notesem i miarką krawiecką">
    <div><p class="eyebrow">Misja Nitki · ${SUBJECTS[scene.subject]}</p>
    <h1 id="scene-title">${escapeHtml(scene.title)}</h1>
    <p class="intro">Jedna krótka historia. Potem jedno pytanie.</p>
    <button class="primary-button" type="button" data-scene-start="${task.id}">Zaczynam misję</button></div>
  </section>`;
}

function sceneView(state) {
  const sceneState = state.modeSessions[state.activeMode].scene;
  const scene = SCENES[sceneState.taskId];
  if (!scene) return "";
  if (sceneState.phase === "check") return `<section class="scene-card" aria-labelledby="scene-question">
    <p class="eyebrow">Jedno pytanie</p><h1 id="scene-question">${escapeHtml(scene.check.prompt)}</h1>
    <form id="scene-answer-form" class="answer-form" aria-labelledby="scene-question">
      <div class="choice-grid">${scene.check.choices.map(choice => `<button class="answer-choice" type="submit" name="answer" value="${escapeHtml(choice)}">${escapeHtml(choice)}</button>`).join("")}</div>
    </form>
  </section>`;
  const step = scene.steps[sceneState.step];
  return `<section class="scene-card" aria-labelledby="scene-title">
    <div class="scene-progress" aria-label="Kadr ${sceneState.step + 1} z ${scene.steps.length}">${sceneState.step + 1}/${scene.steps.length}</div>
    <div class="scene-frame scene-${escapeHtml(step.visual)}"><img src="./images/kroliczka-nitka.png" alt="Króliczka Nitka prowadzi misję"><div class="scene-prop" aria-hidden="true"></div></div>
    ${sceneState.feedback ? `<p class="feedback">${escapeHtml(sceneState.feedback)}</p>` : ""}
    <h1 id="scene-title">${escapeHtml(scene.title)}</h1>
    <p class="scene-transcript">${escapeHtml(step.transcript)}</p>
    <audio id="scene-audio" controls preload="metadata" src="${step.audio}">Nagranie: ${escapeHtml(step.transcript)}</audio>
    <div class="scene-actions"><button class="quiet-button" type="button" data-scene-replay>Jeszcze raz</button><button class="quiet-button" type="button" data-scene-skip>Pomiń</button><button class="primary-button" type="button" data-scene-next>Dalej</button></div>
  </section>`;
}
```

Na początku `learningView(state)` po wyznaczeniu `task` dodać:

```js
const session = state.modeSessions[state.activeMode];
if (session.scene.taskId) return `${modeNav(state.activeMode)}<div>${subjectSwitcher(state.activeSubject)}${sceneView(state)}</div>`;
if (shouldOfferScene(state, task)) return `${modeNav(state.activeMode)}<div>${subjectSwitcher(state.activeSubject)}${sceneIntroView(task)}</div>`;
```

Usunąć późniejszą ponowną deklarację `session` z tej funkcji.

- [ ] **Step 4: Podłączyć zdarzenia bez własnego odtwarzacza audio**

W `bindEvents()` dodać:

```js
root.querySelector("[data-scene-start]")?.addEventListener("click", event => commit(beginScene(state, event.currentTarget.dataset.sceneStart)));
root.querySelector("[data-scene-next]")?.addEventListener("click", () => commit(advanceScene(state), "", "[data-scene-next]"));
root.querySelector("[data-scene-skip]")?.addEventListener("click", () => commit(skipScene(state), "Scenka pominięta.", ".answer-choice"));
root.querySelector("[data-scene-replay]")?.addEventListener("click", () => {
  const audio = root.querySelector("#scene-audio");
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
});
root.querySelector("#scene-answer-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const { state: next, result } = answerScene(state, event.submitter?.value ?? "");
  commit(next, result === "correct" ? "Dobrze. Teraz sprawdzimy tę wiedzę w nowej sytuacji." : "Wróćmy do jednego potrzebnego kadru.");
});
```

Natywny `<audio controls>` zapewnia play/pauzę i pozostawia nawigację działającą, gdy plik jest niedostępny.

- [ ] **Step 5: Uruchomić testy**

Run: `node --test test.mjs`

Expected: wszystkie testy PASS.

- [ ] **Step 6: Commit**

```bash
git add app.js test.mjs
git commit -m "feat: render accessible Nitka micro-scenes"
```

---

### Task 3: Ilustracja Nitki, spokojne kadry i ograniczony ruch

**Files:**
- Create: `images/kroliczka-nitka.png`
- Modify: `styles.css:1-453`
- Modify: `test.mjs:300-386`

**Interfaces:**
- Consumes: klasy `.scene-card`, `.nitka-portrait`, `.scene-frame`, `.scene-prop`, `.scene-actions` i warianty `scene-*` z zadania 2.
- Produces: responsywny wygląd scen, semantyczny ruch CSS oraz nieruchomą ścieżkę `prefers-reduced-motion`.

- [ ] **Step 1: Skopiować zatwierdzoną ilustrację do projektu**

Run:

```bash
mkdir -p images
cp /Users/michalwitczak/.codex/generated_images/01a0e1fa-9423-71c1-92a7-9f72e2b1b781/exec-71e442f2-dd48-46de-9021-c6fc6d374f54.png images/kroliczka-nitka.png
sips -g pixelWidth -g pixelHeight images/kroliczka-nitka.png
```

Expected: obraz istnieje i ma wymiary `1024 × 1536`.

- [ ] **Step 2: Napisać test obecności grafiki i ścieżki ograniczonego ruchu**

```js
test("Nitka art exists and scene motion has a reduced-motion path", async () => {
  const image = await stat(new URL("./images/kroliczka-nitka.png", import.meta.url));
  const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");
  assert.ok(image.size > 100_000);
  assert.match(css, /\.scene-frame/);
  assert.match(css, /@keyframes scene-reveal/);
  assert.match(css, /prefers-reduced-motion[\s\S]*\.scene-frame/);
});
```

- [ ] **Step 3: Uruchomić test i potwierdzić porażkę CSS**

Run: `node --test test.mjs`

Expected: FAIL na brak `.scene-frame` lub `scene-reveal`.

- [ ] **Step 4: Dodać minimalne style scen**

Dodać przed mediami mobilnymi:

```css
.scene-card {
  padding: clamp(22px, 4vw, 42px);
  overflow: hidden;
  border-radius: 20px;
  color: #31283b;
  background: #fff9ef;
  box-shadow: var(--shadow);
}
.scene-intro { display: grid; grid-template-columns: minmax(180px, .8fr) minmax(260px, 1.2fr); align-items: center; gap: 28px; }
.nitka-portrait { width: 100%; max-height: 430px; object-fit: cover; object-position: 50% 28%; border-radius: 18px; }
.scene-frame { position: relative; min-height: 320px; margin-bottom: 24px; overflow: hidden; border-radius: 18px; background: linear-gradient(135deg, #e7f0ed, #f7e8dc); animation: scene-reveal 420ms cubic-bezier(.16, 1, .3, 1) both; }
.scene-frame img { position: absolute; left: 2%; bottom: -34%; width: min(48%, 250px); }
.scene-prop { position: absolute; right: 8%; top: 18%; width: 42%; aspect-ratio: 1; border-radius: 50%; background: color-mix(in srgb, var(--accent) 18%, white); }
.scene-clock-jumps .scene-prop { border-radius: 18px; background: linear-gradient(90deg, #fff 0 31%, #e6d2a5 31% 34%, #fff 34% 65%, #e6d2a5 65% 68%, #fff 68%); }
.scene-living .scene-prop { background: radial-gradient(circle at 35% 55%, #69a66f 0 18%, transparent 19%), radial-gradient(circle at 70% 55%, #8c6a45 0 18%, transparent 19%); }
.scene-english-line .scene-prop { border-radius: 18px; background: #fff; box-shadow: inset 0 0 0 3px #347b78; }
.scene-progress { margin-bottom: 12px; color: var(--ink-soft); font-weight: 760; }
.scene-transcript { max-width: 680px; font-size: 1.16rem; line-height: 1.6; }
.scene-card audio { width: 100%; margin: 4px 0 20px; }
.scene-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; }
@keyframes scene-reveal { from { transform: translateY(8px); opacity: .4; } to { transform: translateY(0); opacity: 1; } }
```

W `@media (max-width: 760px)` dodać:

```css
.scene-intro { grid-template-columns: 1fr; }
.nitka-portrait { max-height: 280px; }
.scene-frame { min-height: 250px; }
.scene-actions .primary-button { width: auto; }
```

W istniejącym `@media (prefers-reduced-motion: reduce)` dodać:

```css
.scene-frame, .scene-frame * { animation: none !important; transform: none !important; }
```

- [ ] **Step 5: Uruchomić testy**

Run: `node --test test.mjs`

Expected: wszystkie testy PASS.

- [ ] **Step 6: Commit**

```bash
git add images/kroliczka-nitka.png styles.css test.mjs
git commit -m "feat: add Nitka art and calm scene motion"
```

---

### Task 4: Naturalne nagrania Nitki i zadania transferowe

**Files:**
- Create: `audio/scenes/nitka-math-1.mp3`
- Create: `audio/scenes/nitka-math-2.mp3`
- Create: `audio/scenes/nitka-math-3.mp3`
- Create: `audio/scenes/nitka-nature-1.mp3`
- Create: `audio/scenes/nitka-nature-2.mp3`
- Create: `audio/scenes/nitka-nature-3.mp3`
- Create: `audio/scenes/nitka-english-1.mp3`
- Create: `audio/scenes/nitka-english-2.mp3`
- Create: `audio/scenes/nitka-english-3.mp3`
- Modify: `app.js:14-280`
- Modify: `audio/time-after-1445-question.mp3`
- Modify: `audio/time-after-1445-prerequisite.mp3`
- Modify: `test.mjs:240-386`

**Interfaces:**
- Consumes: dokładne teksty `SCENES[*].steps[*].transcript` i istniejący mechanizm statycznych MP3.
- Produces: dziewięć nagrań sceny, zmienione matematyczne zadanie transferowe i jego dwa zgodne nagrania.

- [ ] **Step 1: Przygotować nagrania dokładnie z tekstów scen**

Użyć jednego naturalnego polskiego głosu młodej dorosłej aktorki dla ośmiu polskich klipów: ciepłego, bystrego, lekko żartobliwego, bez pisku i tonu lektorki, 110–120 słów/min. `nitka-english-2.mp3` nagrać odpowiadającym mu naturalnym angielskim głosem w tempie około 95 słów/min. Każdy plik zawiera dokładnie jeden pełny `transcript` z `SCENES`; nie dzielić zdań na słowa.

Po eksporcie wyrównać technicznie każdy plik bez zmiany barwy:

```bash
for file in audio/scenes/*.mp3; do ffmpeg -y -i "$file" -af loudnorm=I=-18:LRA=7:TP=-2 "${file%.mp3}.normalized.mp3"; mv "${file%.mp3}.normalized.mp3" "$file"; done
```

- [ ] **Step 2: Zmienić istniejące pytanie matematyczne na nowy kontekst transferowy**

W zadaniu `time-after-1445` zachować `id` i `atomId`, lecz zmienić:

```js
prompt: "Która godzina będzie 30 minut po 16:35?",
answers: ["17:05", "1705"],
hint: "Najpierw policz minuty do 17:00.",
prerequisitePrompt: "Ile minut brakuje od 16:35 do 17:00?",
prerequisiteAnswers: ["25", "dwadziescia piec"],
example: "Od 14:45 do 15:00 mija 15 minut.",
```

W `PRESENTATIONS["time-after-1445"]` ustawić:

```js
{ prompt: "Jest 16:35. Która godzina będzie za 30 minut?", visualLabel: "Oś czasu od szesnastej trzydzieści pięć przez siedemnastą", choices: ["16:55", "17:05", "17:35"], prerequisiteChoices: ["15", "25", "35"] }
```

W `visualMarkup` zmienić etykiety osi tego zadania na `16:35`, `17:00`, `?`. Nagrać ponownie dwa istniejące pliki:

- `audio/time-after-1445-question.mp3`: „Jest szesnasta trzydzieści pięć. Która godzina będzie za trzydzieści minut?”
- `audio/time-after-1445-prerequisite.mp3`: „Ile minut brakuje od szesnastej trzydzieści pięć do siedemnastej?”

- [ ] **Step 3: Dodać testy plików audio i transferowego kontekstu**

```js
test("every Nitka scene step has a non-empty recorded clip", async () => {
  for (const scene of Object.values(SCENES)) {
    for (const step of scene.steps) {
      const clip = await stat(new URL(step.audio, import.meta.url));
      assert.ok(clip.size > 1_000, step.audio);
    }
  }
});

test("the math task transfers the scene rule to a new time", () => {
  const task = TASKS.find(item => item.id === "time-after-1445");
  assert.equal(task.prompt.includes("16:35"), true);
  assert.equal(evaluateAnswer(task, "17:05"), "correct");
  assert.equal(SCENES[task.id].check.prompt.includes("Nitki"), true);
});
```

- [ ] **Step 4: Uruchomić automatyczne sprawdzenia**

Run: `node --test test.mjs`

Expected: wszystkie testy PASS.

Run: `for file in audio/scenes/*.mp3; do ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$file"; done`

Expected: dziewięć dodatnich czasów trwania, każdy poniżej 12 sekund.

- [ ] **Step 5: Wykonać obowiązkowy odsłuch**

Odtworzyć kolejno dziewięć klipów oraz dwa zmienione pytania. Kryteria: brak urwanych sylab, poprawne `14:45`, `15:15`, `16:35`, naturalne pauzy, spójna barwa Nitki i wyraźne angielskie „an orange scarf”. Jeśli choć jeden klip brzmi sztucznie lub rwano, wygenerować ponownie tylko ten klip i powtórzyć odsłuch.

- [ ] **Step 6: Commit**

```bash
git add app.js test.mjs audio/scenes audio/time-after-1445-question.mp3 audio/time-after-1445-prerequisite.mp3
git commit -m "feat: add recorded Nitka scenes and transfer prompt"
```

---

### Task 5: Integracja ekranu startowego, weryfikacja i publikacja

**Files:**
- Modify: `app.js:623-803`
- Modify: `styles.css:1-453`
- Modify: `test.mjs:240-386`

**Interfaces:**
- Consumes: wszystkie funkcje, widoki, style i zasoby z zadań 1–4.
- Produces: zaproszenie Nitki na ekranie startowym, kompletne zachowanie w trzech trybach i publiczne wdrożenie GitHub Pages.

- [ ] **Step 1: Napisać test zaproszenia i zachowania wspólnego profilu**

```js
test("home introduces Nitka without removing the three learning modes", () => {
  const root = { className: "", innerHTML: "" };
  renderApp(root, createInitialState());
  assert.match(root.innerHTML, /Króliczka Nitka/);
  assert.equal((root.innerHTML.match(/class="mode-card"/g) ?? []).length, 3);
});

test("scene completion survives mode changes and knowledge stays shared", () => {
  let state = beginScene(createInitialState(), "living-mushroom");
  state.modeSessions.focus.scene.phase = "check";
  state = answerScene(state, "królik i roślina").state;
  state = switchMode(state, "explore");
  state = switchMode(state, "focus");
  assert.equal(state.modeSessions.focus.scene.seenTaskIds.includes("living-mushroom"), true);
  assert.equal(state.knowledge["NATURE.LIVING_CLASSIFICATION"], undefined);
});
```

- [ ] **Step 2: Dodać zaproszenie Nitki do `homeView`**

Przed `.mode-grid` dodać:

```js
<div class="nitka-home">
  <img src="./images/kroliczka-nitka.png" alt="Króliczka Nitka, projektantka mody i prowadząca misje">
  <div><p class="eyebrow">Nowe mikro-misje</p><h2>Króliczka Nitka ma plan</h2><p>Krótka historia, jeden sprytny problem i jedno pytanie.</p></div>
</div>
```

Dodać spokojny układ bez osobnego przycisku; wybór trybu pozostaje jedyną decyzją na ekranie:

```css
.nitka-home { display: grid; grid-template-columns: 150px 1fr; align-items: center; gap: 24px; max-width: 720px; margin: 0 0 28px; padding: 18px; border-radius: 18px; background: #f3e8dc; }
.nitka-home img { width: 150px; height: 150px; object-fit: cover; object-position: 50% 24%; border-radius: 14px; }
.nitka-home h2, .nitka-home p { margin-bottom: 8px; }
```

W media query mobilnym ustawić `.nitka-home { grid-template-columns: 96px 1fr; }` oraz obraz `96px × 120px`.

- [ ] **Step 3: Uruchomić pełne testy**

Run: `node --test test.mjs`

Expected: wszystkie testy PASS; liczba testów jest większa od dotychczasowych 39.

- [ ] **Step 4: Sprawdzić ręcznie w przeglądarce**

Uruchomić statyczny serwer i przejść ścieżki:

1. „Ścieżka odkrywcy” → Matematyka → scena Nitki → błędna odpowiedź → jeden potrzebny kadr → poprawna odpowiedź → zadanie 16:35.
2. Przełączenie Matematyka → Przyroda w drugim kadrze → powrót do Matematyki zachowuje drugi kadr.
3. Angielski odtwarza polski wstęp i osobny angielski model bez automatycznego startu.
4. Usunięcie jednego pliku MP3 w narzędziach przeglądarki nie blokuje „Dalej” ani „Pomiń”.
5. Szerokości 320 px, 768 px i desktop nie powodują poziomego przewijania.
6. Klawiatura przechodzi logicznie przez audio, „Jeszcze raz”, „Pomiń”, „Dalej” i odpowiedzi; fokus jest widoczny.
7. Emulacja `prefers-reduced-motion: reduce` usuwa ruch, lecz zachowuje treść.
8. Konsola nie zawiera błędów JavaScript.

- [ ] **Step 5: Commit integracyjny**

```bash
git add app.js styles.css test.mjs
git commit -m "feat: introduce Nitka on the tutor home screen"
```

- [ ] **Step 6: Zweryfikować różnice i stan gałęzi**

Run:

```bash
git diff --check HEAD~5..HEAD
git status --short
```

Expected: brak błędów formatowania; brak niezamierzonych plików. `.superpowers/brainstorm/` i `docs/reports/` nie wchodzą do commitów funkcji.

- [ ] **Step 7: Wypchnąć gałąź, utworzyć PR i opublikować po scaleniu**

```bash
git push -u origin HEAD
gh pr create --fill
```

Po scaleniu sprawdzić `https://witczakm.github.io/hania-tutor/`: strona zwraca 200, ilustracja i wszystkie dziewięć plików scen zwracają 200/206, a pełna ścieżka matematyczna działa bez błędów konsoli.

