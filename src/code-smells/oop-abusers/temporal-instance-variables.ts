// Code smell: Temporal Instance Variables. Fields are set only during a specific phase
// of an object's lifecycle, increasing the chance of misuse between phases.
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

// Example usage showing the required call order; misuse between phases is easy
export function demoTemporalInstanceVariables(): string {
  const b = new ReportBuilder()
  b.begin('Weekly Report')
  b.setRange(new Date('2025-10-01'), new Date('2025-10-07'))
  b.addLine('Line A')
  b.addLine('Line B')
  return b.finish()
}
