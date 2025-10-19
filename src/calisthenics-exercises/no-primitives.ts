// Regla de calistenia: No usar primitivos (obsesión por primitivos)

// EJEMPLO DE VIOLACIÓN: Usar strings/numbers para conceptos de dominio fuertes
export function transfer(
  amount: number,
  fromIban: string,
  toIban: string,
  currency: string,
): string {
  if (!fromIban || !toIban || !currency) {
    throw new Error('Missing data')
  }
  if (amount <= 0) {
    throw new Error('Invalid amount')
  }
  // simular una transferencia
  return `${amount} ${currency} from ${fromIban} to ${toIban}`
}

/*
Ejercicio (refactorizar hacia la regla):
- Introducir tiny types/value objects:
  1) Money.
  2) Validar dentro de constructores/fábricas.
  3) Usar Tipos.
- Aceptación: la firma de transfer no contiene primitivos desnudos para conceptos de dominio.
*/
