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
    prompt: "Która godzina będzie 30 minut po 16:35?",
    answers: ["17:05", "1705"],
    hint: "Najpierw policz minuty do 17:00.",
    prerequisitePrompt: "Ile minut brakuje od 16:35 do 17:00?",
    prerequisiteAnswers: ["25", "dwadziescia piec"],
    example: "Od 14:45 do 15:00 mija 15 minut.",
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
    answers: ["antropogenicznym", "antropogeniczny", "antropogeniczna"],
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

export const SCENES = Object.freeze({
  "time-after-1445": {
    id: "nitka-math-time",
    taskId: "time-after-1445",
    subject: "math",
    title: "Pokaz mody bez spóźnienia",
    art: "./images/scene-math-fashion.webp",
    artAlt: "Nitka w pracowni mody pokazuje zegary, kalendarz, rzymskie oznaczenia ubrań i plan sali z miarką",
    steps: [
      { shot: "wide", beat: "Misja: pokaz zaczyna się punktualnie", transcript: "Nitka szykuje pokaz mody. Musi ogarnąć zegar, kalendarz i miarkę. Kokarda już panikuje." },
      { shot: "clock", beat: "11 × 5 minut = 55 minut", transcript: "Na zegarze każda liczba to 5 minut. Długa wskazówka na 11 oznacza 55 minut." },
      { shot: "right", beat: "14:45 → 15:00 → 15:15", transcript: "Od 14:45 do 15:00 jest 15 minut. Jeszcze 15 minut daje 15:15. Razem: 30 minut." },
      { shot: "lower", beat: "Poniedziałek 8 + 5 dni = sobota 13", transcript: "W kalendarzu idziemy dzień po dniu. Od poniedziałku 8 maja do soboty mijamy 5 dni: sobota to 13 maja." },
      { shot: "right", beat: "I = 1 · V = 5 · X = 10", transcript: "Rzymskie I to 1, V to 5, X to 10. Mniejsza liczba przed większą oznacza odejmowanie." },
      { shot: "right", beat: "IX = 10 − 1 = 9", transcript: "Dlatego IX to 10 minus 1, czyli 9. Nitka nie zamawia dziewięciu kapeluszy przez pomyłkę." },
      { shot: "lower-right", beat: "drobiazg: mm · przedmiot: cm · pokój: m", transcript: "Milimetry mierzą drobiazgi, centymetry małe przedmioty, metry pokój, a kilometry trasę." },
      { shot: "lower-right", beat: "315 cm = 3 m 15 cm", transcript: "Pokój może mieć 315 centymetrów, czyli 3 metry i 15 centymetrów. Nie 315 kilometrów — to byłby bardzo długi pokój." },
    ],
    checks: [
      { atomId: "TIME.READ_MINUTES", replayStep: 1, prompt: "Długa wskazówka jest na 11. Ile to minut?", choices: ["50", "55", "60"], answers: ["55"] },
      { atomId: "TIME.ADD_ACROSS_HOUR", replayStep: 2, prompt: "Która godzina będzie 30 minut po 14:45?", choices: ["15:00", "15:15", "15:45"], answers: ["15:15", "1515"] },
      { atomId: "DATE.WEEKDAY_OFFSET", replayStep: 3, prompt: "Poniedziałek to 8 maja. Kiedy będzie sobota?", choices: ["10 maja", "13 maja", "15 maja"], answers: ["13 maja", "13"] },
      { atomId: "NUMBER.ROMAN_SUBTRACTIVE", replayStep: 5, prompt: "Jaką liczbę oznacza IX?", choices: ["6", "9", "11"], answers: ["9"] },
      { atomId: "MEASURE.UNIT_LENGTH", replayStep: 7, prompt: "Pokój ma długość 315. Która jednostka pasuje?", choices: ["cm", "m", "km"], answers: ["cm", "centymetry", "centymetrow"] },
    ],
  },
  "living-mushroom": {
    id: "nitka-nature-organism",
    taskId: "living-mushroom",
    subject: "nature",
    title: "Ogród, który odpowiada",
    art: "./images/scene-nature-greenhouse.webp",
    artAlt: "Nitka w szklarni bada roślinę, grzyb, kamień i kapelusz oraz doświadczenia ze światłem, okiem, dźwiękiem i uchem",
    steps: [
      { shot: "wide", beat: "Co tu żyje, a co tylko świetnie wygląda?", transcript: "Nitka urządza ogród do zdjęcia kolekcji: królik, grzyb, kamień i bardzo elegancki kapelusz." },
      { shot: "left", beat: "organizm rośnie · oddycha · odżywia się", transcript: "Królik, grzyb i roślina są organizmami. Rosną, oddychają i potrzebują wody lub pokarmu." },
      { shot: "upper-left", beat: "organizm → komórki", transcript: "Każdy organizm jest zbudowany z komórek. Są tak małe, że zwykle potrzebujemy mikroskopu." },
      { shot: "lower", beat: "nasiono → kiełek → roślina", transcript: "Wzrost, odżywianie, oddychanie, ruch, rozmnażanie i reagowanie to czynności życiowe." },
      { shot: "center", beat: "ławka: zrobiona przez człowieka", transcript: "Droga i ławka zostały zrobione przez ludzi. To elementy antropogeniczne. Kamień i rzeka są naturalne." },
      { shot: "upper-right", beat: "światło = bodziec", transcript: "Światło latarki jest bodźcem: zmianą, którą organizm może odebrać." },
      { shot: "upper-right", beat: "oko ma receptory światła", transcript: "Oko ma receptory odbierające światło. Receptor odbiera bodziec i przekazuje informację dalej." },
      { shot: "right", beat: "dźwięk → ucho → słuch", transcript: "Uszy — słuch, oczy — wzrok, nos — węch, język — smak, skóra — dotyk. Kapelusz nadal niczego nie słyszy." },
    ],
    checks: [
      { atomId: "NATURE.LIVING_CLASSIFICATION", replayStep: 1, prompt: "Czy grzyb należy do przyrody ożywionej?", choices: ["tak", "nie"], answers: ["tak"] },
      { atomId: "NATURE.ORGANISM_CELLS", replayStep: 2, prompt: "Z czego są zbudowane organizmy?", choices: ["z komórek", "z kamieni", "z plastiku"], answers: ["z komórek", "z komorek", "komorki"] },
      { atomId: "NATURE.LIFE_PROCESS_GROWTH", replayStep: 3, prompt: "Dziecko staje się wyższe. Jaką czynność życiową pokazuje?", choices: ["wzrost", "oddychanie", "ruch"], answers: ["wzrost"] },
      { atomId: "NATURE.ANTHROPOGENIC", replayStep: 4, prompt: "Jaka jest asfaltowa droga?", choices: ["naturalna", "antropogeniczna"], answers: ["antropogeniczna"] },
      { atomId: "NATURE.STIMULUS", replayStep: 5, prompt: "Latarka świeci w oczy. Co jest bodźcem?", choices: ["światło", "oko", "latarka"], answers: ["światło", "swiatlo"] },
      { atomId: "NATURE.SENSE_RECEPTOR", replayStep: 7, prompt: "Który narząd odbiera dźwięki?", choices: ["ucho", "oko", "nos"], answers: ["ucho", "uszy"] },
    ],
  },
  "english-an-apple": {
    id: "nitka-english-an",
    taskId: "english-an-apple",
    subject: "english",
    title: "Szafa Nitki mówi po angielsku",
    art: "./images/scene-english-wardrobe.webp",
    artAlt: "Nitka w modnej garderobie pokazuje pomarańczowy szalik, przybory szkolne, zdjęcia osób i puste dymki do układania angielskich zdań",
    steps: [
      { shot: "wide", beat: "thirteen = 13 · thirty = 30", transcript: "Thirteen to 13. Uwaga: thirty to 30 — brzmi podobnie, ale ma końcówkę -ty." },
      { shot: "lower-right", beat: "pencil · book · desk · pencil case", transcript: "Pencil to ołówek, book to książka, desk to biurko, a pencil case to piórnik." },
      { shot: "right", beat: "she · he · they", transcript: "I — ja, you — ty lub wy, he — on, she — ona, it — rzecz, we — my, they — oni lub one." },
      { shot: "center", beat: "I am · you are · he is", transcript: "Czasownik to be zmienia ubranie: I am, you are, he is, she is, it is, we are, they are." },
      { shot: "left", beat: "an orange scarf", transcript: "Przed dźwiękiem samogłoski używamy an: an apple, an orange scarf. Przed innym dźwiękiem używamy a." },
      { shot: "left", beat: "Posłuchaj: an orange scarf", audio: "./audio/scenes/nitka-english-2.mp3", lang: "en-GB", transcript: "An orange scarf." },
      { shot: "lower", beat: "brown + desk = brown desk", transcript: "Po angielsku cecha stoi przed rzeczą: brown desk, red pencil, funny rabbit." },
      { shot: "wide", beat: "She is ten. An orange scarf. A brown desk.", transcript: "Nitka podsumowuje: She is ten. An orange scarf. A brown desk. Kolejność słów trzyma styl w ryzach." },
    ],
    checks: [
      { atomId: "EN.NUMBER_13", replayStep: 0, prompt: "Która liczba to thirteen?", choices: ["12", "13", "30"], answers: ["13", "thirteen"] },
      { atomId: "EN.CLASSROOM_PENCIL_CASE", replayStep: 1, prompt: "Który napis oznacza piórnik?", choices: ["pencil case", "book", "desk"], answers: ["pencil case"] },
      { atomId: "EN.PRONOUN_THEY", replayStep: 2, prompt: "Anna i Ola. Który zaimek pasuje?", choices: ["she", "they"], answers: ["they"] },
      { atomId: "EN.TO_BE_HE", replayStep: 3, prompt: "He ___ ten. Co pasuje?", choices: ["am", "is", "are"], answers: ["is"] },
      { atomId: "EN.ARTICLE_AN", replayStep: 4, prompt: "Który napis pasuje do pomarańczowego szalika?", choices: ["a orange scarf", "an orange scarf"], answers: ["an orange scarf"] },
      { atomId: "EN.ADJECTIVE_NOUN_ORDER", replayStep: 6, prompt: "Jak po angielsku powiesz brązowe biurko?", choices: ["brown desk", "desk brown"], answers: ["brown desk", "a brown desk"] },
    ],
  },
});

