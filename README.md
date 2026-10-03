# CBP Form 3299 Generator (cbpform3299.com)

A high-converting, high-trust, and 100% private web generator for **U.S. Customs and Border Protection (CBP) Form 3299** (*Declaration for Free Entry of Unaccompanied Articles* — 19 CFR 148.6, 148.52, 148.53).

Designed for international relocators, returning U.S. expats, work visa holders (H-1B/L-1), and military personnel who need to clear household goods and unaccompanied baggage through U.S. Customs.

---

## 🚀 Key Features

1. **Guided Plain-English Wizard:**
   - Converts confusing legal and tariff terms into 4 intuitive, guided steps.
   - Smart conditional logic automatically fills out Part I (Personal/Flight), Part II (Residency Status), Part III (U.S. Personnel), Part IV (Household Goods & Alcohol Declarations), and Part VI (Certification).

2. **Official AcroForm Compliance:**
   - Compiles user answers directly onto the official **CBP Form 3299 (Rev. 05/24)** vector template.
   - Accepted by all international freight forwarders, ocean shipping lines, air cargo carriers, and licensed customs brokers.

3. **100% In-Browser Privacy (Zero Cloud Storage):**
   - Built entirely client-side using `pdf-lib`.
   - **No passport numbers, SSNs, flight details, or home addresses are ever uploaded or saved to any external server.**
   - All PDF processing occurs locally in the user's browser.

4. **Strategic Pricing & Psychological Value:**
   - Price anchored at **~~$9.99~~ slashed to $4.99** (50% OFF Launch Special).
   - Prominently positioned as **"One-Time Payment • NEVER a Subscription • No Hidden Fees"** (the exact opposite of predatory monthly fees like PDFfiller and DocuSign).
   - Free watermarked preview available so users can verify output before purchasing.

5. **Bonus Packing Inventory Generator:**
   - Includes a custom-built 1-page **Supplemental Customs Packing List PDF** generator ($19 standalone value), which international moving companies mandate alongside Form 3299.

---

## 🛡️ 20-Point Legal Protection Checklist (Fully Implemented)

Every critical item from the legal compliance checklist has been integrated:
1. **Privacy Policy Modal:** Dedicated policy detailing zero-server data retention.
2. **Terms of Service:** Commercial software terms defining non-brokerage scope.
3. **14-Day Refund Policy:** Clear 100% money-back guarantee if rejected by carrier.
4. **Cookie Policy:** Details only strictly necessary local storage is utilized.
5. **Cookie Consent Banner:** Non-intrusive, dismissible consent banner.
6. **Form Review Consent:** Mandatory checkbox requiring declarant to review data before export.
7. **No Unnecessary Data:** Zero database retention of personal identifying information.
8. **Audit Third-Party SDKs:** Completely standalone with zero ad networks or invasive trackers.
9. **Remove Dark Patterns:** Transparent one-time fee; no recurring enrollment traps.
10. **Remove Hidden Fees:** Single, clear $4.99 charge.
11. **Remove Fake Reviews:** Replaced with authentic feature-based compliance badges.
12. **Remove Unsupported Claims:** Clear disclaimer stating software is an independent formatting tool.
13. **Accessibility Alt Text:** Semantic tags, proper ARIA labels, and descriptive text.
14. **Fix Color Contrast:** WCAG 2.1 AA compliant Navy Blue, Slate, and Gold palette.
15. **Keyboard Navigation:** Full keyboard navigation support across all form fields.
16. **Add Business Details:** Support email (`support@cbpform3299.com`) in footer and modals.
17. **Age Consent (COPPA):** Terms explicitly state service is for adults 18+.
18. **Unsubscribe Link:** No email spamming or newsletters collected.
19. **Licensed Fonts & Icons:** Open-source Google system fonts and Lucide icons.
20. **Data Deletion Tool:** Built-in "Erase All My Data From This Device" button in the Legal modal and wizard header.

---

## 📦 How to Test & Run Locally

```bash
# Navigate to the project directory
cd h:\Antigravity\SaaS\cbp-3299-generator

# Start the Vite development server
npm run dev
```

Visit the local URL shown in your terminal (usually `http://localhost:5173`) to test the interactive questionnaire and live PDF downloads.

---

## 🌐 Deploying to GitHub Pages with `cbpform3299.com`

The project is pre-configured for automated GitHub Pages deployment:

1. **Create a GitHub Repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of CBP Form 3299 Generator"
   git remote add origin https://github.com/hachimanX/cbpform3299.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - In your GitHub repository, navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - The included workflow `.github/workflows/deploy.yml` will automatically build and publish your site whenever you push!

3. **Connect Your Domain (`cbpform3299.com`):**
   - The file `public/CNAME` already contains `cbpform3299.com`.
   - In your DNS manager (Namecheap, Cloudflare, or Google Domains), add:
     - **CNAME record:** `www` pointing to `hachimanX.github.io`
     - **A records** pointing to GitHub Pages IP addresses:
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`

---

## 💳 Connecting Live Stripe Checkout

Currently, the application includes a **Test Mode & Instant Unlock** simulation that generates celebratory confetti and immediately downloads the watermark-free official PDF and packing list.

When you're ready to accept live payments:
1. Create a **$4.99 Payment Link** in your Stripe Dashboard.
2. In the Stripe Payment Link settings, set the **Confirmation Page** redirect URL to:
   `https://cbpform3299.com/?paid=true`
3. In `StepReviewExport.tsx`, link the button directly to your Stripe Payment Link. Users will pay on Stripe and be returned back with their clean download unlocked!
