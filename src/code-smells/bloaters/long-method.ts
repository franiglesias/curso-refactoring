// Code smell: Long Method [Método largo]. El método process mezcla validación, cálculo, descuentos,
// persistencia simulada, envío de emails e impresión en un solo bloque largo.
// Esto dificulta leerlo, probarlo y cambiar una parte sin arriesgar las demás.
//
// Exercise: Añade soporte de cupones con expiración y multi‑moneda (USD/EUR) con
// reglas de redondeo distintas.

// Verás que tienes que tocar múltiples secciones dentro de este método largo
// (validación, cálculo, descuentos, salida), aumentando el riesgo y el esfuerzo.

class OrderService {
  process(order: Order) {
    // Validar el pedido
    if (!order.items || order.items.length === 0) {
      console.log('El pedido no tiene productos')
      return
    }

    // Calcular total
    let total = 0
    for (const item of order.items) {
      total += item.price * item.quantity
    }

    // Aplicar descuento si el cliente es VIP
    if (order.customerType === 'VIP') {
      total *= 0.9
      console.log('Descuento VIP aplicado')
    }

    // Registrar en la base de datos (simulado)
    console.log(`Guardando pedido con total ${total}`)

    // Enviar correo de confirmación
    console.log(`Enviando correo a ${order.customerEmail}`)

    // Imprimir resumen
    console.log('Resumen del pedido:')
    for (const item of order.items) {
      console.log(`${item.name} x${item.quantity} = $${item.price * item.quantity}`)
    }

    console.log(`Total final: $${total}`)
  }
}

interface Order {
  customerEmail: string
  customerType: 'NORMAL' | 'VIP'
  items: { name: string; price: number; quantity: number }[]
}

// Ejemplo de uso que expone los problemas al usar esta clase tal cual:
// cambiar el cálculo o la salida obliga a reejecutar todo el flujo monolítico.
export function demoLongMethod(): void {
  const service = new OrderService()
  const order: Order = {
    customerEmail: 'cliente@example.com',
    customerType: 'VIP',
    items: [
      {name: 'Producto A', price: 10, quantity: 2},
      {name: 'Producto B', price: 5, quantity: 1},
    ],
  }
  service.process(order)
}
