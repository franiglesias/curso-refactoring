class Invoice {
  constructor(
    private customerName: string,
    private customerStreet: string,
    private customerCity: string,
    private customerZip: string,
  ) {
  }

  print(): void {
    console.log(`Factura para: ${this.customerName}`)
    console.log(`Dirección: ${this.customerStreet}, ${this.customerCity}, ${this.customerZip}`)
  }
}

class ShippingLabel {
  constructor(
    private customerName: string,
    private customerStreet: string,
    private customerCity: string,
    private customerZip: string,
  ) {
  }

  print(): void {
    console.log(`Enviar a: ${this.customerName}`)
    console.log(`${this.customerStreet}, ${this.customerCity}, ${this.customerZip}`)
  }
}
