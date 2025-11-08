import {Buffer} from 'node:buffer'
import {formatMoney} from './long-method'
import {Clock} from './Clock'
import {Order, OrderData, OrderRecordDTO} from './order/Order'
import {MapperFactory} from "./MapperFactory";

export class OrderDatabase {
  private readonly clock: Clock

  constructor(clock: Clock) {
    this.clock = clock
  }

  public persist(order: Order) {
    // Registrar en la base de datos (simulado)
    // Bloque gigantesco y sobrecargado para simular persistencia con múltiples pasos innecesarios
    const dbConnectionString = 'Server=fake.db.local;Database=orders;User=demo;Password=demo'
    const dbConnected = true // pretendemos que ya está conectado
    const dbRetriesMax = 3
    let dbRetries = 0

    const dbRecord = this.mapOrderToDto(order)

    // Validaciones redundantes antes de guardar
    const hasItems = Array.isArray(dbRecord.items) && dbRecord.items.length > 0
    const totalsConsistent =
      typeof dbRecord.amounts.total === 'number' && dbRecord.amounts.total >= 0
    if (!hasItems) {
      console.warn('[DB] No se puede guardar: el pedido no tiene items')
    }
    if (!totalsConsistent) {
      console.warn('[DB] No se puede guardar: total inconsistente')
    }
    const serialized = this.serialize(dbRecord)
    const payloadBytes = Buffer.byteLength(serialized, 'utf8')
    console.log(
      `[DB] Serializando registro ${dbRecord.id} (${payloadBytes} bytes) para ${dbConnectionString}`,
    )

    // Simular reintentos de escritura
    let dbSaved = false
    while (!dbSaved && dbRetries < dbRetriesMax) {
      dbRetries++
      if (!dbConnected) {
        console.log(`[DB] Intento ${dbRetries}/${dbRetriesMax}: reconectando a la base de datos...`)
      } else {
        console.log(
          `[DB] Intento ${dbRetries}/${dbRetriesMax}: guardando pedido ${dbRecord.id} con total ${formatMoney(order.total)}`,
        )
      }
      // Resultado aleatorio simulado, pero aquí siempre "exitoso" para no complicar flujos de prueba
      dbSaved = true
    }

    if (dbSaved) {
      console.log(`[DB] Pedido ${dbRecord.id} guardado correctamente`)
    } else {
      console.error(
        `[DB] No se pudo guardar el pedido ${dbRecord.id} tras ${dbRetriesMax} intentos`,
      )
    }

    // Auditoría/bitácora adicional innecesaria
    const auditLogEntry = {
      type: 'ORDER_SAVED',
      orderId: dbRecord.id,
      actor: 'system',
      at: this.getCurrentDate().toISOString(),
      metadata: {
        ip: '127.0.0.1',
        userAgent: 'OrderService/1.0',
      },
    }
    console.log('[AUDIT] Registro:', JSON.stringify(auditLogEntry))
  }

  protected getCurrentDate(): Date {
    return this.clock.getCurrentDate()
  }

  private serialize(dbRecord: OrderRecordDTO) {
    // Simular transformación/serialización pesada
    return JSON.stringify(dbRecord, null, 2)
  }

  private mapOrderToDto(order: Order): OrderRecordDTO {
    return order.representation<OrderRecordDTO>(new MapperFactory(this.clock), 'database')
  }
}

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
