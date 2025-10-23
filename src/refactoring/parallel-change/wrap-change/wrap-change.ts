export function sendEmailLegacy(to: string, subject: string, body: string): string {
  // efecto secundario simulado (no-op aquí)
  void to
  void subject
  void body
  return `Email sent to ${to}, with the subject: ${subject} and body: ${body}`
}

// Uso actual disperso por el código (aquí simulamos dos puntos de llamada):
export function notifyWelcome(userEmail: string): string {
  return sendEmailLegacy(userEmail, 'Welcome!', 'Thanks for joining our app.')
}

export function notifyPasswordReset(userEmail: string): string {
  return sendEmailLegacy(userEmail, 'Reset your password', 'Click the link to reset...')
}
