import {Order} from './Order'
import {OrderIdProvider} from '../OrderIdProvider'
import {roundMoney} from '../long-method'
import {ProcessedOrder} from './ProcessedOrder'
import {MapperFactory} from "../MapperFactory";

export class ValidatedOrder implements Order {
  id: number
  customerEmail: string
  customerType: 'NORMAL' | 'VIP'
  items: { name: string; price: number; quantity: number }[]

  constructor(
    id: number,
    customerEmail: string,
    customerType: 'NORMAL' | 'VIP',
    items: { name: string; price: number; quantity: number }[],
  ) {
    this.id = id
    this.customerEmail = customerEmail
    this.customerType = customerType
    this.items = items
  }

  validate(_idProvider: OrderIdProvider): ValidatedOrder {
    return this
  }

  process(): ProcessedOrder {
    // Constantes de negocio (simples por ahora)
    const TAX_RATE = 0.21 // 21% IVA
    const FREE_SHIPPING_THRESHOLD = 50
    const SHIPPING_FLAT = 5

    // Calcular subtotal
    let subtotal = 0
    for (const item of this.items) {
      subtotal += item.price * item.quantity
    }

    // Descuento por cliente VIP (10% del subtotal)
    let discount = 0
    if (this.customerType === 'VIP') {
      discount = roundMoney(subtotal * 0.1)
      console.log('Descuento VIP aplicado')
    }

    // Base imponible
    const taxable = Math.max(0, subtotal - discount)

    // Impuestos
    const tax = roundMoney(taxable * TAX_RATE)

    // Envío
    const shipping = taxable >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT

    // Total
    const total = roundMoney(taxable + tax + shipping)

    return new ProcessedOrder(
      this.id,
      this.customerEmail,
      this.customerType,
      this.items,
      discount,
      shipping,
      roundMoney(subtotal),
      tax,
      total,
    )
  }

  representation<T>(factory: MapperFactory, strategy: string): T {
    throw new Error('No se puede representar un pedido no procesado')
  }
}
