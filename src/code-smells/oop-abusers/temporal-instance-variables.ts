export class ReportBuilder {
  private title?: string | undefined
  private rangeStart?: Date | undefined
  private rangeEnd?: Date | undefined
  private buffer: string[] = []

  begin(title: string): void {
    this.title = title
    this.buffer = []
  }

  setRange(start: Date, end: Date): void {
    this.rangeStart = start
    this.rangeEnd = end
  }

  addLine(text: string): void {
    this.buffer.push(text)
  }

  finish(): string {
    const header = this.title ?? ''
    const range =
      this.rangeStart && this.rangeEnd
        ? `${this.rangeStart.toISOString()}..${this.rangeEnd.toISOString()}`
        : ''
    const body = this.buffer.join('\n')
    this.title = undefined
    this.rangeStart = undefined
    this.rangeEnd = undefined
    this.buffer = []
    return [header, range, body].filter(Boolean).join('\n')
  }
}
