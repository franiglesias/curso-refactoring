import {Clock} from "./Clock";
import {OrderToDatabase} from "./OrderDatabase";
import {OrderToEmail} from "./EmailSender";
import {OrderToPrint} from "./OrderPrinter";

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
