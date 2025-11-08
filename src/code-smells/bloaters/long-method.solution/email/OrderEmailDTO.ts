import {OrderDTO} from '../order/Order'

export interface OrderEmailDTO extends OrderDTO {
  amounts: {
    subtotal: number | undefined
    discount: number | undefined
    tax: number | undefined
    shipping: number | undefined
    total: number | undefined
  }
  status: string
  createdAt: string
  updatedAt: string
  currency: string
}
