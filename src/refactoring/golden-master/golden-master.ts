// Técnica de pruebas: Golden Master
// Propósito: Capturar el comportamiento ACTUAL de un sistema/función legado en un "maestro" (snapshot)
// para poder refactorizar con seguridad, detectando cualquier cambio accidental en la salida.
//
// Escenario: Tenemos una función legada que imprime un recibo de compra con formato de texto. Este código
// mezcla lógica, formato y dependencias de tiempo/aleatoriedad, lo que dificulta crear una prueba precisa.
// Practicaremos cómo aplicar Golden Master para caracterizar el comportamiento sin entender todo el código.
//
// Idea clave: Genera muchas entradas representativas, ejecuta la función, captura su salida exacta y
// congélala como "master". En futuras ejecuciones, compara contra el master para detectar regresiones.
// Si hay fuentes de no-determinismo (fecha/hora, aleatoriedad), introdúcete costuras (seams) para poder fijarlas.

export type OrderItem = {
  sku: string
  description: string
  unitPrice: number
  quantity: number
  category?: 'general' | 'food' | 'books'
}

export type Order = {
  id: string
  customerName: string
  items: OrderItem[]
}

// "Código legado" intencionalmente enredado con dependencias de tiempo y aleatoriedad.
export class ReceiptPrinter {
  // NO cambies esta función al inicio del ejercicio; primero crea el Golden Master.
  print(order: Order): string {
    // Dependencia de tiempo (no determinista): la fecha actual cambia en cada ejecución
    const now = new Date(Date.now())

    // Encabezado con fecha/hora local (esto varía según zona horaria/locale)
    const header = `Recibo ${order.id} - ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`

    // Cálculo de subtotal
    let subtotal = 0
    let lines = order.items.map((it, idx) => {
      const lineTotal = round(it.unitPrice * it.quantity)
      subtotal = round(subtotal + lineTotal)
      // Formato deliberadamente frágil: números con toFixed, espacios, índices, etc.
      return `${idx + 1}. ${it.description} (${it.sku}) x${it.quantity} = $${lineTotal.toFixed(2)}`
    })

    // Regla con aleatoriedad (no determinista): "descuento de la suerte" con probabilidad 10%
    // y porcentaje aleatorio hasta 5%.
    let luckyDiscountPct = 0
    if (Math.random() < 0.10) {
      luckyDiscountPct = Math.random() * 0.05
    }
    const luckyDiscount = round(subtotal * luckyDiscountPct)

    // Impuesto ingenuo: 7% general, libros exentos, comida 3%
    const taxableGeneral = order.items
      .filter(i => i.category !== 'books')
      .reduce((s, i) => s + (i.category === 'food' ? 0 : i.unitPrice * i.quantity), 0)
    const foodTax = order.items
      .filter(i => i.category === 'food')
      .reduce((s, i) => s + i.unitPrice * i.quantity * 0.03, 0)
    const generalTax = taxableGeneral * 0.07
    const taxes = round(generalTax + foodTax)

    const total = round(subtotal - luckyDiscount + taxes)

    // Pie con resumen. Observa el orden y los formatos: parte de la superficie del Golden Master.
    const summary = [
      `Subtotal: $${subtotal.toFixed(2)}`,
      luckyDiscount > 0 ? `Descuento de la suerte: -$${luckyDiscount.toFixed(2)} (${(luckyDiscountPct * 100).toFixed(2)}%)` : `Descuento de la suerte: $0.00 (0.00%)`,
      `Impuestos: $${taxes.toFixed(2)}`,
      `TOTAL: $${total.toFixed(2)}`,
    ]

    return [header, ...lines, '---', ...summary].join('\n')
  }
}


function round(n: number): number {
  return Math.round(n * 100) / 100
}

const products: Omit<OrderItem, 'quantity'>[] = [
  {sku: 'BK-001', description: 'Libro: Clean Code', unitPrice: 30, category: 'books'},
  {sku: 'FD-010', description: 'Café en grano 1kg', unitPrice: 12.5, category: 'food'},
  {sku: 'GN-777', description: 'Cuaderno A5', unitPrice: 5.2, category: 'general'},
  {sku: 'GN-123', description: 'Bolígrafos (pack 10)', unitPrice: 3.9, category: 'general'},
  {sku: 'FD-222', description: 'Té verde 200g', unitPrice: 6.75, category: 'food'},
]

