import {describe, expect, it} from 'vitest'
import {notifyPasswordReset, notifyWelcome} from './wrap-change'

describe('WrapChange', () => {
  it('should send a welcome email', () => {
    const message = notifyWelcome('john@example.com')
    expect(message).toEqual(
      'Email sent to john@example.com, with the subject: Welcome! and body: Thanks for joining our app.',
    )
  })

  it('should send a password-reset email', () => {
    const message = notifyPasswordReset('jane@example.com')
    expect(message).toEqual(
      'Email sent to jane@example.com, with the subject: Reset your password and body: Click the link to reset...',
    )
  })
})