export function getSceneForTask(taskId) {
  if (SCENES[taskId]) return SCENES[taskId];
  const subject = TASKS.find(task => task.id === taskId)?.subject;
  return Object.values(SCENES).find(scene => scene.subject === subject) ?? null;
}

const PRESENTATIONS = {
  "clock-minute-hand": { prompt: "Ile minut pokazuje długa wskazówka?", visualLabel: "Zegar z długą wskazówką na jedenastce", choices: ["50", "55", "60"], prerequisiteChoices: ["5", "10", "15"] },
  "time-after-1445": { prompt: "Jest 16:35. Która godzina będzie za 30 minut?", visualLabel: "Oś czasu od szesnastej trzydzieści pięć przez siedemnastą", choices: ["16:55", "17:05", "17:35"], prerequisiteChoices: ["15", "25", "35"] },
  "calendar-next-saturday": { prompt: "Poniedziałek to 8 maja. Kiedy będzie sobota?", visualLabel: "Kartka kalendarza z poniedziałkiem ósmego maja", choices: ["10 maja", "13 maja", "15 maja"], prerequisiteChoices: ["wtorek", "środa", "sobota"] },
  "roman-nine": { prompt: "Jaką liczbę oznacza IX?", visualLabel: "Rzymski zapis IX", choices: ["6", "9", "11"], prerequisiteChoices: ["5", "10", "50"] },
  "length-room-unit": { prompt: "Pokój ma długość 315. Która jednostka pasuje?", visualLabel: "Miarka z długością pokoju trzysta piętnaście", choices: ["cm", "m", "km"], prerequisiteChoices: ["10", "100", "1000"] },
  "living-mushroom": { prompt: "Czy grzyb należy do przyrody ożywionej?", visualLabel: "Grzyb rosnący z ziemi", choices: ["tak", "nie"], prerequisiteChoices: ["tak", "nie"] },
  "organisms-cells": { prompt: "Z czego są zbudowane organizmy?", visualLabel: "Kilka komórek widzianych w powiększeniu", choices: ["z komórek", "z kamieni", "z plastiku"], prerequisiteChoices: ["tak", "nie"] },
  "life-process-growing": { prompt: "Dziecko staje się wyższe. Co to pokazuje?", visualLabel: "Trzy etapy wzrostu tej samej rośliny", choices: ["wzrost", "oddychanie", "ruch"], prerequisiteChoices: ["tak", "nie"] },
  "anthropogenic-road": { prompt: "Jaka jest asfaltowa droga?", visualLabel: "Asfaltowa droga zbudowana przez ludzi", choices: ["naturalna", "antropogeniczna"], prerequisiteChoices: ["tak", "nie"] },
  "stimulus-light": { prompt: "Latarka świeci w oczy. Co jest bodźcem?", visualLabel: "Latarka wysyłająca światło w stronę oka", choices: ["światło", "oko", "latarka"], prerequisiteChoices: ["tak", "nie"] },
  "senses-sound": { prompt: "Co odbiera dźwięki?", visualLabel: "Ucho odbierające fale dźwiękowe", choices: ["ucho", "oko", "nos"], prerequisiteChoices: ["słuch", "wzrok", "węch"] },
  "english-thirteen": { prompt: "Która liczba to thirteen?", speech: "Which number is thirteen?", prerequisiteSpeech: "Which number is ten?", visualLabel: "Liczba trzynaście i trzynaście kropek", choices: ["12", "13", "30"], prerequisiteChoices: ["5", "10", "20"] },
  "english-pencil-case": { prompt: "Który napis oznacza piórnik?", speech: "Który napis pasuje do tego obrazka?", prerequisiteSpeech: "Jak po angielsku nazywa się ten przedmiot?", speechLang: "pl-PL", prerequisiteSpeechLang: "pl-PL", visualLabel: "Piórnik z dwoma ołówkami", choices: ["pencil case", "book", "desk"], prerequisiteChoices: ["pencil", "pen", "book"] },
  "english-they": { prompt: "Anna i Ola. She czy they?", speech: "Anna and Ola. She or they?", prerequisiteSpeech: "Which pronoun fits one girl?", visualLabel: "Dwie osoby stojące obok siebie", choices: ["she", "they"], prerequisiteChoices: ["she", "he", "they"] },
  "english-he-is": { prompt: "He ___ ten. Co pasuje?", speech: "He, blank, ten. What fits?", prerequisiteSpeech: "She, blank, ten. What fits?", visualLabel: "Zdanie He, puste miejsce, ten", choices: ["am", "is", "are"], prerequisiteChoices: ["am", "is", "are"] },
  "english-an-apple": { prompt: "___ apple. Co pasuje?", speech: "Blank apple. A or an?", prerequisiteSpeech: "What is the first letter of apple?", visualLabel: "Jabłko obok pustego miejsca na a lub an", choices: ["a", "an"], prerequisiteChoices: ["a", "e", "p"] },
  "english-brown-desk": { prompt: "Który napis oznacza brązowe biurko?", speech: "Który napis pasuje do tego obrazka?", prerequisiteSpeech: "Co znaczy pokazany angielski wyraz?", speechLang: "pl-PL", prerequisiteSpeechLang: "pl-PL", visualLabel: "Brązowe biurko", choices: ["brown desk", "desk brown"], prerequisiteChoices: ["biurko", "krzesło", "książka"] },
};

