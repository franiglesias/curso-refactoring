import {ManagesOTP} from './ManagesOTP'

export class UserCredentials {
  private readonly email: string
  private readonly password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }

  passwordMatch(password: string): boolean {
    return this.password === password
  }

  reset(password: string): UserCredentials {
    return new UserCredentials(this.email, password)
  }

  generateOTP(otp: ManagesOTP): void {
    otp.generate(this.email)
  }

  verifyOTP(otp: ManagesOTP, providedOtp: string): boolean {
    return otp.verify(this.email, providedOtp)
  }
}
