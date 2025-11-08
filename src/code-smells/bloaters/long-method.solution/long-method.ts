// Code smell: Long Method [Método largo].
//
//  El método process mezcla validación, cálculo, descuentos,
// persistencia simulada, envío de emails e impresión en un solo bloque largo.
// Esto dificulta leerlo, probarlo y cambiar una parte sin arriesgar las demás.

// Exercise: Añade soporte de cupones con expiración y multi‑moneda (USD/EUR)
// con reglas de redondeo distintas.

// Verás que tienes que tocar múltiples secciones dentro de este método largo
// (validación, cálculo, descuentos, salida),
// aumentando el riesgo y el esfuerzo.

export function roundMoney(n: number, precision: number = 2): number {
  const factor = Math.pow(10, precision)
  return Math.round(n * factor) / factor
}

export function formatMoney(n: number | undefined): string {
  const v = typeof n === 'number' ? n : 0
  return `$${v.toFixed(2)}`
}