export function getTaskPresentation(task) {
  return PRESENTATIONS[task.id];
}

export const STORAGE_KEY = "hania-tutor-state-v1";

export function normalizeAnswer(value = "") {
  return value
    .trim()
    .toLocaleLowerCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
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
  focus: { name: "Spokojny stolik", short: "Stolik", description: "Ćwicz trudny krok." },
  explore: { name: "Ścieżka odkrywcy", short: "Odkrywaj", description: "Poznaj coś nowego." },
  review: { name: "Szybka powtórka", short: "Powtórka", description: "Przypomnij to, co ważne." },
};

const SUBJECTS = { math: "Matematyka", nature: "Przyroda", english: "Angielski" };

function createSession(currentTaskId = TASKS[0].id) {
  return {
    currentTaskId,
    taskBySubject: {},
    subjectState: {},
    currentStep: 0,
    diagnosticCount: 0,
    helpLevel: 0,
    consecutiveErrors: 0,
    correctStreak: 0,
    completedCount: 0,
    subject: null,
    lastFeedback: "",
    lastResult: "",
    scene: { taskId: "", step: 0, phase: "story", quizIndex: 0, returnToQuiz: false, feedback: "", seenTaskIds: [] },
  };
}

export function createInitialState() {
  return {
    version: 1,
    activeMode: "focus",
    activeSubject: "all",
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

export function switchSubject(state, activeSubject) {
  if (!["all", ...Object.keys(SUBJECTS)].includes(activeSubject)) return state;
  const next = structuredClone(state);
  const fields = ["currentTaskId", "currentStep", "diagnosticCount", "helpLevel", "consecutiveErrors", "correctStreak", "lastFeedback", "lastResult", "scene"];
  Object.values(next.modeSessions).forEach(session => {
    session.taskBySubject ??= {};
    session.subjectState ??= {};
    session.taskBySubject[next.activeSubject] = session.currentTaskId;
    session.subjectState[next.activeSubject] = Object.fromEntries(fields.map(field => [field, session[field]]));
    const firstTask = TASKS.find(task => activeSubject === "all" || task.subject === activeSubject) ?? TASKS[0];
    const restored = session.subjectState[activeSubject] ?? createSession(session.taskBySubject[activeSubject] ?? firstTask.id);
    fields.forEach(field => { session[field] = restored[field]; });
    session.taskBySubject[activeSubject] = session.currentTaskId;
  });
  next.activeSubject = activeSubject;
  return next;
}

function moveToTask(state, task) {
  if (!task) return state;
  const next = structuredClone(state);
  const session = next.modeSessions[next.activeMode];
  session.currentTaskId = task.id;
  session.taskBySubject[next.activeSubject] = task.id;
  session.currentStep = 0;
  session.diagnosticCount = 0;
  session.helpLevel = 0;
  session.consecutiveErrors = 0;
  session.lastFeedback = "";
  session.lastResult = "";
  next.screen = "learn";
  return next;
}

export function previousTask(state) {
  const tasks = TASKS.filter(task => state.activeSubject === "all" || task.subject === state.activeSubject);
  const currentId = state.modeSessions[state.activeMode].currentTaskId;
  const index = tasks.findIndex(task => task.id === currentId);
  return moveToTask(state, index > 0 ? tasks[index - 1] : null);
}

export function restartSubjectTasks(state) {
  return moveToTask(state, TASKS.find(task => state.activeSubject === "all" || task.subject === state.activeSubject));
}

export function saveState(storage, state) {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState(storage) {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY));
    if (value?.version !== 1 || !value.knowledge || !value.modeSessions || !MODES[value.activeMode]
      || !["all", ...Object.keys(SUBJECTS)].includes(value.activeSubject ?? "all")
      || !["focus", "explore", "review"].every(mode => value.modeSessions[mode]?.currentTaskId)) {
      return createInitialState();
    }
    const initial = createInitialState();
    return {
      ...initial,
      ...value,
      screen: value.screen ?? "home",
      activeSubject: value.activeSubject ?? "all",
      modeSessions: Object.fromEntries(Object.keys(initial.modeSessions).map(mode => [
        mode,
        {
          ...initial.modeSessions[mode],
          ...value.modeSessions[mode],
          scene: { ...initial.modeSessions[mode].scene, ...value.modeSessions[mode].scene },
        },
      ])),
    };
  } catch {
    return createInitialState();
  }
}

