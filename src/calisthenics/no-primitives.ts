class User {
  constructor(
    private name: string,
    private email: string,
  ) {
  }

  changeEmail(newEmail: string): void {
    if (!newEmail.includes('@')) {
      throw new Error('Invalid email')
    }
    this.email = newEmail
  }
}
