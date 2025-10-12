// Code smell: Data Clump [Grupo de datos].
// El mismo grupo de campos de datos viaja junto por muchos lugares,
// lo que sugiere un Value Object faltante y duplicación.

// Ejercicio: Añade país/provincia y reglas de formateo internacional.

// Necesitarás modificar constructores, impresores y cualquier lugar que pase estos campos juntos,
// multiplicando la superficie de cambio.

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
