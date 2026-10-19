## Architecture

Everyday is a dependency-free browser to-do app served by a small Node.js server. `app.js` owns UI state and event wiring, while `tasks.js`, `storage.js`, and `dom.js` separate task operations, persistence, and rendering as documented in `CONTRIBUTING.md`. The project uses native ES modules for the application and Node’s built-in test runner and syntax checks.

## Conventions

- Use two-space indentation and native JavaScript modules in application code; `package.json` sets `"type": "module"` and `CONTRIBUTING.md` explicitly requires modules and no unnecessary dependencies.
- Keep responsibilities separated: task mutations belong in `tasks.js`, browser storage in `storage.js`, and DOM construction in `dom.js` (`CONTRIBUTING.md`).
- Keep UI state and event handling in `app.js`; rendering is centralized through `renderTasks()` in `dom.js`, with list updates performed using `replaceChildren()`.
- Render user-controlled task text safely with `textContent`, not HTML interpolation. `dom.js` uses `label.textContent` and button `textContent`; `app.js` also uses `textContent` for status and warning messages.
- Preserve accessibility behavior: controls use real labels and buttons (`dom.js`), delete buttons have task-specific `aria-label`s, filters update `aria-pressed` (`app.js`), and focus is restored after mutations.
- Task input must reject whitespace-only values (`app.js`), and task persistence uses the documented `everyday-tasks` local-storage key (`README.md`).
- Changes should remain dependency-free and support Node.js 22 or newer. The available checks are `npm run build` for `node --check` validation and `npm test` for Node tests (`package.json`, `README.md`).
- Example files under `examples/` intentionally use CommonJS, `'use strict'`, semicolons, and small pure helpers; do not use them as the application module convention.

## Intentional non-standard choices

- The app remains usable when storage fails: `loadTasks()`/`saveTasks()` communicate failure through warnings rather than making persistence a hard requirement (`README.md`, `app.js`).
- Invalid saved task entries are skipped while valid entries are recovered, rather than rejecting the entire stored collection (`README.md`).
- The application has no dependency installation step; `npm start` runs the local server directly (`CONTRIBUTING.md`, `package.json`).

## Watch out for

- Introducing `innerHTML` or unsafe HTML interpolation for task titles; this would violate the explicit `textContent` safety rule (`CONTRIBUTING.md`, `dom.js`).
- Moving task logic, persistence, or rendering across their designated modules without a clear reason.
- Breaking focus restoration, visible keyboard focus, labels, filter `aria-pressed` state, or narrow-screen usability.
- Treating storage errors or malformed saved entries as fatal; the documented behavior is warning plus continued use and partial recovery.
- Adding dependencies or requiring an installation step when the project is intentionally dependency-free.