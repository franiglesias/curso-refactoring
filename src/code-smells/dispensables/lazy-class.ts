// Este archivo demuestra el code smell "Lazy Class [Clase perezosa]".

// Una clase que no aporta valor real: solo envuelve una operación trivial
// que podría ser una función. Mantenerla añade complejidad innecesaria.

// Ejercicio: Reescribir el código para poder deshacernos de la clase ShippingLabelBuilder.

export type Address = { name: string; line1: string; city?: string }

// Lazy class: podría ser reemplazada por una función
export class ShippingLabelBuilder {
  build(a: Address): string {
    return `${a.name} — ${a.line1}${a.city ? ', ' + a.city : ''}`
  }
}

// Example usage
export function printShippingLabel() {
  const address: Address = {
    name: 'John Doe',
    line1: '123 Main St',
    city: 'New York',
  }

  const labelBuilder = new ShippingLabelBuilder()
  const label = labelBuilder.build(address)
  console.log(label)
}
