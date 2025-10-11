// Code smell: Alternative Classes with Different Interfaces [Clases alternativas con interfaces diferentes].
// Dos clases son intercambiables pero exponen nombres de métodos distintos, forzando código condicional
// en los clientes e impidiendo el polimorfismo.

// Ejercicio: Añade logging con marca de tiempo a ambas implementaciones y permite intercambiarlas en tiempo de ejecución.

// Duplicarás la funcionalidad en métodos con nombres distintos y esparcirás condicionales
// en los clientes, haciendo cambios simples tediosos y propensos a errores.

export class TextLogger {
  log(message: string): void {
    console.log(`[text] ${message}`)
  }
}

export class MessageWriter {
  write(entry: string): void {
    console.log(`[text] ${entry}`)
  }
}

export function useAltClasses(choice: 'logger' | 'writer', msg: string): void {
  if (choice === 'logger') {
    new TextLogger().log(msg)
  } else {
    new MessageWriter().write(msg)
  }
}
