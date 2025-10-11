// Regla de calistenia: Colecciones de primera clase
// Este archivo VIOLA intencionalmente la regla dispersando la lógica de colecciones fuera de un tipo dedicado.
// También incluye una propuesta de ejercicio para refactorizar hacia la regla.

// EJEMPLO DE VIOLACIÓN: Se pasa un array crudo por todos lados con lógica de dominio en cualquier parte
export type Product = { id: string; price: number };

export function addProduct(products: Product[], product: Product): void {
  // Efectos secundarios sobre el array crudo
  const exists = products.some(p => p.id === product.id);
  if (!exists) products.push(product);
}

export function totalPrice(products: Product[]): number {
  // Todo el mundo reimplementa reglas de negocio sobre arrays
  return products.map(p => p.price).reduce((a, b) => a + b, 0);
}

/*
Ejercicio (refactorizar hacia la regla):
- Introducir un tipo de colección de primera clase Products con el array oculto dentro:
  1) Encapsular los comportamientos add, has, totalPrice dentro de Products.
  2) Exponer la iteración mediante métodos, no el array crudo.
  3) Prohibir la mutación externa; proveer operaciones que revelen intención.
- Aceptación: Ninguna función del módulo manipula directamente Product[] crudo; todas pasan por la clase Products.
*/