export function selectNextTask(state, modeId = state.activeMode) {
  const matchesSubject = task => state.activeSubject === "all" || task.subject === state.activeSubject;
  if (modeId === "review") {
    if (state.modeSessions.review.completedCount >= 5) return null;
    const dueAtom = Object.entries(state.knowledge)
      .find(([, knowledge]) => knowledge.status !== "UNSEEN" && knowledge.nextReviewAt <= Date.now())?.[0];
    return TASKS.find(task => task.atomId === dueAtom && matchesSubject(task))
      ?? TASKS.find(task => matchesSubject(task) && state.knowledge[task.atomId]?.status !== "UNSEEN" && state.knowledge[task.atomId]?.nextReviewAt <= Date.now())
      ?? null;
  }

  if (modeId === "explore") {
    const isReady = task => !task.prerequisiteAtomId
      || ["INDEPENDENT", "TRANSFERRED", "RETAINED"].includes(state.knowledge[task.prerequisiteAtomId]?.status);
    const tasks = TASKS.filter(task => matchesSubject(task) && isReady(task));
    const session = state.modeSessions.explore;
    const cursor = session.taskBySubject?.[state.activeSubject] ?? session.currentTaskId;
    const current = tasks.find(task => task.id === cursor && !state.knowledge[task.atomId]);
    if (current) return current;
    return tasks.find(task => !state.knowledge[task.atomId])
      ?? tasks.find(task => state.knowledge[task.atomId]?.status !== "RETAINED")
      ?? tasks[0]
      ?? null;
  }

  const session = state.modeSessions[modeId];
  const cursor = session?.taskBySubject?.[state.activeSubject] ?? session?.currentTaskId;
  return TASKS.find(task => task.id === cursor && matchesSubject(task))
    ?? TASKS.find(matchesSubject)
    ?? TASKS[0];
}

export function getTaskById(id) {
  return TASKS.find(task => task.id === id) ?? TASKS[0];
}

export function shouldOfferScene(state, task) {
  const scene = state.modeSessions[state.activeMode].scene;
  const lesson = getSceneForTask(task?.id);
  return state.activeMode === "explore"
    && Boolean(lesson)
    && !scene.seenTaskIds.includes(lesson.taskId);
}

export function beginScene(state, taskId) {
  const lesson = getSceneForTask(taskId);
  if (!lesson) return state;
  const next = structuredClone(state);
  next.screen = "learn";
  next.modeSessions[next.activeMode].scene = {
    ...next.modeSessions[next.activeMode].scene,
    taskId: lesson.taskId,
    step: 0,
    phase: "story",
    quizIndex: 0,
    returnToQuiz: false,
    feedback: "",
  };
  return next;
}

export function advanceScene(state) {
  const next = structuredClone(state);
  const sceneState = next.modeSessions[next.activeMode].scene;
  const scene = SCENES[sceneState.taskId];
  if (!scene) return state;
  if (sceneState.returnToQuiz) {
    sceneState.phase = "check";
    sceneState.returnToQuiz = false;
  } else if (sceneState.step < scene.steps.length - 1) sceneState.step += 1;
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
  sceneState.quizIndex = 0;
  sceneState.returnToQuiz = false;
  sceneState.feedback = "";
}

export function answerScene(state, value) {
  const next = structuredClone(state);
  const sceneState = next.modeSessions[next.activeMode].scene;
  const scene = SCENES[sceneState.taskId];
  if (!scene || sceneState.phase !== "check") return { state, result: "no_response" };
  const check = scene.checks[sceneState.quizIndex];
  const answer = normalizeAnswer(value);
  const correct = check.answers.map(normalizeAnswer).includes(answer);
  if (correct) {
    const current = next.knowledge[check.atomId] ?? { independentSuccesses: 0, supportedSuccesses: 0, contexts: [] };
    current.supportedSuccesses = (current.supportedSuccesses ?? 0) + 1;
    current.helpUsed = (current.helpUsed ?? 0) + 1;
    current.status ??= "SUPPORTED";
    current.lastSeenAt = Date.now();
    current.nextReviewAt = Date.now() + 86_400_000;
    next.knowledge[check.atomId] = current;
    if (sceneState.quizIndex < scene.checks.length - 1) sceneState.quizIndex += 1;
    else {
      finishScene(next, scene.taskId);
      next.modeSessions[next.activeMode].lastFeedback = "Rozdział skończony. To, co było trudne, wróci później w krótkiej powtórce.";
      next.screen = "end";
    }
  } else {
    sceneState.phase = "story";
    sceneState.step = check.replayStep;
    sceneState.returnToQuiz = true;
    sceneState.feedback = "Spójrzmy jeszcze raz tylko na potrzebny kadr.";
  }
  return { state: next, result: correct ? "correct" : "incorrect" };
}

export function skipScene(state) {
  const next = structuredClone(state);
  const taskId = next.modeSessions[next.activeMode].scene.taskId;
  if (taskId) finishScene(next, taskId);
  return next;
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
      ? candidates.find(item => (next.activeSubject === "all" || item.subject === next.activeSubject) && next.knowledge[item.atomId]?.status !== "RETAINED")
      : selectNextTask(next, next.activeMode);
    if (nextTask) {
      session.currentTaskId = nextTask.id;
      session.taskBySubject[next.activeSubject] = nextTask.id;
    }
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

  if (action === ACTIONS.GIVE_EXAMPLE && SCENES[task.id]) {
    session.scene = { ...session.scene, taskId: task.id, step: 0, phase: "story", quizIndex: 0, returnToQuiz: false, feedback: "" };
  }

  session.lastFeedback = action === ACTIONS.END_SESSION && result !== "correct"
    ? "To jeszcze nie jest pewne. Zapisuję ten punkt i proponuję wrócić do niego w Spokojnym stoliku."
    : action === ACTIONS.END_SESSION
      ? "Pięć krótkich powtórek wystarczy. Na dziś ta seria jest skończona."
      : getActionContent(action, task);
  session.lastResult = result;
  if (next.activeMode === "review" && action === ACTIONS.END_SESSION && result !== "correct") {
    next.modeSessions.focus = { ...createSession(task.id), lastFeedback: "Wróćmy spokojnie do punktu, który sprawił trudność." };
    next.modeSessions.focus.taskBySubject[task.subject] = task.id;
    next.modeSessions.focus.taskBySubject.all = task.id;
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
  return getTaskPresentation(task).prompt;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);
}

