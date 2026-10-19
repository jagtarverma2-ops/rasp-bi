import { normalizeTitle } from './task-title.js';
import { toggleTask, deleteTask } from './task-actions.js';
import { filterTasks } from './task-filter.js';

export { toggleTask, deleteTask, filterTasks };

export function addTask(tasks, text) {
  const title = normalizeTitle(text);
  return title ? [...tasks, { id: crypto.randomUUID(), title, completed: false }] : tasks;
}

// One baseline point, plus one point per independently working behavior.
export function getTaskScore(operations = { addTask, toggleTask, deleteTask, filterTasks }) {
  const checks = [
    ['Trim task titles (task-title.js)', () => {
      const created = operations.addTask([], '  Read  ');
      return created.length === 1 && created[0].title === 'Read'
        && operations.addTask([], '   ').length === 0;
    }],
    ['Toggle only the selected task (task-actions.js)', tasks => {
      const result = operations.toggleTask(tasks, 'one');
      const restored = operations.toggleTask(result, 'one');
      return same(result, [{ ...tasks[0], completed: true }, tasks[1]])
        && same(restored, tasks) && same(operations.toggleTask(tasks, 'missing'), tasks);
    }],
    ['Delete only the selected task (task-actions.js)', tasks =>
      same(operations.deleteTask(tasks, 'one'), [tasks[1]])
      && same(operations.deleteTask(tasks, 'missing'), tasks)],
    ['Filter active tasks (task-filter.js)', tasks =>
      same(operations.filterTasks(tasks, 'active'), [tasks[0]])
      && same(operations.filterTasks(tasks, 'completed'), [tasks[1]])
      && same(operations.filterTasks(tasks, 'all'), tasks)],
  ].map(([name, check]) => {
    const tasks = Object.freeze([
      Object.freeze({ id: 'one', title: 'Read', completed: false }),
      Object.freeze({ id: 'two', title: 'Walk', completed: true }),
    ]);
    try { return { name, passed: Boolean(check(tasks)) }; }
    catch { return { name, passed: false }; }
  });
  return { score: 1 + checks.filter(check => check.passed).length, total: 5, checks };
}

function same(actual, expected) {
  return JSON.stringify(actual) === JSON.stringify(expected);
}
