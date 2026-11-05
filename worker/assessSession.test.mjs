import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assessCheckoutSession, PRICE_CENTS } from './assessSession.mjs';

const paid = {
  payment_status: 'paid',
  currency: 'usd',
  amount_total: PRICE_CENTS,
};

test('a paid $4.99 usd session unlocks', () => {
  assert.deepEqual(assessCheckoutSession(paid), { ok: true });
});

test('unpaid, wrong amount, wrong currency, and empty payloads do not unlock', () => {
  assert.equal(assessCheckoutSession({ ...paid, payment_status: 'unpaid' }).ok, false);
  assert.equal(assessCheckoutSession({ ...paid, payment_status: 'no_payment_required' }).ok, false);
  assert.equal(assessCheckoutSession({ ...paid, amount_total: 0 }).ok, false);
  assert.equal(assessCheckoutSession({ ...paid, amount_total: 998 }).ok, false);
  assert.equal(assessCheckoutSession({ ...paid, currency: 'eur' }).ok, false);
  assert.equal(assessCheckoutSession(null).ok, false);
  assert.equal(assessCheckoutSession({ paid: true }).ok, false);
  assert.equal(assessCheckoutSession({ payment: 'success' }).ok, false);
});
