class Address {
  constructor(private city: string) {
  }

  getCity(): string {
    return this.city;
  }
}

class Customer {
  constructor(private address: Address) {
  }

  getAddress(): Address {
    return this.address;
  }

  getCity(): string {
    return this.address.getCity();
  }
}

class Order {
  constructor(private customer: Customer) {
  }

  getCustomer(): Customer {
    return this.customer;
  }

  getCity(): string {
    return this.customer.getCity();
  }
}

const order = new Order(new Customer(new Address("Madrid")));
console.log(order.getCity());
