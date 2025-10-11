// Regla de calistenia: No más de 2 variables de instancia por clase
// Este archivo VIOLA intencionalmente la regla definiendo una clase con muchos campos.
// También incluye una propuesta de ejercicio para refactorizar hacia la regla.

// EJEMPLO DE VIOLACIÓN: Demasiadas variables de instancia en una sola clase
export class CheckoutSession {
  // 8 variables de instancia: claramente por encima del límite
  private cartItems: Array<{ id: string; price: number; qty: number }> = [];
  private customerId: string | null = null;
  private shippingAddress: string | null = null;
  private billingAddress: string | null = null;
  private couponCode: string | null = null;
  private paymentMethod: 'CARD' | 'PAYPAL' | null = null;
  private currency: string = 'USD';
  private taxRate: number = 0.21;

  addItem(id: string, price: number, qty: number) {
    this.cartItems.push({id, price, qty});
  }

  total(): number {
    const subtotal = this.cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const discount = this.couponCode ? 10 : 0; // lógica de descuento primitiva
    const taxed = (subtotal - discount) * (1 + this.taxRate);
    return this.currency === 'USD' ? taxed : taxed * 0.9; // conversión simulada
  }
}

/*
Ejercicio (refactorizar hacia la regla):
- Reducir variables de instancia extrayendo objetos/entidades de valor cohesivos:
  1) Extraer Cart, CustomerId, Addresses, Coupon, Payment, Currency, TaxPolicy.
  2) Mover el comportamiento a estos tipos (p. ej., Cart.total(), TaxPolicy.apply(), Currency.convert()).
  3) Mantener CheckoutSession con como máximo dos campos: cart y paymentContext (o tipos agregados similares).
- Aceptación: CheckoutSession no tiene más de 2 variables de instancia; la lógica se distribuye en tipos dedicados.
*/
