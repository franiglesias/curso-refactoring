// Regla de calistenia: No usar else

// EJEMPLO DE VIOLACIÓN: Usa ramas else en lugar de cláusulas de guarda / polimorfismo

export function shippingCost(weightKg: number, destination: 'DOMESTIC' | 'INTERNATIONAL'): number {
  if (destination === 'DOMESTIC') {
    if (weightKg <= 1) {
      return 5
    } else if (weightKg <= 5) {
      return 10
    } else {
      return 20
    }
  } else {
    if (weightKg <= 1) {
      return 15
    } else if (weightKg <= 5) {
      return 25
    } else {
      return 40
    }
  }
}

/*
Ejercicio (refactorizar hacia la regla):
- Reemplazar cadenas de else por:
  1) Cláusulas de guarda: retornos tempranos para DOMESTIC/INTERNATIONAL y tramos de peso.
  2) Objetos estrategia: un mapa { DOMESTIC: DomesticShipping, INTERNATIONAL: InternationalShipping } donde cada política calcula el costo sin else.
  3) Componer reglas mediante tablas de datos y búsqueda de funciones en lugar de ramificaciones.
- Aceptación: Las funciones no contienen la palabra clave else y siguen siendo legibles y comprobables.
*/
