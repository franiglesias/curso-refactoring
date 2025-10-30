export interface ManagesOTP {
  generate(user: string): void

  verify(user: string, providedOtp: string): boolean
}
