// Code smell: Refused Bequest [Herencia rechazada].
// Una subclase hereda de un tipo base pero sobrescribe/ignora
// partes del contrato, lo que indica una jerarquía equivocada
// o una abstracción faltante.

// Ejercicio: Añade un método de ciclo de vida "pause"
// requerido por todos los controladores y vuelve
// obligatorios start/stop.

// ReadOnlyController forzará excepciones incómodas o implementaciones no-op,
// mostrando el coste de una herencia mal planteada.

interface Resettable {
  reset(): void
}

interface Controller {
  start(): void

  stop(): void
}

class BaseController implements Controller, Resettable {
  start(): void {
    console.log('starting')
  }

  stop(): void {
    console.log('stopping')
  }

  reset(): void {
    console.log('resetting')
  }
}

export class ReadOnlyController implements Controller {
  start(): void {
  }

  stop(): void {
  }
}

export function demoRefusedBequest(readonly: boolean): void {
  const controller: Controller = readonly ? new ReadOnlyController() : new BaseController()
  controller.start()
  controller.stop()
}
