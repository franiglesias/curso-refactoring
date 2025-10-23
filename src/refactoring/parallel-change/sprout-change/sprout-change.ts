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
