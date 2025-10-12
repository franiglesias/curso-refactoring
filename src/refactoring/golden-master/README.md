# Ejercicio: Crear una prueba de Golden Master para el código legado (ReceiptPrinter)

## Objetivo

Caracterizar el comportamiento actual y establecer una red de seguridad para refactorizar.

## Pasos recomendados (haz commits entre pasos)

1. Identificar fuentes de no determinismo que rompen el Golden Master:

- Fecha/Hora: `Date.now` / `toLocale*`.
- Aleatoriedad: `Math.random` en `print`.

2. Introducir costuras (SEAMS) mínimas sin cambiar el comportamiento:

- Crea versiones inyectables de reloj y RNG. Por ejemplo, define tipos:
  ```ts
  type Clock = { ahoraMs(): number }
  type Random = { next(): number } // retorna [0,1)
  ```
- Crea funciones o sobrecargas que acepten dependencias.
- Por compatibilidad, mantén delegando a la versión con deps usando `Date.now`/`Math.random` reales.

3. Generar un conjunto amplio y estable de entradas:

- Fija semillas para el RNG (puedes implementar un PRNG simple como `mulberry32`) y fechas
  deterministas.
- Genera N pedidos (p. ej., 100) con `generarPedidoAleatorio` pero usando el RNG inyectado.

4. Capturar la salida maestra:

- Ejecuta `printReceipt` sobre cada pedido y concatena todas las salidas con separadores claros.
- Guarda el resultado como snapshot (Vitest/Jest) o en un archivo en
  `/test/_golden/receipt.master.txt`.

5. Escribir la prueba:

- Si usas snapshots, `expect(texto).toMatchSnapshot()`.
- Si usas archivo, compara contra el contenido del master: cualquier diferencia debe hacer fallar el
  test.

6. Refactorizar con seguridad:

- Limpia el formato, extrae funciones, separa cálculo (dominio) de presentación (string), etc.
- Usa la prueba Golden Master para garantizar que el output no cambia (salvo decisiones explícitas).

7. Evolucionar el Golden Master cuando se desee un cambio funcional intencional:

- Primero cambia el test (actualiza el snapshot/archivo) con revisión consciente; luego el código.

## Criterios de aceptación

- La prueba de Golden Master captura múltiples casos de entrada y falla ante cambios en la salida.
- Las fuentes de no determinismo están controladas mediante inyección o fijación de semillas/fecha.
- `ReceiptPrinter` original sigue disponible para el resto del código (compatibilidad), delegando en
  la versión con deps.