function visualMarkup(task, step = 0) {
  const presentation = getTaskPresentation(task);
  if (step === 1) {
    const prerequisiteVisuals = {
      "clock-minute-hand": `<circle class="visual-paper" cx="160" cy="90" r="61"/><path d="M160 34v10M216 90h-10M160 146v-10M104 90h10M160 90l47-28"/><circle class="visual-fill" cx="160" cy="90" r="6"/>`,
      "time-after-1445": `<path d="M65 92h190M239 78l16 14-16 14"/><text x="82" y="65">16:35</text><text x="238" y="65">17:00</text>`,
      "calendar-next-saturday": `<text class="visual-word" x="92" y="102">PON</text><path d="M132 90h56m-14-14 14 14-14 14"/><text class="visual-word" x="238" y="102">?</text>`,
      "roman-nine": `<rect class="visual-paper" x="100" y="28" width="120" height="124" rx="16"/><text class="visual-hero" x="160" y="118">X</text>`,
      "length-room-unit": `<text class="visual-word" x="95" y="102">1 m</text><path d="M130 90h60m-14-14 14 14-14 14"/><text class="visual-word" x="238" y="102">? cm</text>`,
      "living-mushroom": `<path d="M160 145V68M160 97c-35-4-48-22-48-40 31 0 48 16 48 40Zm0 0c35-4 48-22 48-40-31 0-48 16-48 40ZM105 145h110"/>`,
      "organisms-cells": `<circle class="visual-paper" cx="160" cy="53" r="25"/><path class="visual-fill-soft" d="M105 153c4-49 23-75 55-75s51 26 55 75Z"/>`,
      "life-process-growing": `<path d="M100 145V115M215 145V62M100 120c-20-3-28-16-28-28 18 0 28 10 28 28Zm115-25c-31-4-42-24-42-42 27 0 42 16 42 42ZM60 145h200"/>`,
      "anthropogenic-road": `<path class="visual-fill-soft" d="M115 155 145 35h30l30 120Z"/><path d="M160 48v22m0 20v22m0 20v20M80 155h160"/><circle class="visual-paper" cx="245" cy="50" r="18"/><path d="M245 68v45m-24-24h48"/>`,
      "stimulus-light": `<path class="visual-paper" d="M68 72h55v36H68z"/><path d="M123 90h118M209 64c25 15 25 37 0 52M235 50c42 25 42 55 0 80"/>`,
      "senses-sound": `<path d="M65 75c17 10 17 20 0 30M92 57c35 21 35 65 0 86"/><path class="visual-paper" d="M205 40c-41 0-57 31-49 61 7 23 26 23 28 42h25c0-28-21-28-18-44 2-12 16-13 23-5 9-8 16-18 16-31 0-14-9-23-25-23Z"/>`,
      "english-thirteen": `<text class="visual-hero" x="160" y="116">TEN</text>`,
      "english-pencil-case": `<path d="M92 133 218 42M85 143l28-7-20-22-8 29ZM210 40l17 23"/>`,
      "english-they": `<circle class="visual-paper" cx="160" cy="57" r="28"/><path class="visual-fill-soft" d="M105 153c4-48 22-72 55-72s51 24 55 72Z"/>`,
      "english-he-is": `<text class="visual-word" x="70" y="104">SHE</text><rect class="visual-paper" x="117" y="65" width="86" height="54" rx="12"/><text class="visual-word" x="255" y="104">TEN</text>`,
      "english-an-apple": `<path class="visual-fill-soft" d="M160 55c-42-22-69 15-56 55 13 39 56 52 80 8 27-51 1-81-24-63Z"/><path d="M160 57c-4-18 2-29 15-36M165 38c13-11 26-8 36-2"/>`,
      "english-brown-desk": `<path class="desk-top" d="M55 65h210v45H55z"/><path d="M80 110v52M240 110v52"/>`,
    };
    const prerequisiteLabels = {
      "clock-minute-hand": "Zegar z długą wskazówką na dwójce",
      "time-after-1445": "Oś czasu od 16:35 do 17:00",
      "calendar-next-saturday": "Poniedziałek, strzałka i następny dzień",
      "roman-nine": "Rzymska liczba X",
      "length-room-unit": "Jeden metr przeliczany na centymetry",
      "living-mushroom": "Rosnąca roślina",
      "organisms-cells": "Sylwetka człowieka jako organizmu",
      "life-process-growing": "Mała i duża roślina pokazujące wzrost",
      "anthropogenic-road": "Człowiek obok zbudowanej drogi",
      "stimulus-light": "Głośnik wysyłający fale dźwiękowe",
      "senses-sound": "Fale dźwiękowe docierające do ucha",
      "english-thirteen": "Angielskie słowo ten",
      "english-pencil-case": "Ołówek",
      "english-they": "Jedna osoba",
      "english-he-is": "Zdanie She, puste miejsce, ten",
      "english-an-apple": "Jabłko",
      "english-brown-desk": "Biurko",
    };
    return `<div class="learning-visual prerequisite-visual" data-learning-visual data-visual-step="prerequisite" data-prerequisite-for="${task.id}" role="img" aria-label="${escapeHtml(prerequisiteLabels[task.id])}"><svg viewBox="0 0 320 180" aria-hidden="true" focusable="false">${prerequisiteVisuals[task.id]}</svg></div>`;
  }
  const open = `<div class="learning-visual visual-${task.visual}" data-learning-visual data-visual-step="main" role="img" aria-label="${escapeHtml(presentation.visualLabel)}"><svg viewBox="0 0 320 180" aria-hidden="true" focusable="false">`;
  const close = "</svg></div>";
  const visuals = {
    "clock-minute-hand": `<circle class="visual-paper" cx="160" cy="90" r="67"/><circle cx="160" cy="90" r="61"/><path d="M160 34v10M216 90h-10M160 146v-10M104 90h10"/><path class="clock-hour" d="M160 90l30 20"/><path class="clock-minute" d="M160 90l-31-48"/><circle class="visual-fill" cx="160" cy="90" r="6"/>`,
    "time-after-1445": `<path d="M38 96h244"/><circle cx="48" cy="96" r="8"/><circle cx="160" cy="96" r="8"/><circle cx="272" cy="96" r="8"/><circle class="travel-dot" cx="48" cy="96" r="13"/><text x="48" y="135">16:35</text><text x="160" y="135">17:00</text><text x="272" y="135">?</text><text class="visual-small" x="160" y="55">+ 30 min</text>`,
    "calendar-next-saturday": `<rect class="visual-paper" x="75" y="25" width="170" height="135" rx="14"/><path d="M75 62h170M110 25v24M210 25v24"/><text x="160" y="52">MAJ</text><text x="112" y="105">8</text><path class="calendar-path" d="M132 99h64"/><text x="216" y="105">?</text><text class="visual-small" x="110" y="136">PON</text><text class="visual-small" x="216" y="136">SOB</text>`,
    "roman-nine": `<rect class="visual-paper" x="82" y="25" width="156" height="130" rx="18"/><text class="visual-hero" x="160" y="118">IX</text>`,
    "length-room-unit": `<path d="M45 120h230M52 120V82M86 120V96M120 120V82M154 120V96M188 120V82M222 120V96M268 120V82"/><path class="measure-line" d="M52 58h216M52 58l15-10M52 58l15 10M268 58l-15-10M268 58l-15 10"/><text x="160" y="44">315 ?</text>`,
    "living-mushroom": `<path class="visual-fill-soft" d="M77 92c9-42 41-65 83-65s74 23 83 65c-55 17-111 17-166 0Z"/><path class="visual-paper" d="M142 87h36l19 68h-74l19-68Z"/><path d="M95 91h130M134 155h52"/>`,
    "organisms-cells": `<circle class="visual-paper" cx="112" cy="91" r="48"/><circle class="visual-paper" cx="198" cy="75" r="38"/><circle class="visual-paper" cx="200" cy="130" r="31"/><circle class="visual-fill" cx="111" cy="92" r="13"/><circle class="visual-fill" cx="198" cy="75" r="10"/><circle class="visual-fill" cx="200" cy="130" r="8"/>`,
    "life-process-growing": `<path d="M65 145V118M160 145V86M255 145V48"/><path class="growth-one" d="M65 121c-19-3-25-15-25-26 16 0 25 9 25 26Zm0 0c19-3 25-15 25-26-16 0-25 9-25 26Z"/><path class="growth-two" d="M160 103c-27-4-35-21-35-36 22 0 35 13 35 36Zm0 0c27-4 35-21 35-36-22 0-35 13-35 36Z"/><path class="growth-three" d="M255 77c-34-5-44-27-44-47 28 0 44 17 44 47Zm0 0c34-5 44-27 44-47-28 0-44 17-44 47Z"/><path d="M35 145h250"/>`,
    "anthropogenic-road": `<path class="visual-fill-soft" d="M111 160 146 20h28l35 140Z"/><path d="M160 32v25M160 75v25M160 118v25"/><path d="M30 160h260"/><rect class="visual-paper" x="222" y="78" width="48" height="47"/><path d="m216 78 30-24 30 24"/>`,
    "stimulus-light": `<path class="visual-paper" d="M42 83h68v34H42zM110 89l35-18v58l-35-18z"/><path class="signal-line" d="M150 83l73-22M150 100h73M150 117l73 22"/><path d="M228 100c20-31 45-31 65 0-20 31-45 31-65 0Z"/><circle class="visual-fill" cx="260" cy="100" r="10"/>`,
    "senses-sound": `<path class="sound-wave wave-one" d="M53 70c20 12 20 28 0 40"/><path class="sound-wave wave-two" d="M82 53c37 23 37 71 0 94"/><path class="visual-paper" d="M190 35c-45 0-63 34-54 67 7 25 28 25 30 46h28c0-31-23-31-20-49 2-13 18-14 25-5 10-8 18-20 18-34 0-15-10-25-27-25Z"/><path d="M173 71c18-16 39 6 24 24-7 8-17 10-18 26"/>`,
    "english-thirteen": `<text class="visual-hero" x="160" y="102">13</text>${Array.from({ length: 13 }, (_, index) => `<circle class="count-dot" cx="${77 + (index % 7) * 28}" cy="${132 + Math.floor(index / 7) * 25}" r="5"/>`).join("")}`,
    "english-pencil-case": `<rect class="visual-fill-soft" x="63" y="65" width="194" height="78" rx="28"/><path d="M81 65h158M196 42l-66 76M220 48l-61 70"/><path class="visual-fill" d="m196 42 7 20 12-15-19-5ZM220 48l5 20 13-14-18-6Z"/>`,
    "english-they": `<circle class="visual-paper" cx="115" cy="61" r="25"/><circle class="visual-paper" cx="205" cy="61" r="25"/><path class="visual-fill-soft" d="M72 151c3-45 18-66 43-66s40 21 43 66ZM162 151c3-45 18-66 43-66s40 21 43 66Z"/>`,
    "english-he-is": `<text class="visual-word" x="76" y="105">HE</text><rect class="visual-paper" x="123" y="63" width="76" height="55" rx="12"/><text class="visual-word" x="250" y="105">TEN</text>`,
    "english-an-apple": `<rect class="visual-paper" x="44" y="63" width="92" height="55" rx="12"/><path class="visual-fill-soft" d="M216 64c-39-22-65 13-53 49 12 37 53 50 76 8 26-48 1-76-23-57Z"/><path d="M216 66c-4-17 2-27 14-34M220 48c13-10 25-7 34-2"/>`,
    "english-brown-desk": `<path class="desk-top" d="M54 70h212v42H54z"/><path d="M77 112v49M243 112v49M130 112v25h60v-25"/>`,
  };
  return `${open}${visuals[task.id] ?? visuals["roman-nine"]}${close}`;
}

