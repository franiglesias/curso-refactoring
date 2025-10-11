// Code smell: Lazy Class. This class adds negligible behavior over a simple primitive
// and does not justify its existence.

// Exercise: Add validation and formatting for ids (e.g., must be UUID, display short form).

// You'll be tempted to keep sprinkling tiny methods here and across call sites, showing
// how a lazy class invites scattered, low-value changes instead of cohesive behavior.

export class IdWrapper {
  constructor(public id: string) {
  }

  getId(): string {
    return this.id
  }
}

// Example usage creating and reading the trivial wrapper
export function demoLazyClass(): string {
  const w = new IdWrapper('abc-123')
  return w.getId()
}
