// Code smell: Refused Bequest. Subclass inherits from a base type but overrides/ignores
// parts of the contract, indicating a wrong hierarchy or missing abstraction.

// Exercise: Add a "pause" lifecycle method required by all controllers and make
// start/stop mandatory.

// The ReadOnlyController will force awkward exceptions or
// no-op implementations, showing the cost of an ill-suited inheritance.

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
