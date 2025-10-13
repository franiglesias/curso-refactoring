// Regla de calistenia: Un solo nivel de indentación por método

// EJEMPLO DE VIOLACIÓN: Múltiples bloques if/for anidados (3+ niveles)
export function processOrdersWithDiscounts(
  orders: Array<{ id: string; items: Array<{ price: number }>; customer: { isVip: boolean } }>,
): number {
  let total = 0
  for (const order of orders) {
    // nivel 1
    if (order.items && order.items.length > 0) {
      // nivel 2
      for (const item of order.items) {
        // nivel 3
        if (order.customer && order.customer.isVip) {
          // nivel 4
          if (item.price > 100) {
            // nivel 5
            total += item.price * 0.8 // gran descuento VIP
          } else {
            total += item.price * 0.9 // pequeño descuento VIP
          }
        } else {
          if (item.price > 100) {
            total += item.price * 0.95 // gran descuento regular
          } else {
            total += item.price // sin descuento
          }
        }
      }
    }
  }
  return total
}

/*
Ejercicio (refactorizar hacia la regla):
- Objetivo: Reducir a un solo nivel de indentación por función.
- Pasos:
  1) Introducir cláusulas de guarda: retornar temprano cuando orders esté vacío, cuando un pedido no tenga items, etc.
  2) Extraer funciones: priceWithVipDiscount, priceWithRegularDiscount, isVipCustomer.
  3) Reemplazar cadenas de if anidados con polimorfismo o un mapa de estrategias (p. ej., DiscountPolicy).
  4) Aplanar bucles: usar map/reduce cuando sea apropiado para evitar anidamiento.
- Aceptación: Ningún cuerpo de función debe tener más de un bloque de indentación.
*/
