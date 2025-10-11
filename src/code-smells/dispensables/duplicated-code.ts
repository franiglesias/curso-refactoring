// This file demonstrates the "Duplicated Code" dispensable code smell.
// Two functions below perform the same logic with only tiny differences in naming.

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

// Duplicated version with minor naming differences but identical logic.
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
