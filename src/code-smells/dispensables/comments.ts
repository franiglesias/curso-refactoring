// Este archivo demuestra el code smell "Comments [Comentarios]".
// Estos comentarios son excesivamente verbosos y explican código obvio,
// añadiendo ruido en lugar de valor.
// El código en sí es trivial y se explica solo.

// Ejercicio: Actualiza esta función para registrar
// cuando la suma sea negativa.

// Observa cómo los comentarios de alrededor se vuelven
// obsoletos o engañosos rápidamente,
// obligándote a editar muchas líneas de comentario
// por un cambio diminuto y arriesgando desalineación.

// Esta función suma dos números y devuelve el resultado.
// Toma el parámetro a que es un número y el parámetro b que también es un número.
// Luego usa el operador más para calcular la suma de a y b.
// Finalmente, devuelve esa suma al invocador de esta función.
export function add(a: number, b: number): number {
  // Declara una variable llamada result que contendrá la suma de a y b
  const result = a + b // calcula la suma agregando a y b
  // Devuelve el resultado a quien haya llamado a esta función
  return result // fin de la función
}

// Debajo hay otro conjunto de comentarios redundantes que no ayudan en absoluto.
// Por favor, evita este patrón en código real.

// Ejemplo de uso de este código con mal olor: llamar a una función trivial que no debería necesitar comentarios
export function demoCommentsSmell(): number {
  return add(2, 3)
}
