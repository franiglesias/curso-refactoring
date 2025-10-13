import {describe, expect, it} from 'vitest'
import {generateOrder, ReceiptPrinter} from './golden-master'

describe('Receipt Printer', () => {
  it('should generate a golden master', () => {
    const printer = new ReceiptPrinter()

    // Combinations of

    const customers = ['Ana', 'Luis', 'Mar', 'Iván', 'Sofía']
    const items = [1, 2, 3, 4, 5]
    const quantities = [1, 3, 10, 25, 300]

    let receipts = []
    let counter = 0
    for (const customer of customers) {
      for (const i of items) {
        for (const quantity of quantities) {
          counter = counter + 1
          const pedido = generateOrder('ORD-' + counter.toString(), customer, i, quantity)
          const receipt = printer.print(pedido)
          receipts.push(receipt)
        }
      }
    }

    console.log(`Generated ${receipts.length} receipts`)

    expect(receipts.join(`\n==================\n`)).matchSnapshot()
  })
})
