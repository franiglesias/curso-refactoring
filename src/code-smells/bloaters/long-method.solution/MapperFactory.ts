import {Clock} from './Clock'

import {OrderToPrint} from './print/OrderToPrint'
import {OrderToDatabase} from './persistence/OrderToDatabase'
import {OrderToEmail} from './email/OrderToEmail'

export class MapperFactory {
  private readonly clock: Clock

  constructor(clock: Clock) {
    this.clock = clock
  }

  create(strategy: string) {
    if (strategy === 'database') {
      return new OrderToDatabase(this.clock)
    }
    if (strategy === 'email') {
      return new OrderToEmail(this.clock)
    }
    if (strategy === 'printer') {
      return new OrderToPrint(this.clock)
    }
    throw new Error(`No se soporta la estrategia ${strategy}`)
  }
}
