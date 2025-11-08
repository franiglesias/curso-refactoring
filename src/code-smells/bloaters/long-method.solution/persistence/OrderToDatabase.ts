import {Clock} from '../Clock'
import {OrderData} from '../order/Order'
import {OrderRecordDTO} from './OrderRecordDTO'

export class OrderToDatabase {
  private readonly clock: Clock

  constructor(clock: Clock) {
    this.clock = clock
  }

  map(order: OrderData): OrderRecordDTO {
    const dbNow = this.getCurrentDate()

    return {
      id: order.id!,
      customerEmail: order.customerEmail!,
      customerType: order.customerType!,
      items: order.items,
      amounts: {
        subtotal: order.subtotal,
        discount: order.discount,
        tax: order.tax,
        shipping: order.shipping,
        total: order.total,
      },
      status: 'PENDING',
      createdAt: dbNow.toISOString(),
      updatedAt: dbNow.toISOString(),
      currency: 'USD',
    } as OrderRecordDTO
  }

  protected getCurrentDate(): Date {
    return this.clock.getCurrentDate()
  }
}
