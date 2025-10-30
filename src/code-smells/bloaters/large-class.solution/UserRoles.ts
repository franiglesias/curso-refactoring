import {ManagesRoles} from './ManagesRoles'

export class UserRoles implements ManagesRoles {
  private isAdmin: boolean

  constructor(isAdmin: boolean) {
    this.isAdmin = isAdmin
  }

  promoteToAdmin(): void {
    this.isAdmin = true
    console.log('Usuario promovido a administrador')
  }

  revokeAdmin(): void {
    this.isAdmin = false
    console.log('Usuario revocado de administrador')
  }

  canDoAnything(): boolean {
    return this.isAdmin
  }
}
