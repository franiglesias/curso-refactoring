// Regla de calistenia: Entidades pequeñas (clases/métodos pequeños)
// Este archivo VIOLA intencionalmente la regla creando una clase grande que hace de todo.
// También incluye una propuesta de ejercicio para refactorizar hacia la regla.

// EJEMPLO DE VIOLACIÓN: Objeto dios con muchas responsabilidades
export class ReportService {
  // parseo, validación, formateo, E/S, cálculos y caché en una sola clase
  private cache: Map<string, string> = new Map()

  generateCsvReportFromJson(jsonInput: string, delimiter: string = ','): string {
    // parsear
    let data: unknown
    try {
      data = JSON.parse(jsonInput)
    } catch (e) {
      throw new Error('Invalid JSON')
    }

    // validar
    if (!Array.isArray(data)) {
      throw new Error('Expected array')
    }

    // calcular y formatear
    const headers = Object.keys(data[0] as any)
    const lines = [headers.join(delimiter)]
    for (const row of data as Array<Record<string, any>>) {
      const values = headers.map((h) => String(row[h] ?? ''))
      lines.push(values.join(delimiter))
    }
    const result = lines.join('\n')

    // responsabilidad de caché y E/S
    this.cache.set('last', result)
    // simular escritura a disco/red
    return result
  }
}

/*
Ejercicio (refactorizar hacia la regla):
- Dividir responsabilidades en entidades pequeñas y cohesivas:
  1) Parser (JsonReportParser), Validador (ReportSchema), Formateador (CsvFormatter), Repositorio (ReportStore), Servicio (ReportGenerator).
  2) Cada clase debe ser pequeña y enfocada; métodos <= 10 líneas donde sea posible.
  3) Reemplazar el delimitador primitivo con un tipo u objeto de configuración.
- Aceptación: No hay clase dios; el sistema se compone de entidades pequeñas y de propósito único.
*/
