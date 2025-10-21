// Code smell: Feature Envy [Envidia de características].
// ShippingCalculator se mete en los datos de Customer para tomar
// decisiones, lo que indica que el comportamiento quizá debería
// pertenecer a Customer.

// Ejercicio: Añade envío gratis para clientes en ciertas ciudades
// y un recargo de fin de semana.

// Probablemente seguirás añadiendo condiciones dentro
// de ShippingCalculator que dependen de
// detalles internos de Customer, esparciendo reglas
// en el lugar equivocado y volviendo frágiles los cambios.

export class Customer {
  constructor(
    public name: string,
    public street: string,
    public city: string,
    public zip: string,
  ) {
  }
}

export class ShippingCalculator {
  cost(customer: Customer): number {
    const base = customer.zip.startsWith('9') ? 10 : 20
    const distant = customer.city.length > 6 ? 5 : 0
    return base + distant
  }
}

export function demoFeatureEnvy(c: Customer): number {
  return new ShippingCalculator().cost(c)
}
