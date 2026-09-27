# Moduł startowy „Króliczka Nitka” — projekt

## Cel

Rozszerzamy działającą aplikację o krótkie wprowadzenia do wiedzy prowadzone przez jedną powracającą bohaterkę. Króliczka Nitka interesuje się modą, projektowaniem ubrań i przebieraniem lalek. Scenki mają zaciekawić 10-letnią Hanię, przekazać dokładnie jeden atom wiedzy i dostarczyć kontekstu, do którego później nawiąże pytanie.

Inspiracją jest sposób budowania napięcia znany z filmów MrBeasta: natychmiastowa misja, wyraźny cel, mała przeszkoda i czytelny finał. Nie kopiujemy jego wyglądu, głosu, nazwy, scenariuszy ani marki. Zachowujemy spokojne tempo, brak presji i brak nadmiaru bodźców.

## Najważniejsza zasada

Każda scenka realizuje jeden przebieg:

```text
MISJA → JEDEN PROBLEM → JEDNO WYJAŚNIENIE → JEDNO PYTANIE → ODPOWIEDŹ
```

Na ekranie nie pojawia się więcej niż jedno pytanie. Scenka nie uruchamia kolejnego kroku automatycznie. Hania sama wybiera „Dalej”, „Jeszcze raz” albo „Pomiń”.

## Bohaterka i ton

Nitka jest bystrą, ciepłą projektantką mody. Popełnia bezpieczne, zabawne pomyłki, które uruchamiają problem edukacyjny. Humor dotyczy sytuacji lub Nitki, nigdy Hani i nigdy jej błędnej odpowiedzi.

Warstwa wizualna jest ilustracyjna i odpowiednia dla 10-latki: bez niemowlęcych proporcji, przesadnie wielkich oczu, księżniczkowego różu i infantylnych zdrobnień. Podstawowe kolory to śliwkowy, morski, kremowy i ciepły koral. Moda wspiera fabułę, lecz nie zdradza odpowiedzi i nie konkuruje z treścią zadania.

## Głos Nitki

Polski głos brzmi jak młoda dorosła aktorka: ciepło, naturalnie, bystro i lekko żartobliwie. Nie udaje głosu dziecka i nie brzmi jak szkolna lektorka. Docelowe tempo to około 110–120 słów na minutę, z naturalnymi pauzami między myślami.

Angielski głos zachowuje podobną barwę i osobowość, mówi nieco wolniej i bardzo wyraźnie. Polski wprowadza sytuację, a angielski modeluje tylko krótkie słowo lub zdanie wymagane w danej lekcji. Przycisk powtórzenia może odtworzyć samą linię angielską.

Wszystkie kwestie są przygotowane jako całe, statyczne nagrania MP3. Nie składamy wypowiedzi z osobnych słów i nie używamy syntezatora przeglądarki w normalnym przebiegu. Każda kwestia przechodzi odsłuch na telefonie i komputerze pod kątem naturalności, płynności i poprawnej wymowy.

## Trzy pilotażowe scenki

Pierwsze wdrożenie obejmuje tylko trzy kompletne scenki — po jednej na przedmiot. Pozwala to sprawdzić format bez produkowania całej biblioteki przed potwierdzeniem, że Hanię rzeczywiście angażuje.

### Matematyka: „Pokaz za pół godziny”

Nitka przygotowuje pokaz stroju o 14:45 i błędnie sądzi, że za 30 minut będzie 15:45. Oś czasu pokazuje dwa spokojne skoki po 15 minut: 14:45 → 15:00 → 15:15. Po scence aplikacja pyta wyłącznie: „O której zacznie się pokaz?”.

Atom wiedzy: przekroczenie pełnej godziny przy dodawaniu czasu.

### Przyroda: „Kapelusz, który nie rośnie”

Nitka projektuje ogród do sesji zdjęciowej i umieszcza obok królika roślinę oraz kapelusz. Królik i roślina wykonują czynności życiowe, kapelusz nie. Po scence aplikacja pyta wyłącznie: „Co tutaj jest organizmem?”.

Atom wiedzy: rozpoznanie organizmu na podstawie czynności życiowych, a nie wyglądu lub miejsca.

### Angielski: „An orange scarf”

Nitka kompletuje strój i wybiera pomarańczowy szalik. Polska kwestia ustanawia sytuację, po czym Nitka wyraźnie mówi: „an orange scarf”. Po scence aplikacja pyta wyłącznie o poprawną wersję wyrażenia.

Atom wiedzy: użycie `an` przed wyrazem zaczynającym się samogłoską. Szyk przymiotnik + rzeczownik jest w tej scence tylko kontekstem i nie jest oceniany.

## Forma scenki

