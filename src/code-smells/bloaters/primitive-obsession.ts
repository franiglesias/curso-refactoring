// Code smell: Primitive Obsession. Domain concepts (email, money, address) are modeled
// with raw primitives, scattering validation/formatting rules across the codebase.

// Exercise: Support multiple currencies and validate addresses by country.

// You'll end up threading strings and numbers with ad-hoc checks everywhere,
// making a simple feature require widespread, inconsistent changes.

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
