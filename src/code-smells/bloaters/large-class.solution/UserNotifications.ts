import {ManagesNotifications} from './ManagesNotifications'

export class UserNotifications implements ManagesNotifications {
  private notifications: string[]

  constructor() {
    this.notifications = []
  }

  addNotification(message: string): void {
    this.notifications.push(message)
  }

  getNotifications(): string[] {
    return this.notifications
  }

  clearNotifications(): void {
    this.notifications = []
  }
}
