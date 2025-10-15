function processOrder(order: Order): void {
  if (!order.isValid()) {
    console.log('Invalid order')
    return
  }
  if (order.isPaid()) {
    console.log('Order already paid')
    return
  }
  if (!order.hasStock()) {
    console.log('Out of stock')
    return
  }

  order.pay()
  console.log('Order processed successfully')
}
