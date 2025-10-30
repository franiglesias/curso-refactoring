import {ManagesAuthentication} from './ManagesAuthentication'

import {UserCredentials} from './UserCredentials'

export abstract class BaseManagesAuthentication implements ManagesAuthentication {
  protected lastLogin: Date | undefined
  protected loginAttempts: number = 0
  protected credentials: UserCredentials

  protected constructor(credentials: UserCredentials) {
    this.credentials = credentials
  }

  isLoggedIn(): boolean {
    return this.lastLogin !== undefined
  }

  login(password: string): void {
    if (this.credentials.passwordMatch(password)) {
      this.succeedLogin()
    } else {
      this.failedLogin()
    }
  }

  abstract succeedLogin(): void

  abstract otpLogin(otp: string): void

  resetPassword(newPassword: string): void {
    this.credentials = this.credentials.reset(newPassword)
    console.log('Contraseña actualizada')
  }

  protected successfullyLoggedIn() {
    this.lastLogin = new Date()
    this.loginAttempts = 0
    console.log('Inicio de sesión exitoso')
  }

  protected failedLogin() {
    this.lastLogin = undefined
    this.loginAttempts++
    console.log('Contraseña incorrecta')
  }
}
