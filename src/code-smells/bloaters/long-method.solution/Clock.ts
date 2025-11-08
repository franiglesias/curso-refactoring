export interface Clock {
  getCurrentDate(): Date
}

export class SystemClock implements Clock {
  getCurrentDate(): Date {
    return new Date()
  }
}

export class ClockStub implements Clock {
  private readonly currentDate: Date

  constructor(currentDate: Date) {
    this.currentDate = currentDate
  }

  getCurrentDate(): Date {
    return this.currentDate
  }
}
