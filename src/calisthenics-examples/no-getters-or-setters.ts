class BankAccount {
  private balance: number

  constructor(balance: number) {
    this.balance = balance
  }

  runningBalance(): number {
    return this.balance
  }

  deposit(amount: number): void {
    this.balance += amount
  }

  withdraw(amount: number): void {
    this.balance -= amount
  }
}

const account = new BankAccount(1000)
console.log('Balance: ', account.runningBalance())
account.withdraw(200)
console.log('Balance: ', account.runningBalance())