const customers = ['Ana', 'Luis', 'Mar', 'Iván', 'Sofía']

// Utilidad para generar pedidos
export function generateOrder(id: string, customerName: string, numItems: number, quantity: number): Order {
  const items: OrderItem[] = []
  for (let i = 0; i < numItems; i++) {
    const p = products[i]
    items.push({...p, quantity: quantity} as OrderItem) // 1..4 unidades
  }

  return {id, customerName, items}
}

// Utilidad para generar pedidos de ejemplo (también usa Math.random -> no determinista)
export function generatesRandomOrder(id: string): Order {
  const customerName = customers[Math.floor(Math.random() * customers.length)]!
  const numItems = 2 + Math.floor(Math.random() * 3) // 2..4 ítems
  const items: OrderItem[] = []
  for (let i = 0; i < numItems; i++) {
    const p = products[Math.floor(Math.random() * products.length)]
    items.push({...p, quantity: 1 + Math.floor(Math.random() * 4)}) // 1..4 qty
  }

  return {id, customerName, items}
}

// Demostración mínima
export function demoGoldenMaster(): string {
  const pedido: Order = {
    id: 'ORD-1',
    customerName: 'Cliente Demo',
    items: [
      {sku: 'BK-001', description: 'Libro: Refactoring', unitPrice: 28.0, quantity: 1, category: 'books'},
      {sku: 'GN-777', description: 'Cuaderno A5', unitPrice: 5.25, quantity: 3, category: 'general'},
    ],
  }
  return new ReceiptPrinter().print(pedido)
}

/*
Ejercicio: Crear una prueba de Golden Master para el código legado (printReceipt)
Objetivo: Caracterizar el comportamiento actual y establecer una red de seguridad para refactorizar.

Pasos recomendados (haz commits entre pasos):
1) Identificar fuentes de no-determinismo que rompen el Golden Master:
   - Fecha/Hora: Date.now / toLocale*.
   - Aleatoriedad: Math.random en printReceipt y en generarPedidoAleatorio.
2) Introducir costuras (SEAMS) mínimas SIN cambiar el comportamiento:
   - Crea versiones inyectables de reloj y RNG. Por ejemplo, define tipos:
       type Reloj = { ahoraMs(): number }
       type Azar = { next(): number } // retorna [0,1)
   - Crea funciones o sobrecargas que acepten dependencias (p.ej., printReceiptConDeps(order, reloj, azar)).
   - Por compatibilidad, mantén printReceipt delegando a la versión con deps usando Date.now/Math.random reales.
3) Generar un conjunto amplio y estable de entradas:
   - Fija semillas para el RNG (puedes implementar un PRNG simple como mulberry32) y fechas deterministas.
   - Genera N pedidos (p.ej., 100) con generarPedidoAleatorio pero usando el RNG inyectado.
4) Capturar la salida MAESTRA:
   - Ejecuta printReceipt sobre cada pedido y concatena todas las salidas con separadores claros.
   - Guarda el resultado como snapshot (Vitest/Jest) o en un archivo en /test/_golden/receipt.master.txt.
5) Escribir la prueba:
   - Si usas snapshots, expect(texto).toMatchSnapshot().
   - Si usas archivo, compara contra el contenido del master: cualquier diferencia debe hacer fallar el test.
6) Refactorizar con seguridad:
   - Limpia el formato, extrae funciones, separa cálculo (dominio) de presentación (string), etc.
   - Usa la prueba Golden Master para garantizar que el output no cambia (salvo decisiones explícitas).
7) Evolucionar el Golden Master cuando se desee un cambio funcional intencional:
   - Primero cambia el test (actualiza el snapshot/archivo) con revisión consciente; luego el código.

Criterios de aceptación:
- La prueba de Golden Master captura múltiples casos de entrada y falla ante cambios en la salida.
- Las fuentes de no-determinismo están controladas mediante inyección o fijación de semillas/fecha.
- printReceipt original sigue disponible para el resto del código (compatibilidad), delegando en la versión con deps.
*/
