// Code smell: Middleman. Shop does little more than delegate to Catalog, adding
// an unnecessary layer that obscures the real collaborator.

// Exercise: Add a searchByPrefix feature.

// You'll add methods to Shop that only
// pass through to Catalog, encouraging accidental duplication and hiding
// where the real behavior lives when you need to change it later.

export class Catalog {
  private items = new Map<string, string>()

  add(id: string, name: string): void {
    this.items.set(id, name)
  }

  find(id: string): string | undefined {
    return this.items.get(id)
  }

  list(): string[] {
    return Array.from(this.items.values())
  }
}

export class Shop {
  constructor(private catalog: Catalog) {
  }

  add(id: string, name: string): void {
    this.catalog.add(id, name)
  }

  find(id: string): string | undefined {
    return this.catalog.find(id)
  }

  list(): string[] {
    return this.catalog.list()
  }
}

export function demoMiddleman(): string[] {
  const c = new Catalog()
  const s = new Shop(c)
  s.add('1', 'Book')
  s.add('2', 'Pen')
  return s.list()
}
