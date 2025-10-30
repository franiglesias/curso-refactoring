import {BaseManagesAuthentication} from './BaseManagesAuthentication'

import {UserCredentials} from './UserCredentials'

export class AuthenticateUser extends BaseManagesAuthentication {
  constructor(credentials: UserCredentials) {
    super(credentials)
  }

  succeedLogin() {
    this.successfullyLoggedIn()
  }

  otpLogin(_otp: string): void {
    // no op
  }
}
