class BankAccount {
  private balance: number

  constructor(balance: number) {
    this.balance = balance
  }

  getBalance(): number {
    return this.balance
  }

  setBalance(amount: number): void {
    this.balance = amount
  }
}

const account = new BankAccount(1000)
const current = account.getBalance()
account.setBalance(current - 200)
