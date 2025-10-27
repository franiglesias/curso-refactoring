// Code smell: Inappropriate Intimacy [Intimidad inapropiada].
// Team y Manager exponen y modifican el estado
// interno del otro, creando un acoplamiento fuerte y diseños frágiles.

// Ejercicio: Añade una traza de auditoría cuando cambien los presupuestos
// y aplica reglas de presupuesto mínimo.

// Como Team y Manager tocan libremente los campos del otro, tendrás que esparcir
// comprobaciones y registros en muchos lugares, aumentando el acoplamiento y las regresiones.

export class Team {
  private name: string
  private budget: Budget
  private manager?: Manager

  constructor(name: string, budget: number) {
    this.budget = new Budget(budget)
    this.name = name
  }

  assignManager(m: Manager): void {
    this.manager = m
    m.assignTeam(this)
  }

  raiseBudget(amount: number): void {
    this.budget = new Budget(this.budget.amount + amount)
  }

  rename(newName: string) {
    this.name = newName
  }
}

export class Manager {
  private name: string
  private team?: Team

  constructor(name: string) {
    this.name = name
  }

  assignTeam(t: Team): void {
    if (this.team) {
      throw new Error('Team already assigned')
    }
    this.team = t
  }

  raiseTeamBudget(amount: number): void {
    if (this.team) this.team.raiseBudget(amount)
  }

  renameTeam(newName: string): void {
    if (this.team) this.team.rename(newName)
  }
}

export class Budget {
  public amount: number

  constructor(amount: number) {
    if (amount < 900) {
      throw new Error('Budget too low')
    }
    if (amount > 3000) {
      throw new Error('Budget too high')
    }
    this.amount = amount
  }

  raise(amount: number): void {
    if (this.amount + amount > 3000) {
      throw new Error('Budget exceeded')
    }
    this.amount += amount
  }
}

export function demoInappropriateIntimacy(): Team {
  const t = new Team('Core', 1000)
  const m = new Manager('Alice')
  m.assignTeam(new Team('Frontend', 2000))
  t.assignManager(m)
  m.raiseTeamBudget(200)
  m.renameTeam('Platform')
  return t
}
