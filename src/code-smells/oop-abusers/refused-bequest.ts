// Code smell: Refused Bequest [Herencia rechazada]. Una subclase hereda de un tipo base pero sobrescribe/ignora
// partes del contrato, lo que indica una jerarquía equivocada o una abstracción faltante.

// Ejercicio: Añade un método de ciclo de vida "pause" requerido por todos los controladores y vuelve
// obligatorios start/stop.

// ReadOnlyController forzará excepciones incómodas o implementaciones no-op,
// mostrando el coste de una herencia mal planteada.

class BaseController {
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

export class ReadOnlyController extends BaseController {
  start(): void {
  }

  stop(): void {
  }

  reset(): void {
    throw new Error('operation not supported')
  }
}

export function demoRefusedBequest(readonly: boolean): void {
  const controller = readonly ? new ReadOnlyController() : new BaseController()
  controller.start()
  controller.stop()
}
