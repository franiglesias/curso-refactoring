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
