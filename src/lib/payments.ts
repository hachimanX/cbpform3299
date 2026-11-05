import type { CBPFormData } from '../types/form';

export const STRIPE_CHECKOUT_URL = 'https://buy.stripe.com/6oU4gz2Y278m8wn667bZe01';

export const CHECKOUT_SESSION_STORAGE_KEY = 'cbp_3299_checkout_session_v1';

const SESSION_ID_PATTERN = /^cs_[A-Za-z0-9_]+$/;

export function readCheckoutSessionId(search: string): string | null {
  const id = new URLSearchParams(search).get('session_id');
  if (!id || !SESSION_ID_PATTERN.test(id)) return null;
  return id;
}

export type CleanPdfResult =
  | { status: 'pdf'; blob: Blob }
  | { status: 'not_configured' }
  | { status: 'unpaid' }
  | { status: 'failed' };

/**
 * Ask the payment worker for the clean PDF.
 * An empty payApi (the committed default) does not unlock anything.
 */
export async function requestCleanPdf(sessionId: string, form: CBPFormData): Promise<CleanPdfResult> {
  let payApi = '';
  try {
    const configResponse = await fetch('/pay-config.json', { cache: 'no-store' });
    if (configResponse.ok) {
      const config = (await configResponse.json()) as { payApi?: unknown };
      if (typeof config.payApi === 'string') payApi = config.payApi.trim().replace(/\/$/, '');
    }
  } catch {
    return { status: 'not_configured' };
  }

  if (!payApi) return { status: 'not_configured' };

  let response: Response;
  try {
    response = await fetch(`${payApi}/pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, form }),
    });
  } catch {
    return { status: 'failed' };
  }

  if (response.status === 503) return { status: 'not_configured' };
  if (response.status === 402) return { status: 'unpaid' };
  if (!response.ok) return { status: 'failed' };

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/pdf')) return { status: 'failed' };
  return { status: 'pdf', blob: await response.blob() };
}
