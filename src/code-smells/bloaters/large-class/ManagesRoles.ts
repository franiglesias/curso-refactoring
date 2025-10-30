export interface ManagesRoles {
  promoteToAdmin(): void

  revokeAdmin(): void

  canDoAnything(): boolean
}
