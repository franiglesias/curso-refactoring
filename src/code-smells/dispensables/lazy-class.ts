// Code smell: Lazy Class. This class adds negligible behavior over a simple primitive
// and does not justify its existence.
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
