const ART = {
  math: ["./images/scene-math-fashion.webp", "Nitka w pracowni mody używa zegara, kalendarza, cyfr rzymskich i miarki"],
  nature: ["./images/scene-nature-greenhouse.webp", "Nitka bada żywe i nieożywione elementy przyrody oraz działanie zmysłów"],
  english: ["./images/scene-english-wardrobe.webp", "Nitka w garderobie ćwiczy angielskie słowa i zdania"],
};

function chapter(taskId, subject, title, frames, checks) {
  const [art, artAlt] = ART[subject];
  return {
    id: `nitka-${taskId}`,
    taskId,
    subject,
    title,
    art,
    artAlt,
    steps: frames.map(([beat, transcript, shot = "wide"], index) => ({
      beat,
      transcript,
      shot,
      audio: `./audio/chapters/nitka-c-${taskId}-${index + 1}.mp3`,
      lang: "pl-PL",
    })),
    checks,
  };
}

export const EXPANDED_SCENES = {
  "clock-minute-hand": chapter("clock-minute-hand", "math", "Zegar ratuje pokaz mody", [
    ["Długa = minuty · krótka = godziny", "Nitka ma pokaz o piętnastej, lecz jej zegar wygląda jak jeż po burzy. Najpierw porządek: długa wskazówka pokazuje minuty, a krótka godziny.", "clock"],
    ["Każda liczba to 5 minut", "Liczymy minuty piątkami. Na jedynce jest pięć, na dwójce dziesięć, na trójce piętnaście. Pełne koło to sześćdziesiąt minut.", "clock"],
    ["11 × 5 = 55", "Gdy długa wskazówka stoi na jedenastce, minęło pięćdziesiąt pięć minut. Za pięć minut zacznie się nowa godzina.", "right"],
    ["Kwadrans = 15 · pół godziny = 30", "Kwadrans trwa piętnaście minut, pół godziny trzydzieści, a trzy kwadranse czterdzieści pięć. Kokarda Nitki zna już całą tarczę.", "lower"],
  ], [{ atomId: "TIME.READ_MINUTES", replayStep: 2, prompt: "Długa wskazówka jest na 11. Ile to minut?", choices: ["50", "55", "60"], answers: ["55"] }]),

  "time-after-1445": chapter("time-after-1445", "math", "Nitka prawie się spóźnia", [
    ["14:45 — zostało 30 minut", "Jest czternasta czterdzieści pięć. Nitka ma trzydzieści minut do wyjścia, a kapelusz nadal siedzi na manekinie tyłem do przodu.", "clock"],
    ["Najpierw do pełnej godziny", "Nie dodajemy wszystkiego naraz. Od czternastej czterdzieści pięć do piętnastej brakuje piętnaście minut.", "right"],
    ["Potem wykorzystaj resztę", "Z trzydziestu minut wykorzystaliśmy piętnaście. Zostało piętnaście, więc dochodzimy do piętnastej piętnaście.", "right"],
    ["Wcześniej działa odwrotnie", "Gdy pytanie mówi dwadzieścia minut wcześniej, cofamy czas. Od czternastej zero pięć cofamy pięć minut do czternastej, a potem jeszcze piętnaście do trzynastej czterdzieści pięć.", "lower"],
    ["Czas trwania = koniec minus początek", "Lekcja od ósmej dziesięć do ósmej pięćdziesiąt pięć trwa czterdzieści pięć minut. Nitka zdążyła. Kapelusz też, choć nadal udaje, że to był plan.", "wide"],
  ], [{ atomId: "TIME.ADD_ACROSS_HOUR", replayStep: 1, prompt: "Która godzina będzie 30 minut po 14:45?", choices: ["15:00", "15:15", "15:45"], answers: ["15:15", "1515"] }]),

  "calendar-next-saturday": chapter("calendar-next-saturday", "math", "Kalendarz wielkiego pikniku", [
    ["Tydzień ma 7 dni", "Nitka planuje piknik. Tydzień ma siedem dni, a po poniedziałku zawsze przychodzi wtorek. Kalendarz nie robi niespodzianek, w przeciwieństwie do pogody.", "wide"],
    ["Miesiące mają 28–31 dni", "Styczeń ma trzydzieści jeden dni, luty dwadzieścia osiem albo dwadzieścia dziewięć, a kwiecień trzydzieści. Rok zwykły ma trzysta sześćdziesiąt pięć dni.", "left"],
    ["Rok przestępny ma 366 dni", "W roku przestępnym luty dostaje dodatkowy dzień i ma ich dwadzieścia dziewięć. Taki rok zdarza się zwykle co cztery lata.", "right"],
    ["Data przesuwa się razem z dniem", "Jeśli poniedziałek wypada ósmego maja, wtorek jest dziewiątego, środa dziesiątego, a sobota trzynastego maja.", "lower"],
    ["Dzień i nocleg to nie to samo", "Wycieczka od siódmego do dziesiątego sierpnia trwa cztery dni, ale obejmuje trzy noclegi. Nitka pakuje cztery stroje i tylko jedną szczoteczkę.", "wide"],
  ], [{ atomId: "CALENDAR.NEXT_WEEKDAY", replayStep: 3, prompt: "Poniedziałek to 8 maja. Kiedy będzie sobota?", choices: ["10 maja", "13 maja", "15 maja"], answers: ["13 maja", "13"] }]),

  "roman-nine": chapter("roman-nine", "math", "Rzymska kolekcja Nitki", [
    ["I = 1 · V = 5 · X = 10", "Nitka numeruje stroje cyframi rzymskimi. W czwartej klasie najważniejsze są trzy znaki: I to jeden, V to pięć, X to dziesięć.", "wide"],
    ["Po większej — dodajemy", "VI oznacza pięć plus jeden, czyli sześć. VIII to pięć plus trzy jedynki, czyli osiem.", "left"],
    ["Przed większą — odejmujemy", "IV to pięć minus jeden, czyli cztery. IX to dziesięć minus jeden, czyli dziewięć. Mały znak z przodu robi krok wstecz.", "right"],
    ["Najpierw dziesiątki, potem jedności", "Dwadzieścia trzy zapisujemy XXIII. Dziewiętnaście to XIX. Cyfry rzymskie spotkasz także przy wiekach, tomach książek i numerach władców.", "lower"],
  ], [{ atomId: "NUMBERS.ROMAN_IX", replayStep: 2, prompt: "Jaką liczbę oznacza IX?", choices: ["6", "9", "11"], answers: ["9"] }]),

  "length-room-unit": chapter("length-room-unit", "math", "Miarka kontra bardzo długi szalik", [
    ["mm · cm · m · km", "Nitka mierzy szalik. Milimetry pasują do drobiazgów, centymetry do małych przedmiotów, metry do pokoju, a kilometry do dalekiej trasy.", "wide"],
    ["1 m = 100 cm", "Jeden metr ma sto centymetrów. Dlatego trzysta piętnaście centymetrów to trzy metry i piętnaście centymetrów.", "left"],
    ["1 km = 1000 m", "Jeden kilometr ma tysiąc metrów. Odległość z domu do szkoły podamy raczej w kilometrach, nie w centymetrach.", "right"],
    ["Dobierz narzędzie do pomiaru", "Linijka mierzy zeszyt, taśma krawiecka ubranie, a długa miarka pomieszczenie. Najpierw ustawiamy zero, potem odczytujemy koniec.", "lower"],
  ], [{ atomId: "LENGTH.CHOOSE_UNIT", replayStep: 1, prompt: "Pokój ma długość 315. Która jednostka pasuje?", choices: ["cm", "m", "km"], answers: ["cm", "centymetry"] }]),

  "living-mushroom": chapter("living-mushroom", "nature", "Kto naprawdę mieszka w ogrodzie?", [
    ["Przyroda otacza nas wszędzie", "Przyroda to elementy powstałe naturalnie, bez udziału człowieka. Należą do niej składniki ożywione i nieożywione.", "wide"],
    ["Ożywione = organizmy", "Rośliny, zwierzęta, grzyby, bakterie i protisty są organizmami. Człowiek również jest częścią przyrody.", "left"],
    ["Nieożywione też są ważne", "Woda, powietrze, gleba, skały, minerały oraz ciała niebieskie należą do przyrody nieożywionej.", "right"],
    ["Elementy środowiska wpływają na siebie", "Mniej deszczu oznacza mniej wody dla roślin, a to wpływa na zwierzęta. W środowisku zmiana jednego elementu może poruszyć wiele innych.", "lower"],
  ], [{ atomId: "NATURE.LIVING_CLASSIFICATION", replayStep: 1, prompt: "Czy grzyb należy do przyrody ożywionej?", choices: ["tak", "nie"], answers: ["tak"] }]),

  "organisms-cells": chapter("organisms-cells", "nature", "Mikroskop Nitki", [
    ["Organizmy są bardzo różne", "Roślina, królik, grzyb i bakteria wyglądają inaczej, ale każde z nich jest organizmem.", "wide"],
    ["Wspólna cecha: komórki", "Wszystkie organizmy są zbudowane z komórek. Komórka jest podstawową, bardzo małą częścią budowy organizmu.", "left"],
    ["Mikroskop pokazuje to, czego oko nie widzi", "Lupa powiększa małe obiekty, a mikroskop pozwala zobaczyć jeszcze mniejsze szczegóły, na przykład komórki.", "right"],
  ], [{ atomId: "NATURE.ORGANISMS_CELLS", replayStep: 1, prompt: "Z czego są zbudowane organizmy?", choices: ["z komórek", "z kamieni", "z plastiku"], answers: ["z komórek", "z komorek"] }]),

  "life-process-growing": chapter("life-process-growing", "nature", "Sekret żywego nasionka", [
    ["Organizmy wykonują czynności życiowe", "Organizm żyje, ponieważ wykonuje czynności życiowe. Należą do nich między innymi odżywianie, oddychanie, wzrost i rozwój.", "wide"],
    ["Reagowanie pomaga przetrwać", "Organizmy reagują na bodźce, poruszają się lub zmieniają zachowanie. Roślina może kierować liście w stronę światła.", "left"],
    ["Rozmnażanie daje nowe organizmy", "Rozmnażanie sprawia, że pojawiają się nowe organizmy. Nasiono kiełkuje, roślina rośnie i rozwija się.", "right"],
    ["Wzrost oznacza zmianę rozmiaru", "Gdy dziecko staje się wyższe albo kiełek większy, obserwujemy wzrost. Nitka też rośnie, tylko jej uszy robią to podejrzanie szybko.", "lower"],
  ], [{ atomId: "NATURE.LIFE_PROCESS_GROWTH", replayStep: 3, prompt: "Dziecko staje się wyższe. Co to pokazuje?", choices: ["wzrost", "oddychanie", "ruch"], answers: ["wzrost"] }]),

  "anthropogenic-road": chapter("anthropogenic-road", "nature", "Tropem rzeczy zrobionych przez ludzi", [
    ["Naturalne powstaje bez człowieka", "Rzeka, kamień i drzewo powstają naturalnie. Człowiek może je zmieniać, ale nie zaprojektował pierwszego kamienia.", "wide"],
    ["Antropogeniczne tworzy człowiek", "Drogi, mosty, budynki, ogrodzenia i znaki drogowe to elementy antropogeniczne, bo powstały dzięki działalności ludzi.", "left"],
    ["Działalność człowieka zmienia środowisko", "Kamieniołomy, hałdy i zapory mocno zmieniają krajobraz. Zanieczyszczenia mogą szkodzić organizmom.", "right"],
    ["Jedno miejsce może zawierać wszystkie grupy", "W parku znajdziesz rośliny i zwierzęta, wodę i skały oraz ławki i ścieżki. Trzeba pytać: żyje, powstało naturalnie czy zrobił to człowiek?", "lower"],
  ], [{ atomId: "NATURE.ANTHROPOGENIC", replayStep: 1, prompt: "Jaka jest asfaltowa droga?", choices: ["naturalna", "antropogeniczna"], answers: ["antropogeniczna"] }]),

  "stimulus-light": chapter("stimulus-light", "nature", "Wiadomość dla mózgu", [
    ["Bodziec to informacja ze środowiska", "Światło, dźwięk, zapach, smak, nacisk i temperatura mogą być bodźcami odbieranymi przez organizm.", "wide"],
    ["Receptor odbiera bodziec", "Receptory to wyspecjalizowane elementy organizmu. Receptory w oku odbierają światło, a receptory w skórze nacisk i temperaturę.", "left"],
    ["Informacja wędruje do mózgu", "Po odebraniu bodźca informacja biegnie układem nerwowym do mózgu. Dopiero mózg tworzy wrażenie widzenia, słyszenia albo czucia.", "right"],
    ["Reakcja jest odpowiedzią organizmu", "Jasne światło jest bodźcem, receptory oka je odbierają, mózg analizuje, a Nitka mruży oczy i odwraca głowę. To reakcja.", "lower"],
  ], [{ atomId: "SENSES.STIMULUS_LIGHT", replayStep: 3, prompt: "Latarka świeci w oczy. Co jest bodźcem?", choices: ["światło", "oko", "latarka"], answers: ["światło", "swiatlo"] }]),

  "senses-sound": chapter("senses-sound", "nature", "Pięć zmysłów i jeden chwiejny kapelusz", [
    ["Wzrok: oko odbiera światło", "Oczy informują o kolorach, kształtach i ilości światła. Lupa i mikroskop pomagają oglądać małe obiekty, a lornetka dalekie.", "wide"],
    ["Słuch i równowaga: ucho", "Ucho odbiera dźwięki i pomaga utrzymać równowagę. Bardzo głośne dźwięki męczą i mogą uszkodzić słuch.", "left"],
    ["Węch: nos · smak: język", "Nos odbiera cząsteczki zapachowe. Język rozpoznaje smaki: słodki, słony, kwaśny, gorzki i umami. Węch i smak współpracują.", "right"],
    ["Dotyk: receptory w skórze", "Skóra odbiera nacisk i temperaturę. Najwięcej receptorów dotyku znajduje się na dłoniach i twarzy.", "lower"],
    ["Zmysły ostrzegają", "Zapach gazu, nagły hałas, gorący przedmiot lub ostre światło mogą ostrzec przed zagrożeniem. Kapelusz Nitki nie ma zmysłu równowagi, więc znów spadł.", "wide"],
  ], [{ atomId: "SENSES.RECEPTOR_SOUND", replayStep: 1, prompt: "Który narząd odbiera dźwięki?", choices: ["ucho", "oko", "nos"], answers: ["ucho", "uszy"] }]),

  "english-thirteen": chapter("english-thirteen", "english", "Liczby na wybiegu", [
    ["one, two, three, four, five", "Nitka liczy dodatki po angielsku: one, two, three, four, five. Potem: six, seven, eight, nine, ten.", "wide"],
    ["eleven–twenty", "Eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty. Końcówka teen często oznacza liczbę od trzynastu do dziewiętnastu.", "left"],
    ["thirteen ≠ thirty", "Thirteen to trzynaście, a thirty to trzydzieści. W thirteen mocniej słychać końcówkę teen, a dziesiątki mają końcówkę ty.", "right"],
    ["twenty–one hundred", "Dziesiątki to twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety. One hundred oznacza sto.", "lower"],
  ], [{ atomId: "EN.NUMBERS_THIRTEEN", replayStep: 2, prompt: "Która liczba to thirteen?", choices: ["12", "13", "30"], answers: ["13"] }]),

  "english-pencil-case": chapter("english-pencil-case", "english", "Co Nitka ma w klasie?", [
    ["board · book · chair · computer", "In the classroom: a board is tablica, a book is książka, a chair is krzesło, and a computer is komputer.", "wide"],
    ["desk · notebook · pen · pencil", "A desk is biurko, a notebook is zeszyt, a pen is długopis, and a pencil is ołówek.", "left"],
    ["pencil case · rubber · schoolbag", "A pencil case is piórnik, a rubber is gumka, and a schoolbag is plecak. Nitka włożyła piórnik do plecaka, nie odwrotnie.", "right"],
    ["What’s this? It’s a…", "Pytamy: What’s this? Odpowiadamy: It’s a pencil case. Możemy też powiedzieć: This is my book.", "lower"],
  ], [{ atomId: "EN.CLASSROOM_PENCIL_CASE", replayStep: 2, prompt: "Który napis oznacza piórnik?", choices: ["pencil case", "book", "desk"], answers: ["pencil case"] }]),

  "english-they": chapter("english-they", "english", "Kto jest kim na zdjęciu?", [
    ["I = ja · you = ty lub wy", "Personal pronouns zastępują osoby i rzeczy. I means ja. You means ty albo wy, zależnie od sytuacji.", "wide"],
    ["he · she · it", "He oznacza on, she oznacza ona, a it używamy dla rzeczy lub zwierzęcia, gdy nie podajemy płci.", "left"],
    ["we · they", "We oznacza my. They oznacza oni albo one. Anna and Ola to they, bo mówimy o więcej niż jednej osobie.", "right"],
    ["Zaimek usuwa powtarzanie", "Ruby is my friend. She is ten. Zamiast powtarzać Ruby, używamy she. Nitka lubi skróty, zwłaszcza gdy prowadzą szybciej do deseru.", "lower"],
  ], [{ atomId: "EN.PRONOUNS_THEY", replayStep: 2, prompt: "Anna i Ola. Który zaimek pasuje?", choices: ["she", "they"], answers: ["they"] }]),

  "english-he-is": chapter("english-he-is", "english", "To be na przyjęciu Nitki", [
    ["I am", "Nitka przedstawia się: I am Nitka. I am ten. Przy zaimku I czasownik to be przyjmuje formę am.", "wide"],
    ["you are · we are · they are", "Mówimy: you are, we are, they are. Na przykład: You are my friend. We are ready. They are funny.", "left"],
    ["he is · she is · it is", "Dla jednej osoby lub rzeczy używamy is: he is, she is, it is. He is ten. She is from Poland. It is small.", "right"],
    ["I’m · you’re · he’s", "W mowie często używamy skrótów: I’m, you’re, he’s, she’s, it’s, we’re, they’re. Znaczenie pozostaje takie samo.", "lower"],
    ["Imiona też łączą się z is lub are", "Ruby is my friend. Ruby and Lisa are friends. Jedno imię łączy się z is, a kilka osób z are.", "wide"],
  ], [{ atomId: "EN.TO_BE_HE", replayStep: 2, prompt: "He ___ ten. Co pasuje?", choices: ["am", "is", "are"], answers: ["is"] }]),

  "english-an-apple": chapter("english-an-apple", "english", "A czy an? Szafa decyduje", [
    ["a przed dźwiękiem spółgłoski", "Używamy a przed wyrazem zaczynającym się dźwiękiem spółgłoski: a book, a pencil, a desk.", "wide"],
    ["an przed dźwiękiem samogłoski", "Używamy an przed dźwiękiem samogłoski: an apple, an orange. Dzięki temu łatwiej płynnie wymówić całość.", "left"],
    ["W liczbie mnogiej bez a i an", "Mówimy: It’s a pen, ale They’re pens. Przed rzeczownikiem w liczbie mnogiej nie dodajemy a ani an.", "right"],
    ["Przymiotnik zmienia wybór", "Patrzymy na pierwszy dźwięk po przedimku: an orange computer, ale a small orange computer, bo small zaczyna się spółgłoską.", "lower"],
  ], [{ atomId: "EN.ARTICLE_AN", replayStep: 1, prompt: "___ apple. Co pasuje?", choices: ["a", "an"], answers: ["an"] }]),

  "english-brown-desk": chapter("english-brown-desk", "english", "Projektantka zdań", [
    ["adjective + noun", "W angielskim przymiotnik stoi przed rzeczownikiem. Brown desk oznacza brązowe biurko, a red pencil czerwony ołówek.", "wide"],
    ["Przymiotnik nie zmienia formy", "Mówimy a small computer i small computers. Słowo small pozostaje takie samo w liczbie pojedynczej i mnogiej.", "left"],
    ["Wielkość zwykle przed kolorem", "Gdy są dwa przymiotniki, wielkość zwykle podajemy przed kolorem: a small grey computer.", "right"],
    ["very wzmacnia cechę", "Very znaczy bardzo: a very small computer. Nitka ma very big ideas i całkiem small kieszenie.", "lower"],
  ], [{ atomId: "EN.ADJECTIVE_NOUN_ORDER", replayStep: 0, prompt: "Jak po angielsku powiesz brązowe biurko?", choices: ["brown desk", "desk brown"], answers: ["brown desk"] }]),
};
