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
