import {Clock} from '../Clock'
import {OrderData} from '../order/Order'
import {PrintOrderDTO} from './PrintOrderDTO'
import {formatMoney, roundMoney} from '../long-method'

export class OrderToPrint {
  private readonly clock: Clock

  constructor(clock: Clock) {
    this.clock = clock
  }

  map(order: OrderData): PrintOrderDTO {
    return {
      title: 'Resumen del pedido',
      lines: order.items?.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        lineTotal: roundMoney(i.price * i.quantity),
        lineTotalFormatted: formatMoney(i.price * i.quantity),
      })),
      subtotal: order.subtotal ?? 0,
      discount: order.discount ?? 0,
      tax: order.tax ?? 0,
      shipping: order.shipping ?? 0,
      total: order.total ?? 0,
      currency: 'USD',
      formatted: {
        subtotal: formatMoney(order.subtotal),
        discount:
          order.discount && order.discount > 0 ? `-${formatMoney(order.discount)}` : formatMoney(0),
        tax: formatMoney(order.tax),
        shipping: formatMoney(order.shipping),
        total: formatMoney(order.total),
      },
      metadata: {
        customerEmail: order.customerEmail,
        createdAt: new Date().toISOString(),
      },
    } as unknown as PrintOrderDTO
  }

  protected getCurrentDate(): Date {
    return this.clock.getCurrentDate()
  }
}
