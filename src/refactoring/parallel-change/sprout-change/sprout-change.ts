// Técnica de refactorización: Cambio en Paralelo mediante Sprout
// Propósito: Practicar la introducción de nuevo comportamiento añadiendo (haciendo brotar) código nuevo,
// manteniendo el código antiguo funcionando para poder migrar los puntos de llamada de forma gradual y segura.
//
// Escenario: Tenemos una función de total de checkout con reglas de impuestos embebidas en línea. El producto
// quiere introducir políticas de impuestos por región (estándar y reducida), pero no debemos romper el
// comportamiento existente. Practicaremos haciendo brotar una nueva abstracción (TaxPolicy) y enrutar hacia ella
// de forma incremental.
//
// Implementación ingenua actual (intencionalmente rígida):
export type CartItem = {
  id: string
  price: number
  qty: number
  category?: 'general' | 'books' | 'food'
}
export type Region = 'US' | 'EU'

// Regla existente: un único impuesto plano por región; los libros y la comida están exentos en la UE
// (reglas embebidas en línea)
export function calculateTotal(cart: CartItem[], region: Region): number {
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0)

  let tax = 0
  if (region === 'US') {
    tax = subtotal * 0.07 // 7% plano
  } else if (region === 'EU') {
    // exenciones ingenuas en línea
    const taxable = cart
      .filter((it) => it.category !== 'books' && it.category !== 'food')
      .reduce((s, it) => s + it.price * it.qty, 0)
    tax = taxable * 0.2 // 20% plano solo sobre los ítems gravables
  }

  return roundCurrency(subtotal + tax)
}

export function roundCurrency(amount: number): number {
  return Math.round(amount * 100) / 100
}

// Uso de ejemplo, mantenido simple para estudiantes
export function demoSprout(): number {
  const cart: CartItem[] = [
    {id: 'p1', price: 10, qty: 2, category: 'general'},
    {id: 'b1', price: 20, qty: 1, category: 'books'},
  ]
  return calculateTotal(cart, 'EU')
}

/*
Ejercicio: Cambio en Paralelo usando SPROUT
Objetivo: Introducir estrategias de política de impuestos sin romper el comportamiento actual.

Pasos (idealmente con un commit entre cada paso):
1) Haz brotar un nuevo concepto TaxPolicy (interfaz o tipo) con un método compute(cart):number. NO cambies aún calculateTotal.
   - Crea ejemplos StandardTaxPolicy y ReducedTaxPolicy.
   - Mantenlos sin usar al principio (build en verde).
2) Añade un parámetro opcional a calculateTotal: opts?: { policy?: TaxPolicy }. Por defecto, usa el comportamiento actual si no se proporciona.
   - Cuando opts.policy esté presente, delega el cálculo de impuestos en él; de lo contrario, conserva la lógica embebida.
3) Crea una política adaptadora que reproduzca el comportamiento actual (LegacyInlineTaxPolicy) para demostrar paridad.
   - Úsala desde demoSprout para validar que no hay cambio de comportamiento.
4) Migra los puntos de llamada (aquí solo demoSprout) para pasar una política.
   - Primero pasa LegacyInlineTaxPolicy para mantener el comportamiento.
   - Luego cambia a las políticas Standard/Reduced según convenga.
5) Finalmente, elimina las ramas de impuesto en línea de calculateTotal una vez que todos los puntos de llamada usen una política.
   - Aceptación: calculateTotal delega completamente a una TaxPolicy; la lógica antigua se elimina.

Criterios de aceptación:
- Todos los totales permanecen numéricamente idénticos hasta que la migración (paso 4, segundo punto) los cambie intencionalmente.
- No deben fallar los tipos de TypeScript; los nombres y responsabilidades son claros.
- El archivo documenta los pasos de sprout mediante commits o comentarios.
*/
