import {OrderIdProvider} from '../OrderIdProvider'
import {ValidatedOrder} from './ValidatedOrder'
import {ProcessedOrder} from './ProcessedOrder'

import {MapperFactory} from '../MapperFactory'

export interface Order {
  id: number
  customerEmail: string
  customerType: 'NORMAL' | 'VIP'
  items: { name: string; price: number; quantity: number }[]
  subtotal?: number
  discount?: number
  tax?: number
  shipping?: number
  total?: number

  validate(idProvider: OrderIdProvider): ValidatedOrder

  process(): ProcessedOrder

  representation<T>(factory: MapperFactory, strategy: string): T
}

export interface Item {
  name: string
  price: number
  quantity: number
}

export type ItemCollection = Item[]

export class OrderData {
  public readonly id?: number
  public readonly customerEmail?: string
  public readonly customerType?: 'NORMAL' | 'VIP'
  public readonly items?: ItemCollection
  public readonly subtotal?: number
  public readonly discount?: number
  public readonly tax?: number
  public readonly shipping?: number
  public readonly total?: number

  constructor(
    id: number,
    customerEmail: string,
    customerType: 'NORMAL' | 'VIP',
    items: ItemCollection,
    subtotal: number,
    discount: number,
    tax: number,
    shipping: number,
    total: number,
  ) {
    this.id = id
    this.customerEmail = customerEmail
    this.customerType = customerType
    this.items = items
    this.subtotal = subtotal
    this.discount = discount
    this.tax = tax
    this.shipping = shipping
    this.total = total
  }
}

export interface OrderDTO {
  id: number
  customerEmail: string
  customerType: 'NORMAL' | 'VIP'
  items?: Item[]
  subtotal?: number
  discount?: number
  tax?: number
  shipping?: number
  total?: number
}
