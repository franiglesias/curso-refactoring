import {describe, expect, it} from 'vitest'
import {UserAccount} from './large-class'
import console from 'node:console'
import {ManagesOTP} from './ManagesOTP'
import {AuthenticateUserWithTwoFactor} from './AuthenticateUserWithTwoFactor'
import {UserCredentials} from './UserCredentials'

describe('Manages Authentication', () => {
  describe('When the user tries to authenticate', () => {
    const user = new UserAccount('John Doe', 'john@example.com', 'secret', false)

    it('should authenticate with the correct password', () => {
      user.login('secret')
      expect(user.isLoggedIn()).toEqual(true)
    })

    it('should not authenticate with the wrong password', () => {
      user.login('wrong')
      expect(user.isLoggedIn()).toEqual(false)
    })
  })

  describe('Reset password', () => {
    describe('When the user resets the password', () => {
      const user = new UserAccount('John Doe', 'john@example.com', 'secret', false)
      user.resetPassword('new-secret')
      it('should not authenticate with the old one', () => {
        user.login('secret')
        expect(user.isLoggedIn()).toEqual(false)
      })

      it('should authenticate with the new one', () => {
        user.login('new-secret')
        expect(user.isLoggedIn()).toEqual(true)
      })
    })
  })
})

describe('Manages Profile', () => {
  describe('When the user wants to update their profile', () => {
    const user = new UserAccount('John Doe', 'john@example.com', 'secret', false)

    it('should be able to change the name', () => {
      user.updateName('Mark Bezos')
      expect(user.profile()).toEqual('Mark Bezos <john@example.com>')
    })

    it('should be able to change the email', () => {
      user.updateEmail('mark@example.com')
      expect(user.profile()).toEqual('Mark Bezos <mark@example.com>')
    })
  })
})

describe('Manages notifications', () => {
  describe('When a notification is sent to the user', () => {
    const user = new UserAccount('John Doe', 'john@example.com', 'secret', false)

    it('should be registered', () => {
      user.addNotification('This is a notification')
      const expected = ['This is a notification']
      expect(user.getNotifications()).toEqual(expected)
    })

    it('should disappear on clear', () => {
      user.clearNotifications()
      expect(user.getNotifications()).toEqual([])
    })
  })
})

describe('Manages roles', () => {
  describe('When a user is a common user', () => {
    const user = new UserAccount('John Doe', 'john@example.com', 'secret', false)

    it('should be able to be promoted', () => {
      user.promoteToAdmin()
      expect(user.canDoAnything()).toEqual(true)
    })

    it('should be able to be revoked', () => {
      user.revokeAdmin()
      expect(user.canDoAnything()).toEqual(false)
    })
  })
})

class OTPProviderStub implements ManagesOTP {
  private readonly otp: string
  private readonly otps = new Map<string, string>()

  constructor(otp: string) {
    this.otp = otp
    this.otps = new Map<string, string>()
  }

  generate(user: string): void {
    this.otps.set(user, this.otp)
    console.log(`OTP: ${this.otp} generada para el usuario ${user}`)
  }

  verify(user: string, providedOtp: string): boolean {
    return this.otps.get(user) === providedOtp
  }
}

describe('Manages Authentication with 2nd Factor', () => {
  describe('When the user tries to authenticate', () => {
    const credentials = new UserCredentials('me@example.com', 'secret')
    const otpProvider = new OTPProviderStub('123456')
    const user = new AuthenticateUserWithTwoFactor(credentials, otpProvider)

    it('should authenticate with the correct password', () => {
      user.login('secret')
      user.otpLogin('123456')
      expect(user.isLoggedIn()).toEqual(true)
    })

    it('should not authenticate with the wrong password', () => {
      user.login('wrong')
      expect(user.isLoggedIn()).toEqual(false)
    })

    it('should not authenticate with the wrong otp', () => {
      user.login('secret')
      user.otpLogin('wrong')
      expect(user.isLoggedIn()).toEqual(false)
    })
  })
})
