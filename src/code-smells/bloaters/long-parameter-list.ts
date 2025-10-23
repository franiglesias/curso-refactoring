// Code smell: Long Parameter List [Lista de parámetros larga].
// Demasiados parámetros separados hacen las llamadas difíciles de leer
// y propensas a errores.
// Esto podría reemplazarse con un objeto de parámetros o un builder.

// Ejercicio: Añade dos opciones más (p. ej., locale y pageSize) al reporte.

// Tendrás que encadenar más argumentos a través de cada punto
// de llamada, aumentando la probabilidad de errores y
// dificultando cambios futuros.

// Refactor Introduce Parameter Object

type ReportParameters = {
  title: string,
  startDate: Date,
  endDate: Date,
  includeCharts: boolean,
  includeSummary: boolean,
  authorName: string,
  authorEmail: string,
  locale: string,
  pageSize: number,
}

type ReportOptions = {
  includeCharts: boolean,
  includeSummary: boolean,
  locale: string,
  pageSize: number,
}

type ReportContent = {
  title: string,
  startDate: Date,
  endDate: Date,
  authorName: string,
  authorEmail: string,
}

class ReportGenerator {
  private options: ReportOptions;

  constructor(
    options: ReportOptions,
  ) {
    this.options = options;
  }

  generateReport(
    params: ReportContent,
  ) {
    console.log(`Generando reporte: ${params.title}`)
    console.log(`Desde ${params.startDate.toDateString()} hasta ${params.endDate.toDateString()}`)
    console.log(`Autor: ${params.authorName} (${params.authorEmail})`)
    if (this.options.includeCharts) console.log('Incluyendo gráficos...')
    if (this.options.includeSummary) console.log('Incluyendo resumen...')
    console.log('Reporte generado exitosamente.')
  }
}

export function demoLongParameterList(): void {
  const options = {
    includeCharts: true,
    includeSummary: false,
    locale: 'es-ES',
    pageSize: 100,
  }

  const content = {
    title: 'Ventas Q1',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-03-31'),
    authorName: 'Pat Smith',
    authorEmail: 'pat@example.com',
  }
  const gen = new ReportGenerator(options)
  gen.generateReport(content)
}
