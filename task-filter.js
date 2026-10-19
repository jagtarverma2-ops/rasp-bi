// Practice issue: the active view should contain unfinished tasks.
export function filterTasks(tasks, filter) {
  if (filter === 'active') return tasks.filter(task => task.completed);
  if (filter === 'completed') return tasks.filter(task => task.completed);
  return tasks;
}
