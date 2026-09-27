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
    id: "clock-minute-hand",
    atomId: "TIME.READ_MINUTES",
    subject: "math",
    topic: "clock",
    prompt: "Długa wskazówka stoi na 11. Ile minut pokazuje?",
    answers: ["55", "piecdziesiat piec"],
    hint: "Każda kolejna liczba na tarczy to jeszcze 5 minut.",
    prerequisitePrompt: "Ile minut pokazuje długa wskazówka stojąca na 2?",
    prerequisiteAnswers: ["10", "dziesiec"],
    example: "Na 1 jest 5 minut, a na 2 jest 10 minut.",
    visual: "clock",
  },
  {
    id: "time-after-1445",
    atomId: "TIME.ADD_ACROSS_HOUR",
    subject: "math",
    topic: "elapsed",
    prerequisiteAtomId: "TIME.READ_MINUTES",
    prompt: "Która godzina będzie 30 minut po 14:45?",
    answers: ["15:15", "1515"],
    hint: "Najpierw policz minuty do 15:00.",
    prerequisitePrompt: "Ile minut brakuje od 14:45 do 15:00?",
    prerequisiteAnswers: ["15", "pietnascie"],
    example: "Od 13:50 do 14:00 mija 10 minut.",
    visual: "clock",
  },
  {
    id: "calendar-next-saturday",
    atomId: "CALENDAR.NEXT_WEEKDAY",
    subject: "math",
    topic: "calendar",
    prompt: "Dziś jest poniedziałek 8 maja. Którego maja będzie najbliższa sobota?",
    answers: ["13", "13 maja", "trzynastego maja"],
    hint: "Przesuwaj się po jednym dniu: wtorek to 9 maja.",
    prerequisitePrompt: "Jaki dzień tygodnia jest po poniedziałku?",
    prerequisiteAnswers: ["wtorek"],
    example: "Jeśli poniedziałek jest 1 maja, wtorek jest 2 maja.",
    visual: "calendar",
  },
  {
    id: "roman-nine",
    atomId: "NUMBERS.ROMAN_IX",
    subject: "math",
    topic: "roman",
    prompt: "Jaką liczbę arabską zapisujemy jako IX?",
    answers: ["9", "dziewiec"],
    hint: "I stojące przed X oznacza, że odejmujemy 1 od 10.",
    prerequisitePrompt: "Jaką liczbę oznacza X?",
    prerequisiteAnswers: ["10", "dziesiec"],
    example: "VI to 5 + 1, czyli 6.",
    visual: "roman",
  },
  {
    id: "length-room-unit",
    atomId: "LENGTH.CHOOSE_UNIT",
    subject: "math",
    topic: "length",
    prompt: "Długość pokoju zapisano jako 315. Która jednostka pasuje: cm, m czy km?",
    answers: ["cm", "centymetry", "centymetrow"],
    hint: "315 metrów byłoby dłuższe niż kilka boisk.",
    prerequisitePrompt: "Ile centymetrów ma 1 metr?",
    prerequisiteAnswers: ["100", "sto"],
    example: "Biurko może mieć 120 cm długości.",
    visual: "ruler",
  },
  {
    id: "living-mushroom",
    atomId: "NATURE.LIVING_CLASSIFICATION",
    subject: "nature",
    topic: "living",
    prompt: "Czy grzyb jest elementem przyrody ożywionej?",
    answers: ["tak", "jest", "ozywionej", "przyroda ozywiona"],
    hint: "Sprawdź, czy grzyb rośnie i się rozmnaża.",
    prerequisitePrompt: "Czy roślina jest elementem przyrody ożywionej?",
    prerequisiteAnswers: ["tak", "jest"],
    example: "Kamień nie rośnie, a drzewo rośnie.",
    visual: "nature",
  },
  {
    id: "organisms-cells",
    atomId: "NATURE.ORGANISMS_CELLS",
    subject: "nature",
    topic: "organisms",
    prerequisiteAtomId: "NATURE.LIVING_CLASSIFICATION",
    prompt: "Z czego zbudowane są wszystkie organizmy?",
    answers: ["z komorek", "komorki", "komorka"],
    hint: "To bardzo małe podstawowe części budowy organizmu.",
    prerequisitePrompt: "Czy człowiek jest organizmem?",
    prerequisiteAnswers: ["tak", "jest"],
    example: "Ciało rośliny i ciało zwierzęcia są zbudowane z komórek.",
    visual: "cells",
  },
  {
    id: "life-process-growing",
    atomId: "NATURE.LIFE_PROCESS_GROWTH",
    subject: "nature",
    topic: "life-processes",
    prerequisiteAtomId: "NATURE.ORGANISMS_CELLS",
    prompt: "Dziecko staje się wyższe. Jaką czynność życiową to pokazuje?",
    answers: ["wzrost", "wzrost i rozwoj", "rozwoj"],
    hint: "Pomyśl, jak nazywa się zwiększanie rozmiarów ciała.",
    prerequisitePrompt: "Czy wzrost jest czynnością życiową?",
    prerequisiteAnswers: ["tak", "jest"],
    example: "Mała sadzonka staje się większą rośliną — to wzrost.",
    visual: "growth",
  },
  {
    id: "anthropogenic-road",
    atomId: "NATURE.ANTHROPOGENIC",
    subject: "nature",
    topic: "anthropogenic",
    prompt: "Czy asfaltowa droga jest elementem naturalnym czy antropogenicznym?",
    answers: ["antropogenicznym", "antropogeniczny"],
    hint: "Zastanów się, czy powstała bez działania człowieka.",
    prerequisitePrompt: "Czy asfaltową drogę zbudował człowiek?",
    prerequisiteAnswers: ["tak"],
    example: "Most jest antropogeniczny, bo zbudowali go ludzie.",
    visual: "road",
  },
  {
    id: "stimulus-light",
    atomId: "SENSES.STIMULUS_LIGHT",
    subject: "nature",
    topic: "stimulus",
    prerequisiteAtomId: "NATURE.LIVING_CLASSIFICATION",
    prompt: "Latarka świeci prosto w oczy. Co jest bodźcem?",
    answers: ["swiatlo", "blask", "swiatlo latarki"],
    hint: "Bodziec to zmiana, którą odbiera organizm.",
    prerequisitePrompt: "Czy dźwięk może być bodźcem?",
    prerequisiteAnswers: ["tak", "moze"],
    example: "Głośny dzwonek jest bodźcem słuchowym.",
    visual: "light",
  },
  {
    id: "senses-sound",
    atomId: "SENSES.RECEPTOR_SOUND",
    subject: "nature",
    topic: "senses",
    prerequisiteAtomId: "SENSES.STIMULUS_LIGHT",
    prompt: "Który narząd zmysłu odbiera dźwięki?",
    answers: ["ucho", "uszy", "słuch", "sluch"],
    hint: "To narząd zmysłu słuchu.",
    prerequisitePrompt: "Którym zmysłem słyszymy?",
    prerequisiteAnswers: ["sluchem", "sluch"],
    example: "Oczy odbierają światło, a uszy dźwięki.",
    visual: "ear",
  },
  {
    id: "english-thirteen",
    atomId: "EN.NUMBERS_THIRTEEN",
    subject: "english",
    topic: "numbers",
    prompt: "Jak zapiszesz cyframi angielskie słowo thirteen?",
    answers: ["13"],
    hint: "To liczba o trzy większa od ten.",
    prerequisitePrompt: "Jak zapiszesz cyframi słowo ten?",
    prerequisiteAnswers: ["10"],
    example: "twelve to 12.",
    visual: "number",
  },
  {
    id: "english-pencil-case",
    atomId: "EN.CLASSROOM_PENCIL_CASE",
    subject: "english",
    topic: "classroom",
    prompt: "Jak po angielsku nazywa się piórnik?",
    answers: ["pencil case", "a pencil case"],
    hint: "Pierwsze słowo to pencil.",
    prerequisitePrompt: "Jak po angielsku jest ołówek?",
    prerequisiteAnswers: ["pencil", "a pencil"],
    example: "A book to książka.",
    visual: "pencil-case",
  },
  {
    id: "english-they",
    atomId: "EN.PRONOUNS_THEY",
    subject: "english",
    topic: "pronouns",
    prompt: "Anna i Ola to dwie osoby. Który zaimek pasuje: she czy they?",
    answers: ["they"],
    hint: "She oznacza jedną dziewczynę, a tu są dwie osoby.",
    prerequisitePrompt: "Który zaimek pasuje do jednej dziewczyny?",
    prerequisiteAnswers: ["she"],
    example: "Tom and Alex — they.",
    visual: "people",
  },
  {
    id: "english-he-is",
    atomId: "EN.TO_BE_HE",
    subject: "english",
    topic: "be",
    prerequisiteAtomId: "EN.PRONOUNS_THEY",
    prompt: "Uzupełnij jednym słowem: He ___ ten. Co wpiszesz?",
    answers: ["is"],
    hint: "Dla he używamy tej samej formy co dla she.",
    prerequisitePrompt: "Uzupełnij: She ___ ten. Co wpiszesz?",
    prerequisiteAnswers: ["is"],
    example: "I am ten. You are ten.",
    visual: "sentence",
  },
  {
    id: "english-an-apple",
    atomId: "EN.ARTICLE_AN",
    subject: "english",
    topic: "articles",
    prompt: "Uzupełnij: It is ___ apple. Wpiszesz a czy an?",
    answers: ["an"],
    hint: "Apple zaczyna się od samogłoski.",
    prerequisitePrompt: "Jaką pierwszą literę ma słowo apple?",
    prerequisiteAnswers: ["a"],
    example: "a book, ale an orange.",
    visual: "apple",
  },
  {
    id: "english-brown-desk",
    atomId: "EN.ADJECTIVE_NOUN_ORDER",
    subject: "english",
    topic: "adjective-noun",
    prerequisiteAtomId: "EN.CLASSROOM_PENCIL_CASE",
    prompt: "Jak po angielsku powiesz brązowe biurko?",
    answers: ["brown desk", "a brown desk"],
    hint: "W angielskim najpierw podajemy kolor, potem rzecz.",
    prerequisitePrompt: "Co znaczy po angielsku desk?",
    prerequisiteAnswers: ["biurko"],
    example: "red pencil to czerwony ołówek.",
    visual: "desk",
  },
];

