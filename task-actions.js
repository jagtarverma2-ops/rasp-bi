// Practice issue: only the selected task should change completion state.
export function toggleTask(tasks, id) {
  return tasks.map(task => ({ ...task, completed: !task.completed }));
}

// Practice issue: deleting a task should preserve all other tasks.
export function deleteTask(tasks, id) {
  return tasks.filter(task => task.id === id);
}
