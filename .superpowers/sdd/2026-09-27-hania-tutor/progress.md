# SDD ledger — plan: docs/superpowers/plans/2026-09-27-hania-tutor.md

Setup: Ruling: katalog nie jest repozytorium Git, więc praca odbywa się w miejscu bez worktree i commitów — aplikacja nadal pozostaje w izolowanym katalogu projektu — koszt, jeśli decyzja jest błędna: brak historii zmian do łatwego wycofania.
Pre-flight: Task 1 produces createInitialState/evaluateAnswer/chooseAction/applyAnswer consumed by Tasks 2–4; signatures agree.
Pre-flight: Task 2 produces switchMode/saveState/loadState/selectNextTask consumed by Task 4; signatures agree.
Pre-flight: Task 3 extends TASKS and produces getTaskById/getActionContent consumed by Task 4; signatures agree.
Pre-flight: Ruling: static source-grep tests from Task 4 are replaced by browser-observable markup checks where practical; source checks remain only for the no-dependency HTML shell — cost, if wrong: a structural regression could pass while browser behavior fails, covered by manual smoke test.
Task 1: complete (no git range, tests: node --test test.mjs → 6/6 pass)
Task 2: complete (tests: node --test test.mjs → 10/10 pass)
Task 3: complete (tests: node --test test.mjs → 13/13 pass)
Task 4: complete (node --check app.js; tests: 15/15; browser smoke: 3 modes, shared progress, mode cursor, hint, break, keyboard focus, 390px viewport — all pass)
Final review: 7 findings addressed (review limit/redirect, explorer subject/prerequisites/map, safe storage migration, transfer evidence, manual break, progress details, single live announcement). Verification: 22/22 tests and updated browser smoke pass.
Visual accessibility refinement: task diagrams, large answer choices, question speech, persistent subject filter, calm instructional motion and reduced-motion path. Verification: 30/30 tests, desktop/mobile visual review, clean browser console.
Visual review follow-up: prerequisite graphic separated, per-subject diagnostic state restored, explorer cursor honored, keyboard focus retained, English speech language corrected and explorer contrast raised. Verification: 33/33 tests and clean browser flow.
Second visual review follow-up: review limit kept global, vocabulary speech no longer reveals answers, all 17 prerequisite steps have content-specific diagrams, and main navigation retains keyboard focus. Verification: 35/35 tests and clean mobile browser flow.
