class Report {
  constructor(
    private content: ReportContent,
    private metadata: ReportMetadata,
  ) {
  }

  printSummary(): void {
    let summary = `Report: {{title}} by {{author}} ({{createdAt}})`;
    summary = this.content.print(summary);
    summary = this.metadata.print(summary);
    console.log(summary);
  }
}

class ReportContent {
  constructor(
    private title: string,
    private content: string) {
  }

  print(template: string): string {
    return template.replace('{{title}}', this.title).replace('{{content}}', this.content);
  }
}

class ReportMetadata {
  constructor(
    private author: string,
    private createdAt: Date,
    private tags: string[]) {
  }

  print(template: string): string {
    return template.replace('{{author}}', this.author).replace('{{createdAt}}', this.createdAt.toDateString()).replace('{{tags}}', this.tags.join(', '));
  }
}

