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
