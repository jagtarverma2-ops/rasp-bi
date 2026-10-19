# Everyday

A simple to-do app built with HTML, CSS, and JavaScript. No dependencies are required.

## Bug-fixing exercise

Three new application modules intentionally introduce four independent issues:

- `task-title.js`: surrounding whitespace is kept in task titles.
- `task-actions.js`: toggling one task toggles every task.
- `task-actions.js`: deleting a task keeps that task and removes the others.
- `task-filter.js`: the Active filter shows completed tasks.

Run `npm run score` to check these behaviors. The exercise starts at **1/5**;
each corrected behavior adds exactly one point: **2/5 → 3/5 → 4/5 → 5/5**,
in any order. Fix the application modules, keeping the scoring checks unchanged.
This is a local exercise score, not a prediction of an external review score.
Build and infrastructure tests can pass while these intentional bugs remain.

Use Node.js 22 or newer. Run `npm start` and open http://localhost:3000.
The optional `PORT` environment variable accepts decimal integers from 0 to 65535.
It defaults to 3000; use 0 to select an available port, printed at startup.
Invalid values stop startup with a clear error.
Run `npm run build` for syntax checks and `npm test` for automated tests.

Tasks are saved in this browser under the `everyday-tasks` local storage key.
If storage is unavailable, the app remains usable and displays a warning.
Invalid saved entries are skipped while valid tasks are recovered.
