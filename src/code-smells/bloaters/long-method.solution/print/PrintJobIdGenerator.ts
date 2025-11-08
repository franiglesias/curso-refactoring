export interface PrintJobIdGenerator {
  generate(): string
}

export class SystemPrintJobIdGenerator implements PrintJobIdGenerator {
  generate(): string {
    return `prn-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }
}

export class PrintJobIdGeneratorStub implements PrintJobIdGenerator {
  private readonly jobId: string

  constructor(jobId: string) {
    this.jobId = jobId
  }

  generate(): string {
    return this.jobId
  }
}
