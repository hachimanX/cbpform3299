/** Price of the Form 3299 clean PDF, in cents. Change this if the Stripe price changes. */
export const PRICE_CENTS = 499;

/**
 * A checkout session unlocks the clean PDF only when Stripe says it was paid
 * for this product. `?paid=true` is not a session and must never be passed here.
 * @param {unknown} session
 * @returns {{ ok: true } | { ok: false, reason: string }}
 */
export function assessCheckoutSession(session) {
  if (!session || typeof session !== 'object') {
    return { ok: false, reason: 'invalid' };
  }
  const record = /** @type {Record<string, unknown>} */ (session);
  if (record.payment_status !== 'paid') {
    return { ok: false, reason: 'unpaid' };
  }
  if (record.currency !== 'usd') {
    return { ok: false, reason: 'currency' };
  }
  if (record.amount_total !== PRICE_CENTS) {
    return { ok: false, reason: 'amount' };
  }
  return { ok: true };
}
