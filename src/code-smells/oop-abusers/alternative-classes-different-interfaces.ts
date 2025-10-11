// Code smell: Alternative Classes with Different Interfaces. Two classes are interchangeable
// but expose different method names, forcing conditional client code and preventing polymorphism.

// Exercise: Add timestamped logging to both implementations and allow swapping at runtime.

// You'll duplicate the feature across differently named methods and sprinkle conditionals
// in clients, making simple changes tedious and error-prone.

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
