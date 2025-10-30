export interface ManagesProfile {
  updateEmail(newEmail: string): void

  updateName(newName: string): void

  profile(): string
}
