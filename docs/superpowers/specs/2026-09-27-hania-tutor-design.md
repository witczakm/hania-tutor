# Hania Tutor — jedna aplikacja, trzy tryby nauki

## Cel

Powstanie jedna lokalna aplikacja przeglądarkowa z trzema różnymi trybami nauki. Tryby korzystają ze wspólnego profilu wiedzy dziecka: wiedzą, które atomy zostały opanowane, które wymagają wsparcia i kiedy należy do nich wrócić. Dziecko może przełączać tryby bez utraty postępu. Każdy tryb zachowuje też własne miejsce, więc po powrocie można kontynuować rozpoczętą ścieżkę.

## Zakres pierwszej wersji

Aplikacja działa bez konta, serwera i połączenia z modelem AI. Zawiera przygotowaną bazę mikro-zadań z matematyki, przyrody i angielskiego oraz deterministyczną pętlę adaptacyjną. Postęp jest zapisywany w `localStorage`.

Pierwsza wersja obsługuje:

- jedno pytanie na ekranie;
- odpowiedzi tekstowe i odpowiedzi wybierane przyciskiem;
- dokładnie jedną akcję po odpowiedzi;
- diagnozę błędu w maksymalnie czterech mikro-krokach;
- podpowiedź, uproszczenie, przykład i reprezentację wizualną;
- przerwę oraz zakończenie sesji;
- stany wiedzy `UNSEEN`, `SUPPORTED`, `INDEPENDENT`, `TRANSFERRED`, `RETAINED`;
- wspólny postęp dla trzech trybów;
- osobne miejsce kontynuacji dla każdego trybu;
- historię pomocy i terminy powtórek;
- reset danych demonstracyjnych.

Rozpoznawanie dowolnych wypowiedzi przez model językowy, głos, logowanie, synchronizacja między urządzeniami i panel administracyjny nie wchodzą do pierwszej wersji.

## Wspólny silnik

Silnik przechowuje bieżące zadania, atomy wiedzy, dopuszczalne odpowiedzi, zależności wstępne, kroki diagnostyczne, poziom pomocy, dowody samodzielnych odpowiedzi i kolejkę powtórek.

Przepływ odpowiedzi:

1. Normalizacja odpowiedzi bez zmiany znaczenia.
2. Ocena: poprawna, częściowa, błędna, „nie wiem” albo brak odpowiedzi.
3. Aktualizacja dowodu dotyczącego jednego atomu wiedzy.
4. Wybór dokładnie jednej akcji.
5. Wygenerowanie jednego następnego mikro-kroku.

Priorytet akcji:

1. `END_SESSION`, jeśli cel lub limit sesji został osiągnięty.
2. `TAKE_BREAK`, jeśli dziecko wybierze przerwę albo wystąpią trzy nieudane próby.
3. `GIVE_HINT` po „nie wiem”.
4. `CHECK_PREREQUISITE`, jeśli błąd ma kilka możliwych przyczyn i pozostał budżet diagnozy.
5. `SIMPLIFY`, jeśli zadanie zawiera kilka operacji albo poprzednia pomoc nie wystarczyła.
6. `GIVE_EXAMPLE` po zlokalizowaniu braku reguły.
7. `ADVANCE` po odpowiedzi poprawnej.
8. `RETRIEVE_OLD_KNOWLEDGE` po pięciu poprawnych odpowiedziach lub gdy przypada powtórka.

## Tryb 1: Spokojny stolik

Tryb celowanej pomocy. Rozpoczyna od bieżącej luki albo błędu, lokalizuje najniższy brakujący warunek w 2–4 pytaniach, uczy tylko tej rzeczy i wykonuje jeden retest. To podstawowy tryb do pracy nad materiałem, który nie jest jeszcze stabilny.

Widok jest pełnoekranowy i skupiony. Zawiera mały nagłówek sesji, obszar pytania, opcjonalną pomoc wizualną, odpowiedź oraz stały przycisk przerwy. Nie pokazuje mapy materiału ani szczegółowych statystyk.

Warstwa wizualna: jasne tło, głęboka zieleń jako jeden akcent, duża typografia, miękkie narożniki, brak dekoracyjnych animacji.

## Tryb 2: Ścieżka odkrywcy

Tryb poznawania nowego materiału. Dziecko wybiera jedną z trzech dziedzin, a system proponuje następny atom, którego warunki wstępne są już opanowane. Nowa treść jest wprowadzana jednym przykładem, po którym następuje jedno małe zadanie.

Jeśli ujawni się wcześniejsza luka, system zapisuje ją we wspólnym profilu i proponuje przejście do Spokojnego stolika.

