// This file demonstrates the "Comments" dispensable code smell.
// These comments are overly verbose and explain obvious code, adding noise
// instead of value. The code itself is trivial and self-explanatory.

// Exercise: Update this function to log when the sum is negative.

// Notice how the surrounding comments quickly become outdated or misleading,
// forcing you to edit many lines of commentary for a tiny code change and risking drift.

// This function adds two numbers together and returns the result.
// It takes parameter a which is a number and parameter b which is a number too.
// Then it uses the plus operator to compute the sum of a and b.
// Finally, it returns that sum to the caller of this function.
export function add(a: number, b: number): number {
  // Declare a variable called result that will hold the sum of a and b
  const result = a + b // compute the sum by adding a and b
  // Return the result back to whomever called this function
  return result // end of function
}

// Below there is another set of redundant comments that do not help at all.
// Please avoid this pattern in real-world code.

// Example usage of this smelly code: calling a trivial function that shouldn't need comments
export function demoCommentsSmell(): number {
  return add(2, 3)
}
