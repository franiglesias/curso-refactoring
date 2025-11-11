export class ReportGenerator {
  private configuration: ReportConfiguration

  constructor(configuration: ReportConfiguration = {includeCharts: false, includeSummary: false, pageSize: 'A4'}) {
    this.configuration = configuration
  }

  generateReport(
    title: string,
    startDate: Date,
    endDate: Date,
    includeCharts: boolean,
    includeSummary: boolean,
    authorName: string,
    authorEmail: string,
  ) {
    const range = new DateRange(startDate, endDate)
    const author = new Author(authorName, authorEmail)
    this.configuration = {
      includeCharts: includeCharts,
      includeSummary: includeSummary,
      pageSize: this.configuration.pageSize,
    }
    return this.generate(title, range, author)
  }

  generate(title: string, range: DateRange, author: Author, content?: ReportContent) {
    if (!content) {
      content = {
        title: title,
        range: range,
        author: author
      }
    }
    this.generateWithContent(content);
  }

  generateWithContent(content: ReportContent) {
    if (this.configuration.pageSize !== 'A4') {
      console.log(`Ajustando página a ${this.configuration.pageSize}...`);
    }
    console.log(`Generando reporte: ${content.title}`);
    console.log(content.range.print(`Desde {{startDate}} hasta {{endDate}}`))
    console.log(content.author.print(`Autor: {{name}} ({{email}})`))
    if (this.configuration.includeCharts) console.log('Incluyendo gráficos...')
    if (this.configuration.includeSummary) console.log('Incluyendo resumen...')
    console.log('Reporte generado exitosamente.')
  }
}

export interface ReportContent {
  title: string
  range: DateRange
  author: Author
  locale?: string
}

interface ReportConfiguration {
  includeCharts: boolean
  includeSummary: boolean
  pageSize: string
}

export class ReportGeneratorBuilder {
  private includeCharts: boolean = false
  private includeSummary: boolean = false
  private pageSize?: string

  withCharts(): ReportGeneratorBuilder {
    this.includeCharts = true
    return this
  }

  withoutCharts(): ReportGeneratorBuilder {
    this.includeCharts = false
    return this
  }

  withSummary(): ReportGeneratorBuilder {
    this.includeSummary = true
    return this
  }

  withoutSummary(): ReportGeneratorBuilder {
    this.includeSummary = false
    return this
  }

  withPageSize(pageSize: string): ReportGeneratorBuilder {
    this.pageSize = pageSize
    return this
  }

  build(): ReportGenerator {
    if (!this.pageSize) {
      throw new Error('PageSize is required. Use withPageSize(\'A4\').')
    }
    const configuration = {
      includeCharts: this.includeCharts,
      includeSummary: this.includeSummary,
      pageSize: this.pageSize
    }
    return new ReportGenerator(configuration)
  }
}

export class DateRange {
  private startDate: Date
  private endDate: Date

  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate
    this.endDate = endDate
  }

  print(template: string): string {
    return template
      .replace('{{startDate}}', this.startDate.toDateString())
      .replace('{{endDate}}', this.endDate.toDateString())
  }
}

export class Author {
  private name: string
  private email: string

  constructor(name: string, email: string) {
    this.name = name
    this.email = email
  }

  print(template: string): string {
    return template.replace('{{name}}', this.name).replace('{{email}}', this.email)
  }
}
