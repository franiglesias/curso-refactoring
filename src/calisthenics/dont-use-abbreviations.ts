class Emp {
  private sal: number
  private yrsExp: number

  constructor(sal: number, yrsExp: number) {
    this.sal = sal
    this.yrsExp = yrsExp
  }

  calcBon(): number {
    if (this.yrsExp > 5) {
      return this.sal * 0.2
    }
    return this.sal * 0.1
  }
}
