export interface EmailMessage {
  to: string
  template: 'welcome' | 'password-reset' | 'custom'
  data?: Record<string, unknown>
  trackingId: string
}

export class Mailer {
  send(msg: EmailMessage): string {
  }
}
