class Address {
  constructor(private city: string) {
  }

  getCity(): string {
    return this.city
  }
}

class Customer {
  constructor(private address: Address) {
  }

  getAddress(): Address {
    return this.address
  }
}

class Order {
  constructor(private customer: Customer) {
  }

  getCustomer(): Customer {
    return this.customer
  }
}

const order = new Order(new Customer(new Address('Madrid')))
console.log(order.getCustomer().getAddress().getCity())