export const STORAGE_KEY = "hania-tutor-state-v1";

export function normalizeAnswer(value = "") {
  return value
    .trim()
    .toLocaleLowerCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.!?,]/g, "")
    .replace(/\s+/g, " ");
}

export function evaluateAnswer(task, value) {
  const answer = normalizeAnswer(value);
  if (!answer) return "no_response";
  if (["nie wiem", "niewiem"].includes(answer)) return "dont_know";
  return task.answers.map(normalizeAnswer).includes(answer) ? "correct" : "incorrect";
}

const MODES = {
  focus: { name: "Spokojny stolik", short: "Stolik", description: "Znajdujemy najmniejszą lukę i ćwiczymy tylko ją." },
  explore: { name: "Ścieżka odkrywcy", short: "Odkrywaj", description: "Poznajemy nową rzecz małymi, pewnymi krokami." },
  review: { name: "Szybka powtórka", short: "Powtórka", description: "Wracamy tylko do tego, co właśnie warto przypomnieć." },
};

const SUBJECTS = { math: "Matematyka", nature: "Przyroda", english: "Angielski" };
const VISUALS = {
  clock: "◷", calendar: "▦", roman: "IX", ruler: "↔", nature: "♧", cells: "◌",
  growth: "↗", road: "⌁", light: "☀", ear: "◖", number: "13", "pencil-case": "✎",
  people: "••", sentence: "Aa", apple: "●", desk: "▰",
};

