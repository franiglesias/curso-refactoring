class Order {
  private items: { name: string; price: number; quantity: number }[] = []
  private discount: number = 0

  addItem(name: string, price: number, quantity: number): void {
    this.items.push({name, price, quantity})
  }

  setDiscount(discount: number): void {
    this.discount = discount
  }

  calculateTotal(): number {
    let total = 0
    for (const item of this.items) {
      total += item.price * item.quantity
    }
    return total - this.discount
  }

  printInvoice(): void {
    console.log('INVOICE')
    for (const item of this.items) {
      console.log(`${item.name} x${item.quantity}: $${item.price * item.quantity}`)
    }
    console.log(`Discount: $${this.discount}`)
    console.log(`Total: $${this.calculateTotal()}`)
  }
}
