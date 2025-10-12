# Técnica de refactorización: Cambio en Paralelo usando Wrap

Este ejercicio te ayuda a practicar cómo cambiar la interfaz de una dependencia externa/legada
introduciendo un wrapper que soporte tanto la API vieja como la nueva, permitiendo migrar los puntos
de llamada de forma gradual y segura.

## Escenario

Tenemos una función legada para enviar correos utilizada en todo el código. Queremos añadir un
`trackingId` obligatorio y soporte de plantillas, pero no podemos actualizar todas las llamadas a la
vez. Practicaremos creando un wrapper que mantenga la firma antigua funcionando mientras
introducimos la nueva.

## API legada actual (intencionalmente rígida)

En `wrap-change.ts` existe la función `sendEmailLegacy(to, subject, body)` con efectos secundarios
simulados, y dos puntos de llamada de ejemplo: `notifyWelcome` y `notifyPasswordReset`.

## Ejercicio: Cambio en Paralelo usando WRAP

Objetivo: Introducir una API de email más rica sin romper los puntos de llamada existentes.

### Forma deseada de la nueva API (objetivo)

```ts
interface EmailMessage {
  to: string
  template: 'welcome' | 'password-reset' | 'custom'
  data?: Record<string, unknown>
  trackingId: string
}

class Mailer {
  send(msg: EmailMessage): void {}
}
```

### Pasos (idealmente con un commit entre cada paso)

1. Crea un nuevo wrapper `Mailer` que en su constructor reciba una dependencia función para enviar
   el correo realmente.

- Debe poder llamar a la función legada internamente para enrutar gradualmente.
- Mantén el wrapper sin usar al principio para asegurar verde.

2. Introduce una sobrecarga o un método separado en `Mailer` que acepte AMBOS:

- la nueva forma (`EmailMessage`) y
- un método de compatibilidad `sendLegacy(to, subject, body)` que reenvíe a `sendEmailLegacy`.
- Documenta que `sendLegacy` es temporal.

3. Migra un punto de llamada (`notifyWelcome`) para usar el wrapper con el método legado primero
   (sin cambio de comportamiento).
4. Añade soporte de plantillas en `Mailer.send(msg)` mapeando plantillas a subject/body e incluyendo
   `trackingId` en el cuerpo.

- Mantén el reenvío de `sendLegacy` intacto.

5. Migra `notifyWelcome` para usar completamente la nueva API (`EmailMessage`) dejando
   `notifyPasswordReset` en legado.
6. Finalmente, migra el resto de puntos de llamada y elimina `sendLegacy` del wrapper.

### Criterios de aceptación

- Mientras la migración está en curso, tanto los llamadores viejos como los nuevos funcionan.
- No hay cambio de comportamiento en tiempo de ejecución hasta que el paso 5 cambie explícitamente
  el formato del email.
- El wrapper aísla el cambio y sirve como la costura entre las APIs vieja y nueva.
