// Code smell: Switch Statements. Behavior branches on type codes instead of using
// polymorphism, leading to scattered conditional logic that grows with each variant.

// Exercise: Add a new employee kind (contractor) with a special pay rule.

// You'll have to modify the switch and any related code, repeating this change
// in many places as new kinds accumulate.
export type EmployeeKind = 'engineer' | 'manager' | 'sales'

export interface EmployeeRecord {
  kind: EmployeeKind
  base: number
  bonus?: number
  commission?: number
}

export function calculatePay(rec: EmployeeRecord): number {
  switch (rec.kind) {
    case 'engineer':
      return rec.base
    case 'manager':
      return rec.base + (rec.bonus ?? 0)
    case 'sales':
      return rec.base + (rec.commission ?? 0)
    default:
      const _exhaustive: never = rec.kind
      return _exhaustive
  }
}

// Example usage evaluating different employee kinds through the switch
export function demoSwitchStatements(): number[] {
  return [
    calculatePay({kind: 'engineer', base: 1000}),
    calculatePay({kind: 'manager', base: 1000, bonus: 200}),
    calculatePay({kind: 'sales', base: 800, commission: 500}),
  ]
}
