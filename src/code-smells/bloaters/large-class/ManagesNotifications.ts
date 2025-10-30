export interface ManagesNotifications {
  addNotification(message: string): void

  getNotifications(): string[]

  clearNotifications(): void
}