function header() {
  return `<header class="topbar">
    <button class="brand" data-screen="home" data-nav="brand"><span class="brand-mark">H</span><span>Spokojna nauka</span></button>
    <nav class="top-actions" aria-label="Główna nawigacja">
      <button class="quiet-button" data-screen="home" data-nav="modes">Tryby nauki</button>
      <button class="quiet-button" data-screen="progress" data-nav="progress">Moje postępy</button>
    </nav>
  </header>`;
}

function modeIcon(id) {
  const paths = {
    focus: '<circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="7"/><path d="m32 16 8-8"/>',
    explore: '<circle cx="10" cy="35" r="4"/><circle cx="24" cy="24" r="4"/><circle cx="39" cy="10" r="4"/><path d="m13 32 8-6m6-5 9-8"/>',
    review: '<path d="M39 17A17 17 0 1 0 41 31M39 17V7m0 10H29"/><path d="M17 25h14"/>',
  };
  return `<svg class="mode-symbol" viewBox="0 0 48 48" aria-hidden="true">${paths[id]}</svg>`;
}

function homeView(state) {
  const known = Object.keys(state.knowledge).length;
  return `<section aria-labelledby="welcome-title">
    <h1 id="welcome-title">Co robimy?</h1>
    <p class="intro">Wybierz tryb. ${known ? `Masz rozpoczęte ${known} obszary.` : "Zaczniemy spokojnie."}</p>
    <div class="nitka-home">
      <img src="./images/kroliczka-nitka.png" alt="Króliczka Nitka, projektantka mody i prowadząca misje">
      <div><p class="eyebrow">Nowe obrazkowe rozdziały</p><h2>Króliczka Nitka ma plan</h2><p>Najpierw obrazkowa opowieść pełna wiedzy. Test pojawi się dopiero na końcu.</p></div>
    </div>
    <div class="mode-grid">
      ${Object.entries(MODES).map(([id, mode]) => `<button class="mode-card" data-mode="${id}">
        ${modeIcon(id)}<h2>${mode.name}</h2><p>${mode.description}</p><span class="mode-arrow" aria-hidden="true">→</span>
      </button>`).join("")}
    </div>
  </section>`;
}

