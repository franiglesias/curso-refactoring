import {ManagesProfile} from './ManagesProfile'

export class UserProfile implements ManagesProfile {
  private name: string
  private email: string

  constructor(name: string, email: string) {
    this.name = name
    this.email = email
  }

  updateEmail(newEmail: string): void {
    this.email = newEmail
    console.log('Correo actualizado')
  }

  updateName(newName: string): void {
    this.name = newName
    console.log('Nombre actualizado')
  }

  profile(): string {
    return `${this.name} <${this.email}>`
  }
}
