import {Clock} from '../Clock'
import {Buffer} from 'node:buffer'
import {formatMoney} from '../long-method'
import {Order} from '../order/Order'
import {MapperFactory} from '../MapperFactory'
import {OrderEmailDTO} from './OrderEmailDTO'

export class EmailSender {
  private readonly clock: Clock

  constructor(clock: Clock) {
    this.clock = clock
  }

  public sendOrderConfirmationEmail(order: Order) {
    // Enviar correo de confirmación
    // Bloque gigantesco para simular el envío de un correo con plantillas, adjuntos, y seguimiento
    const smtpConfig = {
      host: 'smtp.fake.local',
      port: 587,
      secure: false,
      auth: {user: 'notifier', pass: 'notifier'},
      tls: {rejectUnauthorized: false},
    }
    const emailTemplate = `
      Hola,
      Gracias por tu pedido. Aquí tienes el resumen:\n
      Subtotal: ${formatMoney(order.subtotal)}\n
      Descuento: ${order.discount && order.discount > 0 ? '-' + formatMoney(order.discount) : formatMoney(0)}\n
      Impuestos: ${formatMoney(order.tax)}\n
      Envío: ${formatMoney(order.shipping)}\n
      Total: ${formatMoney(order.total)}\n

      Nº de pedido: ${order.id}\n
      Fecha: ${new Date().toLocaleString()}\n

      Saludos,
      Equipo Demo
    `
    const trackingPixelUrl = `https://tracker.fake.local/pixel?orderId=${order.id}&t=${Date.now()}`
    const emailBodyHtml = `
      <html>
        <body>
          <p>Hola,</p>
          <p>Gracias por tu pedido. Aquí tienes el resumen:</p>
          <ul>
            <li>Subtotal: <strong>${formatMoney(order.subtotal)}</strong></li>
            <li>Descuento: <strong>${order.discount && order.discount > 0 ? '-' + formatMoney(order.discount) : formatMoney(0)}</strong></li>
            <li>Impuestos: <strong>${formatMoney(order.tax)}</strong></li>
            <li>Envío: <strong>${formatMoney(order.shipping)}</strong></li>
            <li>Total: <strong>${formatMoney(order.total)}</strong></li>
          </ul>
          <p>Nº de pedido: <code>${order.id}</code></p>
          <p>Fecha: ${new Date().toLocaleString()}</p>
          <img src="${trackingPixelUrl}" width="1" height="1" alt=""/>
        </body>
      </html>
    `
    const serializedForEmail = this.serialize(this.mapOrderToDto(order))
    const attachments = [
      {
        filename: `pedido-${order.id}.json`,
        content: serializedForEmail,
        contentType: 'application/json',
      },
      {filename: 'terminos.txt', content: 'Términos y condiciones...', contentType: 'text/plain'},
    ]

    // Simular cálculo de tamaño del correo
    const emailSize =
      Buffer.byteLength(emailBodyHtml, 'utf8') +
      attachments.reduce((acc, a) => acc + Buffer.byteLength(a.content, 'utf8'), 0)
    console.log(
      `[MAIL] Preparando correo (${emailSize} bytes) vía ${smtpConfig.host}:${smtpConfig.port}`,
    )

    // Simular colas de envío y priorización
    const emailPriority = order.customerType === 'VIP' ? 'HIGH' : 'NORMAL'
    console.log(`[MAIL] Encolando correo (${emailPriority}) para ${order.customerEmail}`)

    // Simular envío con reintentos
    let mailAttempts = 0
    const mailAttemptsMax = 2
    let mailSent = false
    while (!mailSent && mailAttempts < mailAttemptsMax) {
      mailAttempts++
      console.log(
        `[MAIL] Intento ${mailAttempts}/${mailAttemptsMax}: enviando correo a ${order.customerEmail}`,
      )
      // Simulación simple de éxito
      mailSent = true
    }

    const messageId = `msg-${order.id}-${this.getCurrentDate().getTime()}`
    if (mailSent) {
      console.log(`[MAIL] Correo enviado a ${order.customerEmail} (messageId=${messageId})`)
    } else {
      console.error(
        `[MAIL] Fallo al enviar correo a ${order.customerEmail} tras ${mailAttemptsMax} intentos`,
      )
    }
  }

  private serialize(orderEmailDTO: OrderEmailDTO) {
    // Simular transformación/serialización pesada
    return JSON.stringify(orderEmailDTO, null, 2)
  }

  private mapOrderToDto(order: Order) {
    return order.representation<OrderEmailDTO>(new MapperFactory(this.clock), 'email')
  }

  private getCurrentDate() {
    return this.clock.getCurrentDate()
  }
}
