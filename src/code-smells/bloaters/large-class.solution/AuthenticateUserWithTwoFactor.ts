import {BaseManagesAuthentication} from './BaseManagesAuthentication'
import {ManagesOTP} from './ManagesOTP'

import {UserCredentials} from './UserCredentials'

export class AuthenticateUserWithTwoFactor extends BaseManagesAuthentication {
  private readonly otpManager: ManagesOTP

  constructor(credentials: UserCredentials, otpManager: ManagesOTP) {
    super(credentials)
    this.otpManager = otpManager
  }

  succeedLogin(): void {
    this.credentials.generateOTP(this.otpManager)
  }

  otpLogin(otp: string): void {
    if (this.credentials.verifyOTP(this.otpManager, otp)) {
      this.successfullyLoggedIn()
    } else {
      this.failedLogin()
    }
  }
}
