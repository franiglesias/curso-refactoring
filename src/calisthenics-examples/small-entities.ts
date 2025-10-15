class Order {
  private items: Items = new Items([])
  private discount: Discount = new Discount(0)

  addItem(name: string, price: number, quantity: number): void {
    this.items.addItem(name, price, quantity)
  }

  setDiscount(discount: number): void {
    this.discount = new Discount(discount)
  }

  calculateTotal(): number {
    const total = this.items.calculateTotal()
    return this.discount.applyTo(total)
  }

  printInvoice(): void {
    console.log('INVOICE')
    this.items.print()
    this.discount.print()
    console.log(`Total: $${this.calculateTotal()}`)
  }
}

class Item {
  constructor(
    private name: string,
    private price: number,
    private quantity: number,
  ) {
  }

  print(): void {
    console.log(`${this.name} x${this.quantity}: $${this.price * this.quantity}`)
  }

  amount() {
    return this.price * this.quantity
  }
}

class Items {
  constructor(private items: Item[]) {
  }

  addItem(name: string, price: number, quantity: number): void {
    this.items.push(new Item(name, price, quantity))
  }

  calculateTotal() {
    let total = 0
    for (const item of this.items) {
      total += item.amount()
    }
    return total
  }

  print(): void {
    for (const item of this.items) {
      item.print()
    }
  }
}

class Discount {
  constructor(private amount: number) {
  }

  print(): void {
    console.log(`Discount: $${this.amount}`)
  }

  applyTo(total: number) {
    return total - this.amount
  }
}
