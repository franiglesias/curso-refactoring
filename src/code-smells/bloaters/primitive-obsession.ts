class Order {
  constructor(
    private customerName: string,
    private customerEmail: string,
    private address: string,
    private totalAmount: number,
    private currency: string,
  ) {
  }

  sendInvoice() {
    if (!this.customerEmail.includes('@')) {
      throw new Error('Email inválido')
    }
    if (this.totalAmount <= 0) {
      throw new Error('El monto debe ser mayor que cero')
    }
    console.log(`Factura enviada a ${this.customerEmail} por ${this.totalAmount} ${this.currency}`)
  }
}
