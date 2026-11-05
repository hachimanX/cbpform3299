import { PDFDocument } from 'pdf-lib';
import { fillCbpForm } from '../src/lib/fillCbpForm';
import templatePdf from '../public/cbp_form_3299.pdf';
import { assessCheckoutSession } from './assessSession.mjs';
import { coerceForm } from './coerceForm.mjs';

interface Env {
  STRIPE_SECRET_KEY?: string;
}

const ALLOWED_ORIGINS = new Set([
  'https://cbpform3299.com',
  'https://www.cbpform3299.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
]);

const MAX_BODY_BYTES = 100_000;
const SESSION_ID_PATTERN = /^cs_[A-Za-z0-9_]+$/;

function corsHeaders(origin: string | null): Headers {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Access-Control-Max-Age', '86400');
  headers.set('Vary', 'Origin');
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  }
  return headers;
}

function jsonResponse(body: unknown, status: number, origin: string | null): Response {
  const headers = corsHeaders(origin);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('Cache-Control', 'no-store');
  return new Response(JSON.stringify(body), { status, headers });
}

function templateBytes(): ArrayBuffer {
  if (templatePdf instanceof ArrayBuffer) return templatePdf;
  const wrapped = templatePdf as { default?: ArrayBuffer };
  if (wrapped.default instanceof ArrayBuffer) return wrapped.default;
  throw new Error('template_missing');
}

function pdfFilename(lastName: string): string {
  const clean = lastName.toUpperCase().replace(/[^A-Z0-9]+/g, '').slice(0, 40);
  return `CBP_Form_3299_${clean || 'DECLARATION'}.pdf`;
}

async function stripeSession(
  sessionId: string,
  secretKey: string,
): Promise<{ ok: true; session: unknown } | { ok: false; missing: boolean }> {
  const response = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      method: 'GET',
      redirect: 'manual',
      headers: { Authorization: `Bearer ${secretKey}` },
    },
  );
  if (response.status === 404) return { ok: false, missing: true };
  if (response.status < 200 || response.status >= 300) return { ok: false, missing: false };
  return { ok: true, session: await response.json() };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin');
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '') || '/';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method === 'GET' && path.endsWith('/health')) {
      return jsonResponse({ ok: true, configured: Boolean(env.STRIPE_SECRET_KEY) }, 200, origin);
    }

    if (request.method !== 'POST' || !path.endsWith('/pdf')) {
      return jsonResponse({ error: 'not_found' }, 404, origin);
    }

    const secretKey = env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return jsonResponse({ error: 'not_configured' }, 503, origin);
    }

    const declaredLength = Number(request.headers.get('content-length') || '0');
    if (declaredLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: 'too_large' }, 413, origin);
    }

    let payload: { session_id?: unknown; form?: unknown };
    try {
      // Read the body only to build the PDF. Do not log it.
      const text = await request.text();
      if (text.length > MAX_BODY_BYTES) {
        return jsonResponse({ error: 'too_large' }, 413, origin);
      }
      payload = JSON.parse(text);
    } catch {
      return jsonResponse({ error: 'bad_request' }, 400, origin);
    }

    const sessionId = payload.session_id;
    if (typeof sessionId !== 'string' || !SESSION_ID_PATTERN.test(sessionId)) {
      return jsonResponse({ error: 'bad_request' }, 400, origin);
    }

    const session = await stripeSession(sessionId, secretKey);
    if (!session.ok && !session.missing) {
      return jsonResponse({ error: 'verification_failed' }, 502, origin);
    }
    const decision = assessCheckoutSession(session.ok ? session.session : null);
    if (!decision.ok) {
      return jsonResponse({ error: 'unpaid' }, 402, origin);
    }

    try {
      const form = coerceForm(payload.form);
      const pdfDoc = await PDFDocument.load(templateBytes());
      fillCbpForm(pdfDoc, form);
      const pdfBytes = await pdfDoc.save();
      const headers = corsHeaders(origin);
      headers.set('Content-Type', 'application/pdf');
      headers.set('Content-Disposition', `attachment; filename="${pdfFilename(form.lastName)}"`);
      headers.set('Cache-Control', 'no-store');
      return new Response(pdfBytes, { status: 200, headers });
    } catch {
      return jsonResponse({ error: 'pdf_failed' }, 500, origin);
    }
  },
};