function modeNav(activeMode) {
  return `<nav class="mode-nav" aria-label="Tryby nauki">${Object.entries(MODES).map(([id, mode]) =>
    `<button class="mode-pill" data-mode="${id}" aria-current="${id === activeMode}">${mode.short}</button>`).join("")}</nav>`;
}

function subjectSwitcher(activeSubject) {
  const subjects = { all: "Wszystko", ...SUBJECTS };
  return `<nav class="subject-switcher" aria-label="Wybierz przedmiot">${Object.entries(subjects).map(([id, label]) =>
    `<button type="button" data-subject-filter="${id}" aria-pressed="${id === activeSubject}">${label}</button>`).join("")}</nav>`;
}

function explorerMap(state, subject) {
  const tasks = TASKS.filter(task => task.subject === subject);
  return `<div class="explorer-map" aria-label="Mapa dziedziny">${tasks.map(task => {
    const status = state.knowledge[task.atomId]?.status;
    return `<span class="map-node ${status ? "is-known" : ""}" title="${escapeHtml(task.prompt)}">${status ? "✓" : "○"}</span>`;
  }).join("")}</div>`;
}

function sceneIntroView(task) {
  const scene = getSceneForTask(task.id);
  return `<section class="scene-card scene-intro" aria-labelledby="scene-title">
    <img class="nitka-portrait" src="./images/kroliczka-nitka.png" alt="Króliczka Nitka z notesem i miarką krawiecką">
    <div><p class="eyebrow">Obrazkowy rozdział · ${SUBJECTS[scene.subject]}</p>
    <h1 id="scene-title">${escapeHtml(scene.title)}</h1>
    <p class="intro">Najpierw ${scene.steps.length} krótkich scen z wiedzą. Dopiero potem test — zawsze jedno pytanie naraz.</p>
    <button class="primary-button" type="button" data-scene-start="${task.id}">Zaczynam opowieść</button></div>
  </section>`;
}

function sceneView(state) {
  const sceneState = state.modeSessions[state.activeMode].scene;
  const scene = SCENES[sceneState.taskId];
  if (!scene) return "";
  if (sceneState.phase === "check") {
    const check = scene.checks[sceneState.quizIndex];
    return `<section class="scene-card" aria-labelledby="scene-question">
    <div class="scene-progress" aria-label="Pytanie ${sceneState.quizIndex + 1} z ${scene.checks.length}">Pytanie ${sceneState.quizIndex + 1}/${scene.checks.length}</div>
    <p class="eyebrow">Test po całym rozdziale · jedno pytanie</p><h1 id="scene-question">${escapeHtml(check.prompt)}</h1>
    <form id="scene-answer-form" class="answer-form" aria-labelledby="scene-question">
      <div class="choice-grid">${check.choices.map(choice => `<button class="answer-choice" type="submit" name="answer" value="${escapeHtml(choice)}">${escapeHtml(choice)}</button>`).join("")}</div>
    </form>
  </section>`;
  }
  const step = scene.steps[sceneState.step];
  const audio = step.audio ? `<audio id="scene-audio" controls preload="metadata" src="${step.audio}">Nagranie: ${escapeHtml(step.transcript)}</audio>` : "";
  const replay = step.audio ? '<button class="quiet-button" type="button" data-scene-replay>Posłuchaj jeszcze raz</button>' : "";
  const nextLabel = sceneState.returnToQuiz ? "Wróć do pytania" : sceneState.step === scene.steps.length - 1 ? "Przejdź do testu" : "Dalej";
  return `<section class="scene-card" aria-labelledby="scene-title">
    <div class="scene-progress" aria-label="Kadr ${sceneState.step + 1} z ${scene.steps.length}">${sceneState.step + 1}/${scene.steps.length}</div>
    <div class="scene-frame scene-shot-${escapeHtml(step.shot)}"><img class="scene-art" src="${scene.art}" alt="${escapeHtml(scene.artAlt)}"><p class="scene-beat">${escapeHtml(step.beat)}</p></div>
    ${sceneState.feedback ? `<p class="feedback">${escapeHtml(sceneState.feedback)}</p>` : ""}
    <h1 id="scene-title">${escapeHtml(scene.title)}</h1>
    <p class="scene-transcript">${escapeHtml(step.transcript)}</p>
    ${audio}
    <div class="scene-actions">${replay}<button class="quiet-button" type="button" data-scene-skip>Pomiń rozdział</button><button class="primary-button" type="button" data-scene-next>${nextLabel}</button></div>
  </section>`;
}

function learningView(state) {
  const task = selectNextTask(state);
  if (!task) return `${modeNav(state.activeMode)}<div>${subjectSwitcher(state.activeSubject)}<section class="question-card empty-state"><div class="visual-cue" aria-hidden="true">✓</div><h1>Na teraz wszystko powtórzone</h1><p class="intro">Wróć później.</p><button class="primary-button" data-screen="home">Wybierz inny tryb</button></section></div>`;
  const session = state.modeSessions[state.activeMode];
  const map = state.activeMode === "explore" ? explorerMap(state, task.subject) : "";
  if (session.scene.taskId) return `${modeNav(state.activeMode)}<div>${subjectSwitcher(state.activeSubject)}${map}${sceneView(state)}</div>`;
  if (shouldOfferScene(state, task)) return `${modeNav(state.activeMode)}<div>${subjectSwitcher(state.activeSubject)}${map}${sceneIntroView(task)}</div>`;
  const presentation = getTaskPresentation(task);
  const prompt = currentPrompt(task, session);
  const choices = session.currentStep === 1 ? presentation.prerequisiteChoices : presentation.choices;
  const feedback = session.lastFeedback ? `<p class="feedback">${escapeHtml(session.lastFeedback)}</p>` : "";
  const modeDetail = state.activeMode === "review" ? `pozostało: ${5 - session.completedCount}` : MODES[state.activeMode].name;
  const resultClass = session.lastResult ? ` result-${session.lastResult}` : "";
  const subjectTasks = TASKS.filter(item => state.activeSubject === "all" || item.subject === state.activeSubject);
  const canGoBack = subjectTasks.findIndex(item => item.id === task.id) > 0;
  const listenButton = task.subject === "english" ? `<button class="listen-button" type="button" id="listen-question" data-audio="./audio/${task.id}-${session.currentStep === 1 ? "prerequisite" : "question"}.mp3" data-speech="${escapeHtml(session.currentStep === 1 ? presentation.prerequisiteSpeech : presentation.speech)}" data-lang="${(session.currentStep === 1 ? presentation.prerequisiteSpeechLang : presentation.speechLang) ?? "en-GB"}" aria-label="Posłuchaj pytania"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v6h4l5 4V5L9 9H5Zm12 1c1.3 1.3 1.3 2.7 0 4m2.5-6.5c3 3 3 6 0 9"/></svg><span>Posłuchaj</span></button>` : "";
  return `${modeNav(state.activeMode)}<div>${subjectSwitcher(state.activeSubject)}${state.activeMode === "explore" ? explorerMap(state, task.subject) : ""}<section class="question-card${resultClass}" aria-labelledby="question-title">
    <div class="progress-line"><span class="subject-tag">${SUBJECTS[task.subject]}</span><span>${modeDetail}</span></div>
    ${visualMarkup(task, session.currentStep)}
    ${feedback}<div class="question-heading"><h1 id="question-title">${escapeHtml(prompt)}</h1>${listenButton}</div>
    <form class="answer-form" id="answer-form" aria-labelledby="question-title">
      <div class="choice-grid">${choices.map(choice => `<button class="answer-choice" type="submit" name="answer" value="${escapeHtml(choice)}">${escapeHtml(choice)}</button>`).join("")}</div>
      <button class="unsure-button" type="submit" name="answer" value="nie wiem">Nie wiem</button>
    </form>
    <div class="session-actions">${canGoBack ? '<button class="quiet-button" type="button" data-task-back>← Poprzednie zadanie</button>' : ""}<button class="quiet-button" type="button" data-task-restart>Od początku działu</button><button class="quiet-button" id="take-break">Potrzebuję przerwy</button></div>
  </section></div>`;
}

