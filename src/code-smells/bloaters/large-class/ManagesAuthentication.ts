export interface ManagesAuthentication {
  login(password: string): void

  otpLogin(otp: string): void

  resetPassword(newPassword: string): void

  isLoggedIn(): boolean
}
