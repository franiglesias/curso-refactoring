# Técnica de refactorización: Cambio en Paralelo usando Sprout

Este ejercicio te ayuda a practicar cómo introducir nuevo comportamiento “haciendo brotar” (sprout)
código nuevo, manteniendo el código antiguo funcionando para poder migrar los puntos de llamada de
forma gradual y segura.

## Escenario

Tenemos una función de total de checkout con reglas de impuestos embebidas en línea. El producto
quiere introducir políticas de impuestos por región (estándar y reducida), pero no debemos romper el
comportamiento existente. Practicaremos haciendo brotar una nueva abstracción (`TaxPolicy`) y
enrutar hacia ella de forma incremental.

## Implementación ingenua actual (intencionalmente rígida)

En `sprout-change.ts` existe la función `calculateTotal(cart, region)` con lógica de impuestos en
línea:

- Región `US`: 7% plano sobre el subtotal.
- Región `EU`: 20% plano solo sobre los ítems gravables (libros y comida exentos).

También hay funciones auxiliares como `roundCurrency` y un uso de ejemplo en `demoSprout()`.

## Ejercicio: Cambio en Paralelo usando SPROUT

Objetivo: Introducir estrategias de política de impuestos sin romper el comportamiento actual.

### Pasos (idealmente con un commit entre cada paso)

1. Haz brotar un nuevo concepto `TaxPolicy` (interfaz o tipo) con un método `compute(cart): number`.
   NO cambies aún `calculateTotal`.

- Crea ejemplos `StandardTaxPolicy` y `ReducedTaxPolicy`.
- Mantenlos sin usar al principio (build en verde).

2. Añade un parámetro opcional a `calculateTotal`: `opts?: { policy?: TaxPolicy }`. Por defecto, usa
   el comportamiento actual si no se proporciona.

- Cuando `opts.policy` esté presente, delega el cálculo de impuestos en él; de lo contrario,
  conserva la lógica embebida.

3. Crea una política adaptadora que reproduzca el comportamiento actual (`LegacyInlineTaxPolicy`)
   para demostrar paridad.

- Úsala desde `demoSprout` para validar que no hay cambio de comportamiento.

4. Migra los puntos de llamada (aquí solo `demoSprout`) para pasar una política.

- Primero pasa `LegacyInlineTaxPolicy` para mantener el comportamiento.
- Luego cambia a las políticas `Standard`/`Reduced` según convenga.

5. Finalmente, elimina las ramas de impuesto en línea de `calculateTotal` una vez que todos los
   puntos de llamada usen una política.

- Aceptación: `calculateTotal` delega completamente a una `TaxPolicy`; la lógica antigua se elimina.

### Criterios de aceptación

- Todos los totales permanecen numéricamente idénticos hasta que la migración (paso 4, segundo
  punto) los cambie intencionalmente.
- No deben fallar los tipos de TypeScript; los nombres y responsabilidades son claros.
- El archivo (o los commits) documenta(n) los pasos de sprout mediante commits o comentarios.
