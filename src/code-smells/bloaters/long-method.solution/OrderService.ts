import {OrderDatabase} from "./OrderDatabase";
import {EmailSender} from "./EmailSender";
import {OrderPrinter} from "./OrderPrinter";
import {OrderIdProvider} from "./OrderIdProvider";
import {Order} from "./order/Order";
import {ValidatedOrder} from "./order/ValidatedOrder";

export class OrderService {
  private readonly orderDatabase: OrderDatabase
  private readonly emailSender: EmailSender
  private readonly printer: OrderPrinter
  private readonly idProvider: OrderIdProvider

  constructor(
    orderDatabase: OrderDatabase,
    emailSender: EmailSender,
    printer: OrderPrinter,
    idProvider: OrderIdProvider,
  ) {
    this.orderDatabase = orderDatabase
    this.emailSender = emailSender
    this.printer = printer
    this.idProvider = idProvider
  }

  process(order: Order) {
    let validatedOrder: ValidatedOrder
    try {
      validatedOrder = order.validate(this.idProvider)
    } catch (e) {
      console.error('Error al validar el pedido:', e)
      return
    }

    const processedOrder = validatedOrder.process()

    this.persistOrder(processedOrder)
    this.sendOrderConfirmationEmail(processedOrder)
    this.printOrder(processedOrder)
  }

  private printOrder(order: Order) {
    this.printer.print(order)
  }

  private sendOrderConfirmationEmail(order: Order) {
    this.emailSender.sendOrderConfirmationEmail(order)
  }

  private persistOrder(order: Order) {
    this.orderDatabase.persist(order)
  }
}