function createSession(currentTaskId = TASKS[0].id) {
  return {
    currentTaskId,
    currentStep: 0,
    diagnosticCount: 0,
    helpLevel: 0,
    consecutiveErrors: 0,
    correctStreak: 0,
    completedCount: 0,
    subject: null,
    lastFeedback: "",
  };
}

export function createInitialState() {
  return {
    version: 1,
    activeMode: "focus",
    screen: "home",
    knowledge: {},
    modeSessions: {
      focus: createSession(),
      explore: createSession(TASKS.find(task => task.subject === "nature").id),
      review: createSession(),
    },
    history: [],
  };
}

export function switchMode(state, activeMode) {
  if (!state.modeSessions[activeMode]) return state;
  const next = structuredClone(state);
  next.activeMode = activeMode;
  next.screen = "learn";
  if (activeMode === "review" && next.modeSessions.review.completedCount >= 5) {
    next.modeSessions.review = createSession();
  }
  return next;
}

export function saveState(storage, state) {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState(storage) {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY));
    if (value?.version !== 1 || !value.knowledge || !value.modeSessions || !MODES[value.activeMode]
      || !["focus", "explore", "review"].every(mode => value.modeSessions[mode]?.currentTaskId)) {
      return createInitialState();
    }
    const initial = createInitialState();
    return {
      ...initial,
      ...value,
      screen: value.screen ?? "home",
      modeSessions: Object.fromEntries(Object.keys(initial.modeSessions).map(mode => [
        mode,
        { ...initial.modeSessions[mode], ...value.modeSessions[mode] },
      ])),
    };
  } catch {
    return createInitialState();
  }
}

