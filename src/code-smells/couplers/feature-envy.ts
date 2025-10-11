// Code smell: Feature Envy. ShippingCalculator reaches into Customer's data to make
// decisions, indicating the behavior may belong with Customer instead.

// Exercise: Add free shipping for customers in certain cities and a weekend surcharge.

// You'll likely keep adding conditions inside ShippingCalculator that depend on
// Customer internals, spreading rules in the wrong place and making changes brittle.

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
