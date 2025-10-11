// Code smell: Lazy Class [Clase perezosa]. Esta clase agrega un comportamiento insignificante
// sobre un primitivo simple y no justifica su existencia.

// Ejercicio: Añade validación y formateo para IDs (p. ej., debe ser UUID, mostrar forma corta).

// Te verás tentado a ir esparciendo pequeños métodos aquí y en los puntos de uso,
// mostrando cómo una clase perezosa invita a cambios dispersos y de poco valor en lugar de un comportamiento cohesivo.

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