export function selectNextTask(state, modeId = state.activeMode) {
  if (modeId === "review") {
    if (state.modeSessions.review.completedCount >= 5) return null;
    const dueAtom = Object.entries(state.knowledge)
      .find(([, knowledge]) => knowledge.status !== "UNSEEN" && knowledge.nextReviewAt <= Date.now())?.[0];
    return TASKS.find(task => task.atomId === dueAtom) ?? null;
  }

  if (modeId === "explore") {
    const subject = state.modeSessions.explore.subject;
    if (!subject) return null;
    const isReady = task => !task.prerequisiteAtomId
      || ["INDEPENDENT", "TRANSFERRED", "RETAINED"].includes(state.knowledge[task.prerequisiteAtomId]?.status);
    const tasks = TASKS.filter(task => task.subject === subject && isReady(task));
    return tasks.find(task => !state.knowledge[task.atomId])
      ?? tasks.find(task => state.knowledge[task.atomId]?.status !== "RETAINED")
      ?? tasks[0]
      ?? null;
  }

  const session = state.modeSessions[modeId];
  return TASKS.find(task => task.id === session?.currentTaskId) ?? TASKS[0];
}

export function getTaskById(id) {
  return TASKS.find(task => task.id === id) ?? TASKS[0];
}

export function getActionContent(action, task) {
  return {
    [ACTIONS.ADVANCE]: "Dobrze. Przechodzimy o jeden krok dalej.",
    [ACTIONS.REPEAT_DIFFERENTLY]: "Sprawdźmy to jeszcze raz, innymi słowami.",
    [ACTIONS.SIMPLIFY]: "Zrobimy teraz prostszą wersję tego samego zadania.",
    [ACTIONS.GIVE_HINT]: task.hint,
    [ACTIONS.SHOW_VISUAL]: "Spójrz na podpowiedź obrazkową.",
    [ACTIONS.CHECK_PREREQUISITE]: "Sprawdźmy jeden wcześniejszy krok.",
    [ACTIONS.GIVE_EXAMPLE]: `${task.example} Teraz wróćmy do zadania.`,
    [ACTIONS.RETRIEVE_OLD_KNOWLEDGE]: "Przypomnijmy sobie podobną rzecz.",
    [ACTIONS.TAKE_BREAK]: "Trzy próby wystarczą. Krótka przerwa pomoże głowie odpocząć.",
    [ACTIONS.END_SESSION]: "Na dziś wystarczy. Dobra praca.",
  }[action];
}

