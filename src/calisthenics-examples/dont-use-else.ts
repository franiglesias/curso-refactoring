function categorizeUser(age: number): string {
  if (age < 13) {
    return 'child'
  }

  if (age < 18) {
    return 'teenager'
  }

  return 'adult'
}

abstract class User {
}

class ChildUser extends User {
}

class TeenagerUser extends User {
}

class AdultUser extends User {
}

class UserFactory {
  create(age: number): User {
    if (age < 13) {
      return new ChildUser()
    }

    if (age < 18) {
      return new TeenagerUser()
    }

    return new AdultUser()
  }
}
