import {describe, expect, it} from 'vitest'
import {demoPizzaOrder, demoPizzaOrderSolved, ReportBuilder} from './temporal-instance-variables'
import {PizzaOrder} from './temporal-instance-pizza'
import {PizzaOrderSolved} from './temporal-instance-pizza-solved'

describe('Temporal Instance Variables', () => {
  it('ReportBuilder demo still works', () => {
    const b = new ReportBuilder()
    // Misuse: calling addLine before begin() is silently accepted but leads to odd state
    b.addLine('Line A')
    b.addLine('Line B')
    b.setRange(new Date('2025-10-01'), new Date('2025-10-07'))
    const out = b.finish()
    expect(typeof out).toBe('string')
  })

  it('PizzaOrder provides a clearer example', () => {
    const result = demoPizzaOrder()
    expect(result).toContain('Pizza L')
    expect(result).toContain('pepperoni')
    expect(result).toContain('mushroom')
    expect(result).toContain('123 Main St')
  })

  it('PizzaOrder shows temporal coupling misuse (no start -> no toppings added)', () => {
    const o = new PizzaOrder()
    // Forgot to start the order
    o.addTopping('olive')
    o.setDeliveryAddress('Somewhere')
    const res = o.place()
    expect(res).toContain('Pizza ?') // size unknown because start() was never called
    expect(res).toContain('with []') // toppings were not added due to missing start()
  })

  it('Solved PizzaOrder eliminates temporal coupling', () => {
    const result = demoPizzaOrderSolved()
    expect(result).toContain('Pizza L')
    expect(result).toContain('pepperoni')
    expect(result).toContain('mushroom')
    expect(result).toContain('123 Main St')
  })

  it('Solved version is safe to use without a specific call order and can be immutable', () => {
    const base = new PizzaOrderSolved({size: 'M', address: '456 Side St'})
    const withPep = base.withTopping('pepperoni')
    const withPepAndMush = withPep.withTopping('mushroom')

    // Base remains unchanged (immutability)
    expect(base.place()).toContain('with []')

    // Intermediate contains pepperoni
    expect(withPep.place()).toContain('with [pepperoni]')

    // Final contains both
    const res = withPepAndMush.place()
    expect(res).toContain('Pizza M')
    expect(res).toContain('456 Side St')
    expect(res).toContain('pepperoni')
    expect(res).toContain('mushroom')
  })
})