export function chooseAction(state, task, result) {
  const session = state.modeSessions[state.activeMode];
  if (state.activeMode === "review" && result !== "correct") return ACTIONS.END_SESSION;
  if (session.consecutiveErrors >= 2 && result === "incorrect") return ACTIONS.TAKE_BREAK;
  if (result === "dont_know" || result === "no_response") return ACTIONS.GIVE_HINT;
  if (result === "correct") return ACTIONS.ADVANCE;
  if (session.diagnosticCount < 4) return ACTIONS.CHECK_PREREQUISITE;
  return ACTIONS.SIMPLIFY;
}

export function applyAnswer(state, value) {
  const next = structuredClone(state);
  const session = next.modeSessions[next.activeMode];
  const task = selectNextTask(next) ?? getTaskById(session.currentTaskId);
  session.currentTaskId = task.id;
  const question = session.currentStep === 1
    ? { ...task, answers: task.prerequisiteAnswers }
    : task;
  const result = evaluateAnswer(question, value);
  let action = session.currentStep === 1 && result === "correct"
    ? ACTIONS.GIVE_EXAMPLE
    : chooseAction(next, task, result);

  if (result === "correct" && session.currentStep === 1) {
    session.currentStep = 2;
    session.consecutiveErrors = 0;
    session.helpLevel += 1;
  } else if (result === "correct") {
    const supported = session.helpLevel > 0;
    const current = next.knowledge[task.atomId] ?? { independentSuccesses: 0, supportedSuccesses: 0, contexts: [] };
    current.independentSuccesses ??= 0;
    current.supportedSuccesses ??= 0;
    current.contexts ??= [];
    current.supportedSuccesses += supported ? 1 : 0;
    current.independentSuccesses += supported ? 0 : 1;
    current.helpUsed = (current.helpUsed ?? 0) + (supported ? 1 : 0);
    if (!supported && !current.contexts.includes(next.activeMode)) current.contexts.push(next.activeMode);
    if (supported) {
      current.status ??= "SUPPORTED";
    } else if (current.status === "TRANSFERRED" && next.activeMode === "review") {
      current.status = "RETAINED";
    } else {
      current.status = current.contexts.length >= 2 ? "TRANSFERRED" : "INDEPENDENT";
    }
    current.lastSeenAt = Date.now();
    current.nextReviewAt = Date.now() + (supported ? 86_400_000 : 259_200_000);
    next.knowledge[task.atomId] = current;
    session.consecutiveErrors = 0;
    session.correctStreak += 1;
    session.currentStep = 0;
    session.diagnosticCount = 0;
    session.helpLevel = 0;
    if (next.activeMode === "review") session.completedCount += 1;
    if (next.activeMode === "review" && session.completedCount >= 5) action = ACTIONS.END_SESSION;
    else if (session.correctStreak === 5) action = ACTIONS.RETRIEVE_OLD_KNOWLEDGE;

    const currentIndex = TASKS.indexOf(task);
    const candidates = [...TASKS.slice(currentIndex + 1), ...TASKS.slice(0, currentIndex + 1)];
    const nextTask = next.activeMode === "focus"
      ? candidates.find(item => next.knowledge[item.atomId]?.status !== "RETAINED")
      : selectNextTask(next, next.activeMode);
    if (nextTask) session.currentTaskId = nextTask.id;
  } else if (result === "incorrect") {
    session.consecutiveErrors += 1;
    session.correctStreak = 0;
    if (action === ACTIONS.CHECK_PREREQUISITE) {
      session.diagnosticCount += 1;
      session.currentStep = 1;
    }
    if (next.activeMode === "review") {
      const current = next.knowledge[task.atomId] ?? { status: "SUPPORTED", contexts: [] };
      current.failedReviews = (current.failedReviews ?? 0) + 1;
      current.lastSeenAt = Date.now();
      next.knowledge[task.atomId] = current;
    }
  }

  if (action !== ACTIONS.GIVE_EXAMPLE && [ACTIONS.GIVE_HINT, ACTIONS.CHECK_PREREQUISITE, ACTIONS.SIMPLIFY].includes(action)) {
    session.helpLevel += 1;
  }

  session.lastFeedback = action === ACTIONS.END_SESSION && result !== "correct"
    ? "To jeszcze nie jest pewne. Zapisuję ten punkt i proponuję wrócić do niego w Spokojnym stoliku."
    : action === ACTIONS.END_SESSION
      ? "Pięć krótkich powtórek wystarczy. Na dziś ta seria jest skończona."
      : getActionContent(action, task);
  if (next.activeMode === "review" && action === ACTIONS.END_SESSION && result !== "correct") {
    next.modeSessions.focus = { ...createSession(task.id), lastFeedback: "Wróćmy spokojnie do punktu, który sprawił trudność." };
  }
  if (action === ACTIONS.TAKE_BREAK) next.screen = "break";
  if (action === ACTIONS.END_SESSION) next.screen = "end";

  next.history.push({
    timestamp: Date.now(),
    modeId: next.activeMode,
    atomId: task.atomId,
    action,
    result,
  });

  return { state: next, action };
}

