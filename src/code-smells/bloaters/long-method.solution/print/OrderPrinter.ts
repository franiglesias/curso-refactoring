import {Clock} from '../Clock'
import {Buffer} from 'node:buffer'
import {formatMoney} from '../long-method'
import {PrintJobIdGenerator} from './PrintJobIdGenerator'
import {Order} from '../order/Order'
import {MapperFactory} from '../MapperFactory'
import {PrintOrderDTO} from './PrintOrderDTO'

export class OrderPrinter {
  private readonly clock: Clock
  private readonly printJobIdGenerator: PrintJobIdGenerator

  constructor(clock: Clock, printJobIdGenerator: PrintJobIdGenerator) {
    this.clock = clock
    this.printJobIdGenerator = printJobIdGenerator
  }

  public print(order: Order) {
    // Imprimir resumen -> enviar a impresora
    const printJob = order.representation<PrintOrderDTO>(new MapperFactory(this.clock), 'printer')

    // Simulación de envío a impresora: bloque deliberadamente grande y sobrecargado
    // Configuración de impresora (ficticia)
    const printerConfig = {
      name: 'Demo Thermal Printer TP-80',
      model: 'TP-80',
      dpi: 203,
      widthMm: 80,
      maxCharsPerLine: 42, // típico en papel de 80mm con fuente estándar
      interface: 'USB',
      driver: 'ESC/POS',
      location: 'Front Desk',
    }

    // Capabilities detectadas (simuladas)
    const printerCaps = {
      supportsBold: true,
      supportsUnderline: true,
      supportsQr: true,
      supportsBarcode: true,
      supportsImages: false,
      codepage: 'cp437',
    }

    // Conexión (simulada)
    const printerConn = {connected: true, retries: 0, maxRetries: 2}
    console.log(
      `[PRN] Preparando conexión a impresora ${printerConfig.name} (${printerConfig.interface}/${printerConfig.driver})`,
    )

    // Crear contenido del recibo
    const now = this.getCurrentDate()
    const lineWidth = printerConfig.maxCharsPerLine

    const padRight = (text: string, len: number) =>
      text.length >= len ? text.slice(0, len) : text + ' '.repeat(len - text.length)
    const padLeft = (text: string, len: number) =>
      text.length >= len ? text.slice(0, len) : ' '.repeat(len - text.length) + text
    const repeat = (ch: string, n: number) => new Array(n + 1).join(ch)

    const formatLine = (left: string, right: string) => {
      const leftTrim = left ?? ''
      const rightTrim = right ?? ''
      const space = Math.max(1, lineWidth - leftTrim.length - rightTrim.length)
      const spaces = repeat(' ', space)
      const tooLong = leftTrim.length + rightTrim.length > lineWidth
      if (tooLong) {
        // Si no cabe, forzamos salto para la izquierda y mantenemos derecha alineada
        return leftTrim + '\n' + padLeft(rightTrim, lineWidth)
      }
      return leftTrim + spaces + rightTrim
    }

    // Cabecera
    const receiptLines: string[] = []
    receiptLines.push(repeat('=', lineWidth))
    receiptLines.push(padRight('RESUMEN DEL PEDIDO', lineWidth))
    receiptLines.push(padRight(now.toLocaleString(), lineWidth))
    receiptLines.push(padRight(`Cliente: ${order.customerEmail}`, lineWidth))
    receiptLines.push(repeat('-', lineWidth))

    // Items
    for (const it of printJob.lines) {
      const left = `${it.quantity} x ${it.name}`
      const right = it.lineTotalFormatted
      receiptLines.push(formatLine(left, right))
    }

    // Totales
    receiptLines.push(repeat('-', lineWidth))
    receiptLines.push(formatLine('Subtotal', printJob.formatted.subtotal))
    if ((printJob.discount ?? 0) > 0) {
      receiptLines.push(formatLine('Descuento', `-${formatMoney(printJob.discount)}`))
    } else {
      receiptLines.push(formatLine('Descuento', printJob.formatted.discount))
    }
    receiptLines.push(formatLine('Impuestos', printJob.formatted.tax))
    receiptLines.push(formatLine('Envío', printJob.formatted.shipping))
    receiptLines.push(formatLine('TOTAL', printJob.formatted.total))
    receiptLines.push(repeat('=', lineWidth))

    // Pie con metadatos
    receiptLines.push(padRight(`Nº pedido: ${Math.abs((order.total ?? 0) * 1000) | 0}`, lineWidth))
    receiptLines.push(padRight(`Moneda: ${printJob.currency}`, lineWidth))
    receiptLines.push(padRight(`Creado: ${printJob.metadata.createdAt}`, lineWidth))

    // Comandos ESC/POS simulados (no operativos, solo logging)
    const escposCommands = [
      '[INIT]',
      '[ALIGN LEFT]',
      '[FONT A]',
      printerCaps.supportsBold ? '[BOLD ON]' : '[BOLD N/A]',
      '[PRINT LINES]',
      '[BOLD OFF]',
      '[CUT PARTIAL]',
    ]

    // Montar payload a imprimir
    const textPayload = receiptLines.join('\n') + '\n' + repeat('-', lineWidth) + '\n'
    const commandSection = escposCommands.join(' ')
    const printable = `\n${commandSection}\n${textPayload}`
    const spoolBuffer = Buffer.from(printable, 'utf8')
    const spoolBytes = Buffer.byteLength(printable, 'utf8')

    // Simulación de QR/barcode en el ticket (solo registro)
    const qrData = `ORDER|${order.customerEmail}|${printJob.total}|${now.getTime()}`
    if (printerCaps.supportsQr) {
      console.log(`[PRN] Agregando QR con datos: ${qrData}`)
    } else if (printerCaps.supportsBarcode) {
      console.log(`[PRN] Agregando BARCODE con datos: ${qrData.slice(0, 12)}`)
    } else {
      console.log('[PRN] Sin soporte para QR/BARCODE')
    }

    // Vista previa ASCII (limitada para no saturar logs)
    const preview = textPayload.split('\n').slice(0, 12).join('\n')
    console.log(
      '[PRN] Vista previa del recibo:\n' +
      preview +
      (receiptLines.length > 12 ? `\n...(${receiptLines.length - 12} líneas más)` : ''),
    )

    // Encolado de trabajo de impresión
    const printPriority = order.customerType === 'VIP' ? 'HIGH' : 'NORMAL'
    const printJobId = this.generatePrintJobId()
    console.log(
      `[PRN] Encolando trabajo ${printJobId} (${spoolBytes} bytes, prioridad=${printPriority}) en ${printerConfig.location}`,
    )

    // Envío en trozos (chunking) para simular buffer limitado de la impresora
    const chunkSize = 256 // bytes
    let sentBytes = 0
    let chunkIndex = 0
    let sentOk = true
    while (sentBytes < spoolBytes) {
      const remaining = spoolBytes - sentBytes
      const size = Math.min(chunkSize, remaining)
      const chunk = spoolBuffer.subarray(sentBytes, sentBytes + size)
      // Simular reintentos por chunk
      let attempts = 0
      let delivered = false
      while (!delivered && attempts < 2) {
        attempts++
        console.log(`[PRN] Enviando chunk #${chunkIndex} (${size} bytes) intento ${attempts}/2`)
        // Éxito simulado
        delivered = true
      }
      if (!delivered) {
        console.error(`[PRN] Fallo al enviar chunk #${chunkIndex}`)
        sentOk = false
        break
      }
      sentBytes += size
      chunkIndex++
    }

    // Resultado final de impresión
    if (printerConn.connected && sentOk) {
      console.log(
        `[PRN] Trabajo ${printJobId} impreso correctamente. Total enviado: ${sentBytes} bytes`,
      )
    } else {
      console.error(
        `[PRN] Error al imprimir trabajo ${printJobId}. Enviado: ${sentBytes}/${spoolBytes} bytes`,
      )
    }
  }

  protected generatePrintJobId() {
    return this.printJobIdGenerator.generate()
  }

  protected getCurrentDate(): Date {
    return this.clock.getCurrentDate()
  }
}
