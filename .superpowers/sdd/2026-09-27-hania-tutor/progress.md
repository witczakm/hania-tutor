# SDD ledger — plan: docs/superpowers/plans/2026-09-27-hania-tutor.md

Setup: Ruling: katalog nie jest repozytorium Git, więc praca odbywa się w miejscu bez worktree i commitów — aplikacja nadal pozostaje w izolowanym katalogu projektu — koszt, jeśli decyzja jest błędna: brak historii zmian do łatwego wycofania.
Pre-flight: Task 1 produces createInitialState/evaluateAnswer/chooseAction/applyAnswer consumed by Tasks 2–4; signatures agree.
Pre-flight: Task 2 produces switchMode/saveState/loadState/selectNextTask consumed by Task 4; signatures agree.
Pre-flight: Task 3 extends TASKS and produces getTaskById/getActionContent consumed by Task 4; signatures agree.
Pre-flight: Ruling: static source-grep tests from Task 4 are replaced by browser-observable markup checks where practical; source checks remain only for the no-dependency HTML shell — cost, if wrong: a structural regression could pass while browser behavior fails, covered by manual smoke test.
Task 1: complete (no git range, tests: node --test test.mjs → 6/6 pass)
Task 2: complete (tests: node --test test.mjs → 10/10 pass)
