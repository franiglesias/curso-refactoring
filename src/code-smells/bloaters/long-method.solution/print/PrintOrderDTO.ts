import {OrderDTO} from '../order/Order'

export interface PrintOrderDTO extends OrderDTO {
  lines: {
    name: string
    lineTotal: number
    lineTotalFormatted: string
    quantity: number
  }[]
  title: string
  currency: string
  formatted: {
    subtotal: string
    discount: string
    tax: string
    shipping: string
    total: string
  }
  metadata: {
    customerEmail: string
    createdAt: string
  }
}
