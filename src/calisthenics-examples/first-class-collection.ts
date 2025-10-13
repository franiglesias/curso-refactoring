class Project {
  private tasks: TaskCollection = new TaskCollection();

  addTask(task: string): void {
    this.tasks.addTask(task);
  }

  getTasks(): string[] {
    return this.tasks.allTasks();
  }
}

class TaskCollection {
  private tasks: string[] = [];

  addTask(task: string): void {
    this.tasks.push(task);
  }

  allTasks(): string[] {
    return this.tasks;
  }
}
