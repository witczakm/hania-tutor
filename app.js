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
    topic: "elapsed",
    prompt: "Która godzina będzie 30 minut po 14:45?",
    answers: ["15:15", "1515"],
    hint: "Najpierw policz minuty do 15:00.",
    prerequisitePrompt: "Ile minut brakuje od 14:45 do 15:00?",
    prerequisiteAnswers: ["15", "pietnascie"],
    example: "Od 13:50 do 14:00 mija 10 minut.",
  },
];

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
