# Data clump (Grupo de datos)

## Definición

El mismo grupo de campos de datos viaja junto por muchos lugares, lo que sugiere un Value Object faltante y duplicación.

## Ejemplo

```typescript
export class Invoice {
  constructor(
    private customerName: string,
    private customerStreet: string,
    private customerCity: string,
    private customerZip: string,
  ) {
  }

  print(): string {
    return `Factura para: ${this.customerName}\n` +
      `Dirección: ${this.customerStreet}, ${this.customerCity}, ${this.customerZip}`
  }
}

export class ShippingLabel {
  constructor(
    private customerName: string,
    private customerStreet: string,
    private customerCity: string,
    private customerZip: string,
  ) {
  }

  print(): string {
    return `Enviar a: ${this.customerName}\n` + `${this.customerStreet}, ${this.customerCity}, ${this.customerZip}`
  }
}
```

## Ejercicio

Añade país y provincia y reglas de formateo internacional de la dirección.

## Problemas que encontrarás

Necesitarás modificar constructores, impresores y cualquier lugar que pase estos campos juntos, multiplicando la superficie de cambio.

