// Temporal Instance Variables [Variables de instancia temporales].
//
// PizzaOrder shows a strict temporal sequence
// start(size) -> addTopping() -> setDeliveryAddress() -> place()
// The object keeps temporary state that is only valid between start() and place().

export class PizzaOrder {
  private size?: 'S' | 'M' | 'L'
  private toppings: string[] = []
  private address?: string

  // Must be called first
  start(size: 'S' | 'M' | 'L') {
    this.size = size
    this.toppings = []
    this.address = this.address // keep previous address if any (another temporal coupling pitfall)
  }

  addTopping(topping: string) {
    // Implicit temporal coupling: requires start() before addTopping()
    if (!this.size) {
      // In real life this might silently fail or throw.
      // Here we just no-op to keep the demo simple.
      return
    }
    this.toppings.push(topping)
  }

  setDeliveryAddress(address: string) {
    this.address = address
  }

  // Ends the session and resets the internal state (temporal variables)
  place(): string {
    const summary = `Pizza ${this.size ?? '?'} to ${this.address ?? 'UNKNOWN'} with [${this.toppings.join(', ')}]`
    // Reset all temporal state — another hint of the smell
    this.size = undefined
    this.address = undefined
    this.toppings = []
    return summary
  }
}


// Clear example flow for PizzaOrder showing correct temporal sequence
export function demoPizzaOrder(): string {
  const o = new PizzaOrder()
  o.start('L')
  o.addTopping('pepperoni')
  o.addTopping('mushroom')
  o.setDeliveryAddress('123 Main St')
  return o.place()
}

