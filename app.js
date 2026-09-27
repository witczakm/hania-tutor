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
    prompt: "Która godzina będzie 30 minut po 14:45?",
    answers: ["15:15", "1515"],
    hint: "Najpierw policz minuty do 15:00.",
    prerequisitePrompt: "Ile minut brakuje od 14:45 do 15:00?",
    prerequisiteAnswers: ["15", "pietnascie"],
    example: "Od 13:50 do 14:00 mija 10 minut.",
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

function createSession(currentTaskId = TASKS[0].id) {
  return {
    currentTaskId,
    currentStep: 0,
    diagnosticCount: 0,
    helpLevel: 0,
    consecutiveErrors: 0,
  };
}

export function createInitialState() {
  return {
    version: 1,
    activeMode: "focus",
    knowledge: {},
    modeSessions: {
      focus: createSession(),
      explore: createSession(),
      review: createSession(),
    },
    history: [],
  };
}

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
    return value?.version === 1 && value.knowledge && value.modeSessions
      ? value
      : createInitialState();
  } catch {
    return createInitialState();
  }
}

export function selectNextTask(state, modeId = state.activeMode) {
  if (modeId === "review") {
    const dueAtom = Object.entries(state.knowledge)
      .find(([, knowledge]) => knowledge.status !== "UNSEEN" && knowledge.nextReviewAt <= Date.now())?.[0];
    return TASKS.find(task => task.atomId === dueAtom) ?? null;
  }

  const session = state.modeSessions[modeId];
  return TASKS.find(task => task.id === session?.currentTaskId) ?? TASKS[0];
}

export function chooseAction(state, task, result) {
  const session = state.modeSessions[state.activeMode];
  if (session.consecutiveErrors >= 2 && result === "incorrect") return ACTIONS.TAKE_BREAK;
  if (result === "dont_know" || result === "no_response") return ACTIONS.GIVE_HINT;
  if (result === "correct") return ACTIONS.ADVANCE;
  if (session.diagnosticCount < 4) return ACTIONS.CHECK_PREREQUISITE;
  return ACTIONS.SIMPLIFY;
}

export function applyAnswer(state, value) {
  const next = structuredClone(state);
  const session = next.modeSessions[next.activeMode];
  const task = TASKS.find(item => item.id === session.currentTaskId) ?? TASKS[0];
  const result = evaluateAnswer(task, value);
  const action = chooseAction(next, task, result);

  if (result === "correct") {
    const supported = session.helpLevel > 0;
    const current = next.knowledge[task.atomId] ?? { independentSuccesses: 0, supportedSuccesses: 0, contexts: [] };
    current.status = supported ? "SUPPORTED" : "INDEPENDENT";
    current.supportedSuccesses += supported ? 1 : 0;
    current.independentSuccesses += supported ? 0 : 1;
    current.lastSeenAt = Date.now();
    current.nextReviewAt = Date.now();
    next.knowledge[task.atomId] = current;
    session.consecutiveErrors = 0;
  } else if (result === "incorrect") {
    session.consecutiveErrors += 1;
    if (action === ACTIONS.CHECK_PREREQUISITE) session.diagnosticCount += 1;
  }

  if ([ACTIONS.GIVE_HINT, ACTIONS.CHECK_PREREQUISITE, ACTIONS.SIMPLIFY, ACTIONS.GIVE_EXAMPLE].includes(action)) {
    session.helpLevel += 1;
  }

  next.history.push({
    timestamp: Date.now(),
    modeId: next.activeMode,
    atomId: task.atomId,
    action,
    result,
  });

  return { state: next, action };
}
