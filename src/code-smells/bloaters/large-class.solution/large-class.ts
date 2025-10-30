import {ManagesAuthentication} from './ManagesAuthentication'
import {AuthenticateUser} from './AuthenticateUser'
import {ManagesProfile} from './ManagesProfile'
import {UserProfile} from './UserProfile'
import {ManagesNotifications} from './ManagesNotifications'
import {UserNotifications} from './UserNotifications'
import {ManagesRoles} from './ManagesRoles'
import {UserRoles} from './UserRoles'
import {UserCredentials} from './UserCredentials'

export class UserAccount
  implements ManagesAuthentication, ManagesProfile, ManagesNotifications, ManagesRoles {
  private userCredentials: UserCredentials
  private authenticator: ManagesAuthentication
  private userProfile: ManagesProfile
  private userNotifications: ManagesNotifications
  private userRoles: ManagesRoles

  constructor(name: string, email: string, password: string, isAdmin: boolean = false) {
    this.userCredentials = new UserCredentials(email, password)
    this.authenticator = new AuthenticateUser(this.userCredentials)
    this.userProfile = new UserProfile(name, email)
    this.userNotifications = new UserNotifications()
    this.userRoles = new UserRoles(isAdmin)
  }

  // --- Autenticación ---
  login(password: string): void {
    this.authenticator.login(password)
  }

  otpLogin(otp: string): void {
    this.authenticator.otpLogin(otp)
  }

  isLoggedIn(): boolean {
    return this.authenticator.isLoggedIn()
  }

  resetPassword(newPassword: string): void {
    this.authenticator.resetPassword(newPassword)
  }

  // --- Perfil ---
  updateEmail(newEmail: string): void {
    this.userProfile.updateEmail(newEmail)
  }

  updateName(newName: string): void {
    this.userProfile.updateName(newName)
  }

  profile(): string {
    return this.userProfile.profile()
  }

  // --- Notificaciones ---

  addNotification(message: string): void {
    this.userNotifications.addNotification(message)
  }

  getNotifications(): string[] {
    return this.userNotifications.getNotifications()
  }

  clearNotifications(): void {
    this.userNotifications.clearNotifications()
  }

  // --- Administración ---

  promoteToAdmin(): void {
    this.userRoles.promoteToAdmin()
  }

  revokeAdmin(): void {
    this.userRoles.revokeAdmin()
  }

  canDoAnything(): boolean {
    return this.userRoles.canDoAnything()
  }
}
