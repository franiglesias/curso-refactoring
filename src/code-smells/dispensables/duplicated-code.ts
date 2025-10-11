// Este archivo demuestra el code smell "Duplicated Code [Código duplicado]".
// Dos funciones abajo realizan la misma lógica con solo pequeñas diferencias en los nombres.

// Ejercicio: Cambia la regla de impuestos a escalonada (p. ej., 10% hasta $100 y 21% por encima).

// Tendrás que actualizar múltiples implementaciones duplicadas y recordar mantenerlas
// consistentes, mostrando cómo la duplicación multiplica el esfuerzo y el riesgo.

export function calculateOrderTotalWithTax(
  items: { price: number; qty: number }[],
  taxRate: number,
): number {
  let subtotal = 0
  for (const item of items) {
    subtotal += item.price * item.qty
  }
  const tax = subtotal * taxRate
  return subtotal + tax
}

// Versión duplicada con diferencias menores en nombres pero lógica idéntica.
export function computeCartTotalIncludingTax(
  products: { price: number; quantity: number }[],
  taxRate: number,
): number {
  let partial = 0
  for (const p of products) {
    partial += p.price * p.quantity
  }
  const tax = partial * taxRate
  return partial + tax
}

// Ejemplo de uso que (innecesariamente) llama a ambas implementaciones duplicadas
export function demoDuplicatedCode(): [number, number] {
  const itemsA = [
    {price: 10, qty: 2},
    {price: 5, qty: 3},
  ]
  const itemsB = [
    {price: 10, quantity: 2},
    {price: 5, quantity: 3},
  ]
  return [calculateOrderTotalWithTax(itemsA, 0.21), computeCartTotalIncludingTax(itemsB, 0.21)]
}
