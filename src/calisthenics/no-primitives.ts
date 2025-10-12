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
  1) Money (monto + moneda con invariantes), Iban, AccountId, NonEmptyString.
  2) Validar dentro de constructores/fábricas en lugar de ifs dispersos.
  3) Reemplazar la firma de la función con tipos de dominio para prevenir mal uso.
- Aceptación: la firma de transfer no contiene primitivos desnudos para conceptos de dominio.
*/