function progressView(state) {
  const entries = TASKS.map(task => ({ task, knowledge: state.knowledge[task.atomId] })).filter(item => item.knowledge);
  const independent = entries.filter(item => ["INDEPENDENT", "TRANSFERRED", "RETAINED"].includes(item.knowledge.status)).length;
  const supported = entries.filter(item => item.knowledge.status === "SUPPORTED").length;
  const due = entries.filter(item => item.knowledge.nextReviewAt <= Date.now()).length;
  return `<section class="panel" aria-labelledby="progress-title"><h1 id="progress-title">Moje postępy</h1>
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
  return `<section class="panel empty-state"><div class="visual-cue" aria-hidden="true">≈</div><h1>Głowa może odpocząć</h1><p class="intro">Gdy będziesz gotowa, wrócimy do jednego kroku.</p><button class="primary-button" id="resume">Wracam</button></section>`;
}

function endView(state) {
  const feedback = state.modeSessions[state.activeMode].lastFeedback;
  return `<section class="panel empty-state"><div class="visual-cue" aria-hidden="true">✓</div><h1>${escapeHtml(feedback)}</h1><div class="end-actions">${state.activeMode === "review" ? '<button class="primary-button" data-mode="focus">Przejdź do Spokojnego stolika</button>' : ""}<button class="quiet-button" data-screen="home">Wybierz tryb</button></div></section>`;
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

export function speakQuestion(button, synthesis = globalThis.speechSynthesis, Utterance = globalThis.SpeechSynthesisUtterance, AudioPlayer = globalThis.Audio) {
  const stop = () => button.classList.remove("is-speaking");
  if (button.dataset.audio && AudioPlayer) {
    synthesis?.cancel();
    const clip = new AudioPlayer(button.dataset.audio);
    button.classList.add("is-speaking");
    clip.addEventListener("ended", stop);
    clip.addEventListener("error", stop);
    clip.play()?.catch(stop);
    return true;
  }
  if (!synthesis || !Utterance) return false;
  synthesis.cancel();
  const utterance = new Utterance(button.dataset.speech);
  utterance.lang = button.dataset.lang || "pl-PL";
  const polishVoices = synthesis.getVoices?.().filter(voice => voice.lang.toLowerCase().startsWith("pl")) ?? [];
  if (utterance.lang.startsWith("pl")) utterance.voice = polishVoices.find(voice => voice.name === "Zosia") ?? polishVoices.find(voice => voice.localService) ?? polishVoices[0];
  utterance.rate = utterance.lang.startsWith("pl") ? 0.9 : 0.86;
  button.classList.add("is-speaking");
  utterance.addEventListener("end", stop);
  utterance.addEventListener("error", stop);
  synthesis.speak(utterance);
  return true;
}

if (typeof document !== "undefined") {
  const root = document.querySelector("#app");
  const announcer = document.querySelector("#announcer");
  let state = loadState(localStorage);

  const commit = (next, announcement = "", focusSelector = "") => {
    state = next;
    saveState(localStorage, state);
    renderApp(root, state);
    announcer.textContent = announcement;
    bindEvents();
    if (focusSelector) root.querySelector(focusSelector)?.focus();
  };

  const bindEvents = () => {
    root.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => commit(switchMode(state, button.dataset.mode), "", `[data-mode="${button.dataset.mode}"]`)));
    root.querySelectorAll("[data-screen]").forEach(button => button.addEventListener("click", () => {
      const focusSelector = button.dataset.nav ? `[data-nav="${button.dataset.nav}"]` : `[data-screen="${button.dataset.screen}"]`;
      commit({ ...state, screen: button.dataset.screen }, "", focusSelector);
    }));
    root.querySelectorAll("[data-subject-filter]").forEach(button => button.addEventListener("click", () => commit(switchSubject(state, button.dataset.subjectFilter), "", `[data-subject-filter="${button.dataset.subjectFilter}"]`)));
    root.querySelector("[data-scene-start]")?.addEventListener("click", event => commit(beginScene(state, event.currentTarget.dataset.sceneStart), "", "[data-scene-next]"));
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
      commit(
        next,
        result === "correct" ? "Dobrze. Teraz sprawdzimy tę wiedzę w nowej sytuacji." : "Wróćmy do jednego potrzebnego kadru.",
        result === "correct" ? ".answer-choice" : "[data-scene-next]",
      );
    });
    root.querySelector("#answer-form")?.addEventListener("submit", event => {
      event.preventDefault();
      const answer = event.submitter?.value ?? new FormData(event.currentTarget).get("answer");
      const { state: next } = applyAnswer(state, answer);
      commit(next, next.modeSessions[next.activeMode].lastFeedback, ".answer-choice");
    });
    root.querySelector("#listen-question")?.addEventListener("click", event => {
      speakQuestion(event.currentTarget);
    });
    root.querySelector("[data-task-back]")?.addEventListener("click", () => commit(previousTask(state), "Poprzednie zadanie.", ".answer-choice"));
    root.querySelector("[data-task-restart]")?.addEventListener("click", () => commit(restartSubjectTasks(state), "Zaczynamy od pierwszego zadania w tym dziale.", ".answer-choice"));
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
