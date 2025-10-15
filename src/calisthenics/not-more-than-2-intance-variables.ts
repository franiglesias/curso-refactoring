class Report {
  constructor(
    private title: string,
    private author: string,
    private content: string,
    private createdAt: Date,
    private tags: string[],
  ) {
  }

  printSummary(): void {
    console.log(`Report: ${this.title} by ${this.author} (${this.createdAt.toDateString()})`)
  }
}