Widok zawiera kartę pytania oraz spokojną mapę matematyki, przyrody i angielskiego. Ukończone atomy odsłaniają kolejne punkty ścieżki. Mapa nie przyznaje punktów, nie pokazuje rankingu i nie karze za błędy. W czasie odpowiadania jest wizualnie wyciszona.

## Tryb 3: Szybka powtórka

Tryb krótkiego odtwarzania wiedzy. Wybiera wyłącznie atomy, dla których nadszedł termin powtórki, oraz pojedyncze starsze atomy kontrolne. Domyślna sesja zawiera najwyżej pięć mikro-zadań. Nie wprowadza nowego materiału.

Po poprawnej odpowiedzi zwiększa odstęp do kolejnej powtórki. Po błędzie nie prowadzi pełnej lekcji: zapisuje dowód i proponuje kontynuację w Spokojnym stoliku. Odpowiedź po podpowiedzi nie zwiększa poziomu opanowania.

Widok przypomina zestaw prostych kart. Pokazuje liczbę pozostałych kroków, ale nie stosuje stopera, punktów ani serii jako nagrody.

## Wspólny widok postępu

Poza trzema trybami dostępny jest ekran „Postęp”. Pokazuje stan atomów wiedzy, ostatnie działania systemu, wykorzystaną pomoc i zaplanowane powtórki. Nie jest trybem nauki i nie pojawia się podczas odpowiadania.

Widok nie przypisuje dziecku cech. Używa sformułowań takich jak „jeszcze niepotwierdzone” i „odpowiedź po podpowiedzi”.

## Nawigacja i kontynuacja

Ekran startowy pokazuje trzy tryby wraz z jednym krótkim opisem ich celu. Dyskretny przełącznik w nagłówku umożliwia zmianę trybu.

Przełączenie zapisuje bieżące pytanie, krok diagnozy i poziom pomocy. Po powrocie dziecko kontynuuje od tego samego miejsca. Aktualizacje wspólnego profilu wiedzy są natychmiast widoczne we wszystkich trybach.

## Wspólny profil wiedzy

Stan aplikacji jest zapisany pod jednym wersjonowanym kluczem `hania-tutor-state-v1`:

```text
knowledge[atomId]
  status
  independentSuccesses
  supportedSuccesses
  contexts
  lastSeenAt
  nextReviewAt

modeSessions[modeId]
  currentTaskId
  currentStep
  diagnosticCount
  helpLevel
  consecutiveErrors

history[]
  timestamp
  modeId
  atomId
  action
  result
```

Interpretacja odpowiedzi i aktualizacja wiedzy są wspólne. Tryb wpływa tylko na dobór następnego zadania i sposób prezentacji.

## Materiał demonstracyjny

Baza zawiera co najmniej po jednym pełnym przepływie adaptacyjnym dla:

- zegara i upływu czasu;
- kalendarza;
- cyfr rzymskich;
- jednostek długości;
- przyrody ożywionej, nieożywionej i antropogenicznej;
- organizmów i czynności życiowych;
- bodźca, receptora i zmysłów;
- angielskich liczb i przedmiotów szkolnych;
- zaimków, `to be`, `a/an` i szyku przymiotnik + rzeczownik.

## Dostępność

- pełna obsługa klawiatury;
- widoczny fokus;
- kontrast WCAG AA;
- etykiety pól i komunikatów;
- obszar informacji zwrotnej z `aria-live="polite"`;
- brak automatycznego odliczania;
- brak dźwięków uruchamianych bez zgody;
- tekst nie opiera znaczenia wyłącznie na kolorze;
- poprawna obsługa telefonu i komputera;
- ograniczenie ruchu zgodne z `prefers-reduced-motion`.

## Architektura plików

Najmniejsza wystarczająca struktura:

```text
index.html
styles.css
app.js
test.mjs
```

`app.js` zawiera dane zadań, czyste funkcje silnika i renderowanie trzech trybów. Rozdzielenie na framework lub moduły nastąpi dopiero wtedy, gdy rzeczywisty rozmiar kodu zacznie utrudniać pracę.

## Weryfikacja

Jedno uruchamialne sprawdzenie testuje:

- wybór tylko jednej akcji;
- przejście po poprawnej i błędnej odpowiedzi;
- limit czterech kroków diagnostycznych;
- brak uznania odpowiedzi po podpowiedzi za trwałe opanowanie;
- wspólną aktualizację wiedzy z każdego trybu;
- zachowanie osobnego miejsca każdego trybu;
- kontynuację po przełączeniu trybu;
- zapis i odczyt postępu.

Aplikacja zostanie następnie sprawdzona ręcznie w przeglądarce we wszystkich trybach oraz na wąskim ekranie.
