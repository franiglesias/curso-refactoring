// Code smell: Long Parameter List. Too many separate parameters make calls hard to read
// and error-prone. This could be replaced with a parameter object or builder.

// Exercise: Add two more options (e.g., locale and pageSize) to the report.

// You'll have to thread more arguments through every call site, increasing the
// chance of mistakes and making future changes harder.

class ReportGenerator {
  generateReport(
    title: string,
    startDate: Date,
    endDate: Date,
    includeCharts: boolean,
    includeSummary: boolean,
    authorName: string,
    authorEmail: string,
  ) {
    console.log(`Generando reporte: ${title}`)
    console.log(`Desde ${startDate.toDateString()} hasta ${endDate.toDateString()}`)
    console.log(`Autor: ${authorName} (${authorEmail})`)
    if (includeCharts) console.log('Incluyendo gráficos...')
    if (includeSummary) console.log('Incluyendo resumen...')
    console.log('Reporte generado exitosamente.')
  }
}

export function demoLongParameterList(): void {
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
}
