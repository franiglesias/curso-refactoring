export interface OrderIdProvider {
  generateId(): number
}

export class RandomOrderIdProvider implements OrderIdProvider {
  generateId(): number {
    return Math.floor(Math.random() * 1000000)
  }
}

export class OrderIdProviderStub implements OrderIdProvider {
  private readonly id: number

  constructor(id: number) {
    this.id = id
  }

  generateId(): number {
    return this.id
  }
}
