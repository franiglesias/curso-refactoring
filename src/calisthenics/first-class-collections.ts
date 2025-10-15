class Project {
  private tasks: string[] = [];

  addTask(task: string): void {
    this.tasks.push(task);
  }

  getTasks(): string[] {
    return this.tasks;
  }
}

const project = new Project();
project.addTask("Design UI");
project.getTasks().push("Hack the system”);