function currentPrompt(task, session) {
  if (session.currentStep === 1) return task.prerequisitePrompt;
  return task.prompt;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);
}

function header() {
  return `<header class="topbar">
    <button class="brand" data-screen="home"><span class="brand-mark">H</span><span>Spokojna nauka</span></button>
    <nav class="top-actions" aria-label="Główna nawigacja">
      <button class="quiet-button" data-screen="home">Tryby nauki</button>
      <button class="quiet-button" data-screen="progress">Moje postępy</button>
    </nav>
  </header>`;
}

function homeView(state) {
  const known = Object.keys(state.knowledge).length;
  return `<section aria-labelledby="welcome-title">
    <p class="eyebrow">Jedno pytanie. Jeden krok.</p>
    <h1 id="welcome-title">Czego dziś potrzebujesz?</h1>
    <p class="intro">Każdy tryb korzysta z tych samych postępów. Możesz się przełączać i zawsze wrócisz dokładnie tam, gdzie skończyłaś. ${known ? `Rozpoczęte obszary: ${known}.` : "Zaczniemy spokojnie."}</p>
    <div class="mode-grid">
      ${Object.entries(MODES).map(([id, mode], index) => `<button class="mode-card" data-mode="${id}">
        <span class="mode-number">0${index + 1}</span><h2>${mode.name}</h2><p>${mode.description}</p><span class="mode-arrow" aria-hidden="true">→</span>
      </button>`).join("")}
    </div>
  </section>`;
}

function modeNav(activeMode) {
  return `<nav class="mode-nav" aria-label="Tryby nauki">${Object.entries(MODES).map(([id, mode]) =>
    `<button class="mode-pill" data-mode="${id}" aria-current="${id === activeMode}">${mode.short}</button>`).join("")}</nav>`;
}

function explorerSubjectView(state) {
  return `${modeNav(state.activeMode)}<section class="question-card"><p class="eyebrow">Ścieżka odkrywcy</p><h1>Wybierz dziedzinę</h1><p class="intro">Pokażę tylko taki nowy krok, do którego masz już potrzebne podstawy.</p><div class="subject-grid">
    ${Object.entries(SUBJECTS).map(([id, label]) => `<button class="subject-button" data-subject="${id}">${label}<span aria-hidden="true">→</span></button>`).join("")}
  </div></section>`;
}

function explorerMap(state, subject) {
  const tasks = TASKS.filter(task => task.subject === subject);
  return `<div class="explorer-map" aria-label="Mapa dziedziny">${tasks.map(task => {
    const status = state.knowledge[task.atomId]?.status;
    return `<span class="map-node ${status ? "is-known" : ""}" title="${escapeHtml(task.prompt)}">${status ? "✓" : "○"}</span>`;
  }).join("")}</div>`;
}

