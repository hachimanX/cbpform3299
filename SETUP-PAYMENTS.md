# Payment setup

The site stays on GitHub Pages. GitHub Pages cannot run the payment check, so the clean PDF is produced by a separate Cloudflare Worker. Do these steps **before you merge** the paywall change if you want a buyer to get the PDF automatically. Until you finish, the Pay button still opens Stripe. A buyer who already paid is told not to pay again and to email support@cbpform3299.com.

Nothing in this file is a Stripe key. Do not paste a secret key into the repo, into GitHub, or into `pay-config.json`.

## Why a Cloudflare Worker

DNS for `cbpform3299.com` is already at Cloudflare, but the website itself is not proxied through Cloudflare. The apex A records point at GitHub Pages (`server: GitHub.com`). GitHub Pages can only serve the static files. A Worker on `*.workers.dev` is the smallest thing that can run code:

- $0 on the Workers free plan at this volume (100,000 requests a day).
- The static site does not move, and you do not add a second host such as Netlify or Vercel.
- One secret, one command to deploy, no server to keep running.
- Do not turn on Cloudflare's proxy (orange cloud) for the apex just to host this function. That would put GitHub Pages behind Cloudflare and can break the certificate. Leave the website where it is.

## 1. Seller name, email, and governing state

Edit `site.config.json` only:

```json
{
  "sellerName": "Kinder Days Press",
  "sellerEmail": "support@cbpform3299.com",
  "legalEntity": "Bobcat Digital LLC, a Wyoming company",
  "governingState": "Wyoming"
}
```

The visible seller name is Kinder Days Press. The fine print is “Kinder Days Press is a brand of Bobcat Digital LLC, a Wyoming company.” followed by support@cbpform3299.com. No postal address is published. `npm run build` fails if any `{{...}}` placeholder is still in `dist`.

Rebuild and deploy the site after you change the file (merging this branch does that deploy via GitHub Actions).

## 2. Deploy the Worker

From the repo root, on your own computer:

```bash
npx wrangler login
npx wrangler deploy
```

Wrangler prints a URL like `https://cbpform3299-pay.<your-subdomain>.workers.dev`. That is the payment API. It is not a secret.

## 3. Set the Stripe secret

In the same directory:

```bash
npx wrangler secret put STRIPE_SECRET_KEY
```

Paste the secret key when prompted. Use the **secret** key (`sk_live_...` or `sk_test_...`), not the publishable key.

- The key's mode must match the Payment Link. A live Payment Link needs `sk_live_...`. A test Payment Link needs `sk_test_...`.
- The Worker reads the key only from the environment variable named `STRIPE_SECRET_KEY`.
- Do not commit the key, do not put it in GitHub Actions, and do not put it in `public/pay-config.json`.

Check that the Worker is up (this response does not contain the key):

```bash
curl https://cbpform3299-pay.<your-subdomain>.workers.dev/health
```

You want `{"ok":true,"configured":true}`. `"configured":false` means the secret is missing. A wrong or mismatched key does not unlock the PDF. The site then says the payment check did not respond.

## 4. Point the site at the Worker

Edit `public/pay-config.json`:

```json
{
  "payApi": "https://cbpform3299-pay.<your-subdomain>.workers.dev"
}
```

No trailing slash. Commit that file with the site. It is only the Worker URL. It is safe to commit.

The clean PDF stays locked while `payApi` is an empty string. That is the value in this repo until you set it.

## 5. Change the Payment Link return URL

Stripe Dashboard → **Product catalog** or **Payment Links** → the $4.99 link (`https://buy.stripe.com/6oU4gz2Y278m8wn667bZe01`) → **After payment** / confirmation page:

- Choose **Don't show confirmation page** (redirect customers to your website).
- Set the URL to exactly:

```text
https://cbpform3299.com/?session_id={CHECKOUT_SESSION_ID}
```

`{CHECKOUT_SESSION_ID}` must stay in the URL. Stripe replaces it with an id that starts with `cs_`. Do not use `?paid=true` or `?payment=success`. Those no longer unlock the PDF.

The price on that Payment Link must stay **$4.99 USD** (499 cents). The Worker rejects any other amount or currency. If you change the price, also change `PRICE_CENTS` in `worker/assessSession.mjs` and redeploy the Worker.

Leave automatic tax off unless you also change that amount check. Tax can make `amount_total` differ from 499, and the download would be refused.

## 6. Order of operations

1. Deploy the Worker and set `STRIPE_SECRET_KEY`.
2. Put the Worker URL in `public/pay-config.json`.
3. Set up Cloudflare Email Routing for cbpform3299.com so support@cbpform3299.com forwards to your inbox. Send a test email to that address and confirm it arrives.
4. In Stripe settings, set the public business name and the statement descriptor to Kinder Days Press (or Bobcat Digital LLC) so receipts match the site. Make a test purchase and save the receipt.
5. Merge this branch so GitHub Pages publishes the new site, including `pay-config.json` and `site.config.json`.
6. Immediately set the Stripe return URL in step 5.

If you merge before steps 1–2, or if Stripe still returns people to `?paid=true`, the Pay button still opens Stripe, but the clean PDF does not download. The page tells the buyer not to pay a second time and to email you with the Stripe receipt. Finish the steps, then ask them to open the site again from the Stripe receipt's return link, or refund them from the Stripe Dashboard.

## 7. How to test without a real card

1. In Stripe, switch to **test mode** and use a test Payment Link, or the test version of this link.
2. `npx wrangler secret put STRIPE_SECRET_KEY` with the **test** secret key.
3. Pay with Stripe's test card `4242 4242 4242 4242`.
4. You should land on `https://cbpform3299.com/?session_id=cs_test_...`, then the browser should download `CBP_Form_3299_<NAME>.pdf` and show **Payment Verified & Unlocked!**
5. Open `https://cbpform3299.com/?paid=true` in a fresh tab. It must **not** show "Payment Verified & Unlocked!" and it must not download a clean PDF.
6. When you are done testing, put the **live** secret key back with `wrangler secret put` and use the live Payment Link.

## What the Worker does

`POST /pdf` with `{ "session_id": "cs_...", "form": { ... } }`:

1. Reads `STRIPE_SECRET_KEY` from the environment.
2. Calls Stripe `GET /v1/checkout/sessions/{id}`.
3. Returns the PDF only when `payment_status` is `paid`, currency is `usd`, and `amount_total` is `499`.
4. Does not log the key, the session, or the form answers.

The blank CBP template at `/cbp_form_3299.pdf` stays on the static site because the free watermarked preview is built in the browser. That file is the blank form, which CBP also publishes for free. It is not a filled clean PDF. The filled PDF with no watermark is only in the Worker's response.

The Worker bundles its own copy of the blank template. You do not create a storage bucket.