Scenka jest sekwencją 3–5 ilustrowanych kadrów z subtelnym ruchem CSS: wejście elementu, przesunięcie wskazówki, odsłonięcie stroju lub spokojne przybliżenie. Animuje się tylko element niosący znaczenie. Nie ma zapętlonego ruchu, migania ani automatycznego odliczania. `prefers-reduced-motion` wyłącza ruch bez utraty treści.

Sterowanie:

- odtwórz/pauza;
- jeszcze raz;
- pomiń scenkę;
- napisy włączone domyślnie;
- powtórz ostatnią kwestię;
- „Dalej” uruchamiane przez dziecko.

To nie jest plik wideo. Używamy istniejących technologii aplikacji: HTML, CSS, ilustracje i MP3. Dzięki temu tekst pozostaje dostępny, scenkę można zatrzymać w dowolnym miejscu, a błędna odpowiedź może przywołać tylko potrzebny kadr.

## Włączenie do pętli adaptacyjnej

Scenka nie jest osobnym trybem nauki. Jest jedną możliwą akcją `GIVE_EXAMPLE`, używaną tylko wtedy, gdy system wykrył najmniejszą lukę albo dziecko rozpoczyna nowy atom w trybie „Ścieżka odkrywcy”.

Przepływ:

1. System sprawdza wiedzę jednym mikro-pytaniem.
2. Jeśli odpowiedź ujawnia konkretną lukę, pokazuje przypisaną scenkę.
3. Po scence zadaje jedno pytanie w kontekście Nitki.
4. Następnie sprawdza ten sam atom w nowej, krótkiej sytuacji.
5. Wynik zapisuje we wspólnym profilu wiedzy i planuje powrót.

Jeśli odpowiedź jest błędna, aplikacja nie odtwarza całej scenki. Pokazuje tylko jeden potrzebny kadr i jedną podpowiedź. Odpowiedź po podpowiedzi nie podnosi stanu do samodzielnego opanowania.

## Dane i kontynuacja między trybami

Do istniejących danych zadania dochodzą opcjonalne pola scenki:

```text
scene
  title
  atomId
  steps[]
    image
    audio
    transcript
    lang
  replayStep
```

Stan odtwarzania zapisuje tylko identyfikator scenki i numer bieżącego kadru. Wiedza nadal jest przechowywana w istniejącym, wspólnym `knowledge[atomId]`. Zmiana przedmiotu lub trybu zachowuje postęp i nie tworzy drugiego profilu.

Nie dodajemy serwera, kont, bazy danych, systemu zarządzania treścią, biblioteki animacji ani własnego odtwarzacza wideo.

## Ekran startowy i nawigacja

Na ekranie startowym pojawia się duża ilustracja Nitki oraz jedno zdanie zapraszające do misji. Dziecko nadal może najpierw wybrać matematykę, przyrodę albo angielski, a potem jeden z trzech trybów nauki. Scenka respektuje aktywny przedmiot i nie przełącza go samodzielnie.

## Dostępność i obciążenie poznawcze

- jedna informacja i najwyżej jedna decyzja na ekranie;
- napisy zsynchronizowane znaczeniowo z nagraniem;
- każde sterowanie ma tekstową etykietę i duży obszar kliknięcia;
- pełna obsługa klawiatury i widoczny fokus;
- brak automatycznego dźwięku przed działaniem użytkownika;
- brak kary za zatrzymanie, powtórkę lub pominięcie;
- scenka zachowuje sens bez dźwięku i bez animacji;
- po trzech nieudanych próbach system proponuje przerwę, nie zwiększa intensywności.

## Kryteria akceptacji pilota

1. Każdy z trzech przedmiotów ma jedną kompletną scenkę Nitki.
2. Każda scenka uczy dokładnie jednego określonego atomu wiedzy.
3. Na ekranie znajduje się najwyżej jedno pytanie.
4. Dźwięk jest statycznym nagraniem i nie korzysta z syntezatora przeglądarki w normalnym przebiegu.
5. Napisy, pauza, powtórzenie, pominięcie i obsługa klawiatury działają.
6. Przełączenie przedmiotu lub trybu zachowuje wspólny profil i miejsce kontynuacji.
7. Przy ograniczonym ruchu wszystkie trzy scenki pozostają kompletne i zrozumiałe.
8. Testy potwierdzają, że po scence system zapisuje dowód dla właściwego atomu, a odpowiedź po pomocy nie staje się samodzielnym opanowaniem.
9. Ręczny odsłuch potwierdza naturalne, nierwane brzmienie polskich i angielskich kwestii.

## Poza zakresem pilota

Nie tworzymy od razu scenek do wszystkich 17 zadań, wielu bohaterów, awatarów Hani, punktów, rankingu, sklepu z nagrodami ani presji czasowej. Rozbudowa biblioteki nastąpi dopiero po krótkim teście trzech scenek z Hanią.
