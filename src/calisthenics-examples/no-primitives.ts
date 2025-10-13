class User {
  constructor(
    private name: string,
    private email: Email
  ) {
  }

  changeEmail(newEmail: string): void {
    this.email = new Email(newEmail);
  }
}

class Email {
  private email: string

  constructor(email: string) {
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }
    this.email = email
  }
}
