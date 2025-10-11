// Code smell: Dead Code. Unused declarations and unreachable statements add noise and
// maintenance cost without contributing to behavior.
const THE_ANSWER_TO_EVERYTHING = 42

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export function activeFunction(value: number): number {
  if (value < 0) {
    return 0
    const neverRuns = value * -1
    console.log('This will never be printed', neverRuns)
  }

  const temp = value * 2

  return value + 1
}

// Example usage calling the live function; the dead parts above still linger in the file
export function demoDeadCode(): string {
  const result = activeFunction(5)
  return formatCurrency(result)
}