function learningView(state) {
  if (state.activeMode === "explore" && !state.modeSessions.explore.subject) return explorerSubjectView(state);
  const task = selectNextTask(state);
  if (!task) return `${modeNav(state.activeMode)}<section class="question-card empty-state"><div class="visual-cue" aria-hidden="true">✓</div><h1>Na teraz wszystko powtórzone</h1><p class="intro">Wróć później. Aplikacja zachowa postępy i wybierze odpowiedni moment na kolejną powtórkę.</p><button class="primary-button" data-screen="home">Wybierz inny tryb</button></section>`;
  const session = state.modeSessions[state.activeMode];
  const feedback = session.lastFeedback ? `<p class="feedback">${escapeHtml(session.lastFeedback)}</p>` : "";
  const modeDetail = state.activeMode === "review" ? `pozostało: ${5 - session.completedCount}` : MODES[state.activeMode].name;
  const map = state.activeMode === "explore" ? explorerMap(state, session.subject) : "";
  return `${modeNav(state.activeMode)}<div>${map}<section class="question-card" aria-labelledby="question-title">
    <div class="progress-line"><span class="subject-tag">${SUBJECTS[task.subject]}</span><span>${modeDetail}</span></div>
    <div class="visual-cue" aria-hidden="true">${VISUALS[task.visual] ?? "•"}</div>
    ${feedback}<h1 id="question-title">${escapeHtml(currentPrompt(task, session))}</h1>
    <form class="answer-form" id="answer-form">
      <label for="answer">Twoja odpowiedź</label>
      <div class="answer-row"><input id="answer" name="answer" autocomplete="off" inputmode="text"><button class="primary-button" type="submit">Sprawdź</button></div>
      <span class="answer-note">Możesz też wpisać „nie wiem”.</span>
    </form>
    <div class="session-actions"><button class="quiet-button" id="take-break">Potrzebuję przerwy</button></div>
  </section></div>`;
}

function progressView(state) {
  const entries = TASKS.map(task => ({ task, knowledge: state.knowledge[task.atomId] })).filter(item => item.knowledge);
  const independent = entries.filter(item => ["INDEPENDENT", "TRANSFERRED", "RETAINED"].includes(item.knowledge.status)).length;
  const supported = entries.filter(item => item.knowledge.status === "SUPPORTED").length;
  const due = entries.filter(item => item.knowledge.nextReviewAt <= Date.now()).length;
  return `<section class="panel" aria-labelledby="progress-title"><p class="eyebrow">Wspólna baza wiedzy</p><h1 id="progress-title">Moje postępy</h1>
    <p class="intro">To, czego nauczysz się w jednym trybie, jest od razu dostępne w pozostałych.</p>
    <div class="progress-grid"><div class="stat"><strong>${independent}</strong><span>umiem samodzielnie</span></div><div class="stat"><strong>${supported}</strong><span>umiem z pomocą</span></div><div class="stat"><strong>${due}</strong><span>do powtórki</span></div></div>
    <div class="knowledge-list">${entries.length ? entries.map(({ task, knowledge }) => `<div class="knowledge-row"><span>${SUBJECTS[task.subject]} · ${escapeHtml(task.prompt.replace("?", ""))}<small>Pomoc: ${knowledge.helpUsed ?? 0} · powtórka: ${knowledge.nextReviewAt ? new Date(knowledge.nextReviewAt).toLocaleDateString("pl-PL") : "jeszcze nie"}</small></span><span class="status">${knowledge.status === "SUPPORTED" ? "z pomocą" : knowledge.status === "RETAINED" ? "utrwalone" : knowledge.status === "TRANSFERRED" ? "użyte w nowej sytuacji" : "samodzielnie"}</span></div>`).join("") : "<p>Jeszcze nic tu nie ma. Pierwsza odpowiedź rozpocznie profil wiedzy.</p>"}</div>
    <h2>Ostatnie działania</h2><div class="history-list">${state.history.length ? state.history.slice(-5).reverse().map(item => {
      const task = TASKS.find(candidate => candidate.atomId === item.atomId);
      return `<p>${task ? SUBJECTS[task.subject] : "Nauka"} · ${item.result === "correct" ? "odpowiedź poprawna" : item.result === "dont_know" ? "potrzebna podpowiedź" : "odpowiedź do sprawdzenia"}</p>`;
    }).join("") : "<p>Brak działań.</p>"}</div>
    <button class="quiet-button" id="reset-progress">Wyzeruj postępy</button>
  </section>`;
}

