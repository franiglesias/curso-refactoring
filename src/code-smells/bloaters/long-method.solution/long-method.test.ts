import {describe, expect, it, vi} from 'vitest'
import {ClockStub} from './Clock'
import {OrderDatabase} from './persistence/OrderDatabase'
import {EmailSender} from './email/EmailSender'
import {OrderPrinter} from './print/OrderPrinter'
import {PrintJobIdGeneratorStub} from './print/PrintJobIdGenerator'
import {OrderIdProviderStub} from './OrderIdProvider'
import {ItemCollection, Order} from './order/Order'
import {PendingOrder} from './order/PendingOrder'
import {OrderService} from './OrderService'

function formatConsoleCalls(spy: ReturnType<typeof vi.spyOn>) {
  return spy.mock.calls.map((call) => call.join(' ')).join('\n')
}

const hasShippingCosts: ItemCollection = [
  {
    name: 'Product 1',
    price: 12.05,
    quantity: 1,
  },
  {
    name: 'Another',
    price: 15.35,
    quantity: 1,
  },
]

const hasFreeShipping: ItemCollection = [
  {
    name: 'Product 1',
    price: 12.05,
    quantity: 3,
  },
  {
    name: 'Another',
    price: 15.35,
    quantity: 6,
  },
]

const hasNoItems: ItemCollection = []

const hasInvalidPrice: ItemCollection = [
  {
    name: 'Invalid',
    price: 0,
    quantity: 2,
  },
]

const hasInvalidQuantity: ItemCollection = [
  {
    name: 'Invalid',
    price: 5.45,
    quantity: 0,
  },
]

describe('long method', () => {
  describe.for(['NORMAL', 'VIP'])('Given a %s customer', (customerType: string) => {
    describe.for([
      {name: 'shipping costs', items: hasShippingCosts},
      {name: 'free shipping', items: hasFreeShipping},
      {name: 'no items', items: hasNoItems},
      {name: 'invalid price', items: hasInvalidPrice},
      {name: 'invalid quantity', items: hasInvalidQuantity},
    ])('When the order has $name', (example: { name: string; items: ItemCollection }) => {
      it('should process the order', () => {
        const logSpy = vi.spyOn(console, 'log')

        const o = {
          customerEmail: 'customer@example.com',
          customerType: customerType,
          items: example.items,
        } as Order

        const order = new PendingOrder(o.customerEmail, o.customerType, o.items)

        const clock = new ClockStub(new Date('2023-05-21T13:35'))
        const db = new OrderDatabase(clock)
        const emailSender = new EmailSender(clock)
        const jobIdGenerator = new PrintJobIdGeneratorStub('prn-1762191762553-125')
        const printer = new OrderPrinter(clock, jobIdGenerator)
        const idProvider = new OrderIdProviderStub(67234)
        const orderService = new OrderService(db, emailSender, printer, idProvider)
        orderService.process(order)

        let output = formatConsoleCalls(logSpy)
        expect(output).toMatchSnapshot()

        logSpy.mockRestore()
      })
    })
  })
})
