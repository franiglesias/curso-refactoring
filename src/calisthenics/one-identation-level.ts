function processOrder(order: Order): void {
  if (order.isValid()) {
    if (!order.isPaid()) {
      if (order.hasStock()) {
        order.pay()
        console.log('Order processed successfully')
      } else {
        console.log('Out of stock')
      }
    } else {
      console.log('Order already paid')
    }
  } else {
    console.log('Invalid order')
  }
}
