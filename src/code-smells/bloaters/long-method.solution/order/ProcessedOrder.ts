import {Order, OrderData} from './Order'
import {OrderIdProvider} from '../OrderIdProvider'
import {ValidatedOrder} from './ValidatedOrder'

import {MapperFactory} from '../MapperFactory'

export class ProcessedOrder implements Order {
  id: number
  customerEmail: string
  customerType: 'NORMAL' | 'VIP'
  items: { name: string; price: number; quantity: number }[]
  discount: number
  shipping: number
  subtotal: number
  tax: number
  total: number

  constructor(
    id: number,
    customerEmail: string,
    customerType: 'NORMAL' | 'VIP',
    items: { name: string; price: number; quantity: number }[],
    discount: number,
    shipping: number,
    subtotal: number,
    tax: number,
    total: number,
  ) {
    this.id = id
    this.customerEmail = customerEmail
    this.customerType = customerType
    this.items = items
    this.discount = discount
    this.shipping = shipping
    this.subtotal = subtotal
    this.tax = tax
    this.total = total
  }

  process(): ProcessedOrder {
    return this
  }

  validate(_idProvider: OrderIdProvider): ValidatedOrder {
    throw new Error('No se puede validar un pedido procesado')
  }

  representation<T>(factory: MapperFactory, strategy: string): T {
    const data = new OrderData(
      this.id,
      this.customerEmail,
      this.customerType,
      this.items,
      this.subtotal,
      this.discount,
      this.tax,
      this.shipping,
      this.total,
    )
    const mapper = factory.create(strategy)
    return mapper.map(data) as T
  }
}
