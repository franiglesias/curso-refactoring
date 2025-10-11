// Code smell: Temporal Instance Variables [Variables de instancia temporales]. Los campos se configuran solo durante
// una fase específica del ciclo de vida de un objeto, aumentando la probabilidad de mal uso entre fases.

// Ejercicio: Añade una función de auto-guardado que pueda llamarse en cualquier momento.

// Necesitarás manejar estados donde title/range/buffer puedan estar medio inicializados,
// revelando cómo el acoplamiento temporal complica cambios aparentemente simples.

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
