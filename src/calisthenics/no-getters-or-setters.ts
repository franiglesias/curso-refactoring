// Regla de calistenia: No getters ni setters
// Este archivo VIOLA intencionalmente la regla exponiendo estado mediante getters/setters.
// También incluye una propuesta de ejercicio para refactorizar hacia la regla.

// EJEMPLO DE VIOLACIÓN: Modelo anémico con getters/setters y el comportamiento en otra parte
export class BankAccount {
  private _balance: number;

  constructor(initialBalance: number = 0) {
    this._balance = initialBalance;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    if (value < 0) throw new Error('Negative');
    this._balance = value;
  }
}

// En otro lugar: los consumidores manipulan el estado directamente
export function pay(account: BankAccount, amount: number) {
  account.balance = account.balance - amount; // lógica externa usando getter/setter
}

/*
Ejercicio (refactorizar hacia la regla):
- Mover el comportamiento dentro del objeto y eliminar getters/setters:
  1) Proveer métodos que revelen intención: deposit(amount), withdraw(amount), pay(amount).
  2) Mantener las invariantes internas; no exponer el balance crudo.
  3) Usar consultas que revelen intención (canWithdraw(amount)) en lugar de get/set.
- Aceptación: No hay getters/setters públicos; el comportamiento vive con los datos.
*/
