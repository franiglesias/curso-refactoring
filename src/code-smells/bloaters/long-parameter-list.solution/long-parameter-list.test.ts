import {describe, expect, it, vi} from 'vitest'
import {Author, DateRange, ReportGenerator, ReportGeneratorBuilder} from './long-parameter-list'

function formatConsoleCalls(spy: ReturnType<typeof vi.spyOn>) {
  return spy.mock.calls.map((call) => call.join(' ')).join('\n')
}

describe('Long Parameter List', () => {
  it('Generates a report', () => {
    const logSpy = vi.spyOn(console, 'log')

    const gen = new ReportGenerator()
    gen.generateReport(
      'Ventas Q1',
      new Date('2025-01-01'),
      new Date('2025-03-31'),
      true,
      false,
      'Pat Smith',
      'pat@example.com',
    )

    let output = formatConsoleCalls(logSpy)
    expect(output).toMatchSnapshot()
  })

  it('Generates a report with Value Objects', () => {
    const logSpy = vi.spyOn(console, 'log')

    const range = new DateRange(new Date('2025-01-01'), new Date('2025-03-31'))
    const author = new Author('Pat Smith', 'pat@example.com')
    const builder = new ReportGeneratorBuilder()
    const gen = builder.withCharts().withPageSize('A4').build()

    gen.generate('Ventas Q1', range, author)

    let output = formatConsoleCalls(logSpy)
    expect(output).toMatchSnapshot()
  })

  it('Generates a report with custom page Size', () => {
    const logSpy = vi.spyOn(console, 'log')

    const range = new DateRange(new Date('2025-01-01'), new Date('2025-03-31'))
    const author = new Author('Pat Smith', 'pat@example.com')
    const builder = new ReportGeneratorBuilder()
    const gen = builder.withCharts().withPageSize('A5').build()

    gen.generate('Ventas Q1', range, author)

    let output = formatConsoleCalls(logSpy)
    expect(output).toMatchSnapshot()
  })

  it('Generates a report using ReportContent object', () => {
    const logSpy = vi.spyOn(console, 'log')

    const builder = new ReportGeneratorBuilder()
    const content = {
      title: 'Updated Report',
      author: new Author('Jane Doe', 'jane@example.com'),
      range: new DateRange(new Date('2025-04-01'), new Date('2025-06-31')),
    }
    const gen = builder.withCharts().withPageSize('A5').build()

    gen.generateWithContent(content)

    let output = formatConsoleCalls(logSpy)
    expect(output).toMatchSnapshot()
  })
})
