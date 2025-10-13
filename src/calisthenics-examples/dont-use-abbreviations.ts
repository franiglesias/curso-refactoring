class Employee {
  private salary: number;
  private experience: number;

  constructor(salary: number, experience: number) {
    this.salary = salary;
    this.experience = experience;
  }

  calculateBonus(): number {
    if (this.experience > 5) {
      return this.salary * 0.2;
    }
    return this.salary * 0.1;
  }
}
