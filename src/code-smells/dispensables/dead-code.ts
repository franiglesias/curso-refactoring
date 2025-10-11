// Code smell: Dead Code [Código muerto]. Las declaraciones no utilizadas y las sentencias inalcanzables añaden ruido
// y coste de mantenimiento sin contribuir al comportamiento.

// Ejercicio: Arregla un bug en activeFunction (p. ej., cambia el manejo de negativos),

// Observa cómo el código muerto cercano dificulta razonar sobre lo que realmente se ejecuta,
// invitando a errores u omisiones de limpieza durante tu cambio.
const THE_ANSWER_TO_EVERYTHING = 42

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export function activeFunction(value: number): number {
  if (value < 0) {
    return 0
    const neverRuns = value * -1
    console.log('This will never be printed', neverRuns)
  }

  const temp = value * 2

  return value + 1
}

// Ejemplo de uso llamando a la función activa; las partes muertas de arriba siguen en el archivo
export function demoDeadCode(): string {
  const result = activeFunction(5)
  return formatCurrency(result)
}
