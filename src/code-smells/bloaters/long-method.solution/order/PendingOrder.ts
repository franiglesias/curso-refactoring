import {Order} from './Order'
import {OrderIdProvider} from '../OrderIdProvider'
import {ValidatedOrder} from './ValidatedOrder'
import {ProcessedOrder} from './ProcessedOrder'

import {MapperFactory} from "../MapperFactory";

export class PendingOrder implements Order {
  id: number
  customerEmail: string
  customerType: 'NORMAL' | 'VIP'
  items: { name: string; price: number; quantity: number }[]

  constructor(
    customerEmail: string,
    customerType: 'NORMAL' | 'VIP',
    items: { name: string; price: number; quantity: number }[],
  ) {
    this.id = 0
    this.customerEmail = customerEmail
    this.customerType = customerType
    this.items = items
  }

  validate(idProvider: OrderIdProvider): ValidatedOrder {
    if (!this.items || this.items.length === 0) {
      console.log('El pedido no tiene productos')
      throw new Error('El pedido no tiene productos')
    }

    for (const item of this.items) {
      if (item.price < 0 || item.quantity <= 0) {
        console.log('Producto inválido en el pedido')
        throw new Error('Producto inválido en el pedido')
      }
    }
    const id = idProvider.generateId()

    return new ValidatedOrder(id, this.customerEmail, this.customerType, this.items)
  }

  process(): ProcessedOrder {
    throw new Error('No se puede procesar un pedido pendiente')
  }

  representation<T>(factory: MapperFactory, strategy: string): T {
    throw new Error('No se puede representar un pedido pendiente')
  }
}
