// Code smell: Primitive Obsession [Obsesión por primitivos]. Conceptos de dominio (email, dinero, dirección) se modelan
// con primitivos crudos, esparciendo reglas de validación/formateo por todo el código.

// Ejercicio: Soporta múltiples monedas y valida direcciones por país.

// Terminarás encadenando strings y números con comprobaciones ad‑hoc por todas partes,
// haciendo que una característica simple requiera cambios amplios e inconsistentes.

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
