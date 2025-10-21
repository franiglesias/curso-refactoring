// Code smell: Message Chains [Cadenas de mensajes].
// La navegación profunda por grafos de objetos acopla a los clientes
// a la estructura de los intermediarios y conduce a código frágil.

// Ejercicio: Inserta un nuevo Level entre Root y Level1, o reubica getValue.

// Observa cómo cada cliente que usa root.getNext().getNext().getValue()
// debe cambiar, revelando cómo las cadenas de mensajes
// vuelven costosas refactorizaciones simples.

export class Level2 {
  constructor(private value: number) {
  }

  getValue(): number {
    return this.value
  }
}

export class Level1 {
  constructor(private next: Level2) {
  }

  getNext(): Level2 {
    return this.next
  }
}

export class Root {
  constructor(private next: Level1) {
  }

  getNext(): Level1 {
    return this.next
  }
}

export function readDeep(root: Root): number {
  return root.getNext().getNext().getValue()
}