function breakView() {
  return `<section class="panel empty-state"><div class="visual-cue" aria-hidden="true">≈</div><p class="eyebrow">Krótka przerwa</p><h1>Głowa może odpocząć</h1><p class="intro">Trzy trudne próby to wystarczająco dużo. Gdy będziesz gotowa, wrócimy do jednego prostego kroku.</p><button class="primary-button" id="resume">Wracam</button></section>`;
}

function endView(state) {
  const feedback = state.modeSessions[state.activeMode].lastFeedback;
  return `<section class="panel empty-state"><div class="visual-cue" aria-hidden="true">✓</div><p class="eyebrow">Koniec tej serii</p><h1>${escapeHtml(feedback)}</h1><div class="end-actions">${state.activeMode === "review" ? '<button class="primary-button" data-mode="focus">Przejdź do Spokojnego stolika</button>' : ""}<button class="quiet-button" data-screen="home">Wybierz tryb</button></div></section>`;
}

export function renderApp(root, state) {
  root.className = `app-shell mode-${state.activeMode}`;
  const content = state.screen === "progress" ? progressView(state)
    : state.screen === "break" ? breakView()
      : state.screen === "end" ? endView(state)
      : state.screen === "learn" ? `<div class="learning-layout">${learningView(state)}</div>`
        : homeView(state);
  root.innerHTML = `${header()}${content}`;
}

if (typeof document !== "undefined") {
  const root = document.querySelector("#app");
  const announcer = document.querySelector("#announcer");
  let state = loadState(localStorage);

  const commit = (next, announcement = "") => {
    state = next;
    saveState(localStorage, state);
    renderApp(root, state);
    announcer.textContent = announcement;
    bindEvents();
  };

  const bindEvents = () => {
    root.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => commit(switchMode(state, button.dataset.mode))));
    root.querySelectorAll("[data-screen]").forEach(button => button.addEventListener("click", () => commit({ ...state, screen: button.dataset.screen })));
    root.querySelectorAll("[data-subject]").forEach(button => button.addEventListener("click", () => {
      const next = structuredClone(state);
      next.modeSessions.explore.subject = button.dataset.subject;
      next.modeSessions.explore.currentTaskId = TASKS.find(task => task.subject === button.dataset.subject).id;
      commit(next);
    }));
    root.querySelector("#answer-form")?.addEventListener("submit", event => {
      event.preventDefault();
      const { state: next } = applyAnswer(state, new FormData(event.currentTarget).get("answer"));
      commit(next, next.modeSessions[next.activeMode].lastFeedback);
      root.querySelector("#answer")?.focus();
    });
    root.querySelector("#resume")?.addEventListener("click", () => {
      const next = structuredClone(state);
      const session = next.modeSessions[next.activeMode];
      session.consecutiveErrors = 0;
      session.lastFeedback = "Zaczynamy od jednego małego kroku.";
      next.screen = "learn";
      commit(next);
    });
    root.querySelector("#take-break")?.addEventListener("click", () => commit({ ...state, screen: "break" }, "Robimy krótką przerwę."));
    root.querySelector("#reset-progress")?.addEventListener("click", () => {
      if (confirm("Wyzerować zapisane postępy?")) commit({ ...createInitialState(), screen: "progress" }, "Postępy zostały wyzerowane.");
    });
  };

  renderApp(root, state);
  bindEvents();
}
