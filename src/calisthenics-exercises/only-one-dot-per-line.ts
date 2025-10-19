// Regla de calistenia: Solo un punto por línea

// EJEMPLO DE VIOLACIÓN: Envidia de funciones y cadenas largas
export function lastCityInUpper(
  people: Array<{ address?: { city?: string } }>,
): string | undefined {
  // ¡5 puntos en una sola línea!
  return people
    .filter((p) => p.address && p.address.city)
    .map((p) => p.address!.city!)
    .filter((c) => c!.length > 0)
    .pop()!
    .toUpperCase()
}

/*
Ejercicio (refactorizar hacia la regla):
- Romper las cadenas de métodos moviendo lógica a objetos/funciones de dominio:
- Aceptación: Ninguna línea contiene más de un operador punto; las responsabilidades están mejor distribuidas.
*/
