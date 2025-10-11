// Code smell: Data Clump. The same group of data fields travels together through many
// places (name/street/city/zip), suggesting a missing Value Object and duplication.


// Exercise: Add state/province and international formatting rules.

// You'll need to alter constructors, printers, and any place that passes these fields together,
// multiplying the change surface.

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
