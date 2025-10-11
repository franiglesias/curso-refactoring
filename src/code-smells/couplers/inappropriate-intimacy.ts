// Code smell: Inappropriate Intimacy [Intimidad inapropiada]. Team y Manager exponen y modifican el estado
// interno del otro, creando un acoplamiento fuerte y diseños frágiles.

// Ejercicio: Añade una traza de auditoría cuando cambien los presupuestos y aplica reglas de presupuesto mínimo.

// Como Team y Manager tocan libremente los campos del otro, tendrás que esparcir
// comprobaciones y registros en muchos lugares, aumentando el acoplamiento y las regresiones.

export class Team {
  constructor(
    public name: string,
    public budget: number,
  ) {
  }

  manager?: Manager

  assignManager(m: Manager): void {
    this.manager = m
    m.team = this
  }
}

export class Manager {
  constructor(public name: string) {
  }

  team?: Team

  raiseTeamBudget(amount: number): void {
    if (this.team) this.team.budget += amount
  }

  renameTeam(newName: string): void {
    if (this.team) this.team.name = newName
  }
}

export function demoInappropriateIntimacy(): Team {
  const t = new Team('Core', 1000)
  const m = new Manager('Alice')
  t.assignManager(m)
  m.raiseTeamBudget(200)
  m.renameTeam('Platform')
  return t
}
