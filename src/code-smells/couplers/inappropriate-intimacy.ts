// Code smell: Inappropriate Intimacy. Team and Manager expose and modify each other's
// internal state, creating tight coupling and fragile designs.

// Exercise: Add an audit trail when budgets change and enforce minimum budget rules.

// Because Team and Manager freely poke each other's fields, you'll have to sprinkle
// checks and logging in multiple places, increasing coupling and regressions.

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
