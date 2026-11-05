import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const config = JSON.parse(readFileSync(resolve('site.config.json'), 'utf8'));
const seller = config.sellerName;
const email = config.sellerEmail;
const legalEntity = config.legalEntity;
const governingState = config.governingState;
const finePrint = `${seller} is a brand of ${legalEntity}.`;
const origin = 'https://cbpform3299.com';
const blankForm = 'https://www.cbp.gov/sites/default/files/2024-05/cbp_form_3299_0.pdf';

const disclosure = `<strong>Independent service, not a government website.</strong> cbpform3299.com is an independent service and is not affiliated with U.S. Customs and Border Protection (CBP) or DHS. You can download the blank CBP Form 3299 free at <a href="${blankForm}">cbp.gov</a>. We charge $4.99 for our guided fill-in tool and a clean, filled PDF.`;

function page({ slug, title, description, body }) {
  const url = `${origin}/${slug}/`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Georgia, "Iowan Old Style", "Palatino Linotype", serif; color: #1c1917; background: #fafaf9; line-height: 1.6; }
    a { color: #0f766e; }
    header, footer, .bar, main { padding: 16px 20px; }
    header { background: #134e4a; color: #fff; }
    header a { color: #fff; text-decoration: none; font-weight: 700; font-family: "Segoe UI", sans-serif; }
    .bar { background: #fffbeb; color: #1c1917; border-bottom: 1px solid #fde68a; font-family: "Segoe UI", sans-serif; font-size: 15px; }
    main { max-width: 42rem; margin: 0 auto; padding-top: 28px; padding-bottom: 48px; }
    h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 12px; }
    h2 { font-size: 1.25rem; margin: 1.6em 0 0.4em; }
    p, li { font-size: 1.05rem; }
    footer { border-top: 1px solid #e7e5e4; font-family: "Segoe UI", sans-serif; font-size: 14px; }
    footer ul { padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 8px 16px; }
    .note { background: #f0fdfa; border: 1px solid #99f6e4; padding: 12px 14px; border-radius: 8px; }
  </style>
</head>
<body>
  <header><a href="${origin}/">Form 3299 Helper</a></header>
  <div class="bar">${disclosure}</div>
  <main>
    <h1>${title.replace(' | cbpform3299.com', '')}</h1>
    ${body}
  </main>
  <footer>
    <p class="note">${disclosure}</p>
    <ul>
      <li><a href="${origin}/">Fill-in tool</a></li>
      <li><a href="${origin}/guides/">Guides</a></li>
      <li><a href="${origin}/about/">About</a></li>
      <li><a href="${origin}/contact/">Contact</a></li>
      <li><a href="${origin}/privacy/">Privacy</a></li>
      <li><a href="${origin}/terms/">Terms</a></li>
      <li><a href="${origin}/refund/">Refunds</a></li>
      <li><a href="#cookie-settings" data-cookie-settings>Cookie settings</a></li>
      <li><a href="${blankForm}">Blank form (free at CBP.gov)</a></li>
    </ul>
    <p class="seller-fineprint">${finePrint} <a href="mailto:${email}">${email}</a></p>
  </footer>
<script src="/consent.js" defer></script>
</body>
</html>
`;
}

const pages = [
  {
    slug: 'about',
    title: 'About this site | cbpform3299.com',
    description:
      'cbpform3299.com is an independent Form 3299 fill-in tool. It is not affiliated with U.S. Customs and Border Protection. The blank form is free from CBP.',
    body: `
    <p>cbpform3299.com is an independent service that helps you fill in CBP Form 3299 (Declaration for Free Entry of Unaccompanied Articles). It is not a government website. It is not affiliated with, endorsed by, or authorized by U.S. Customs and Border Protection (CBP), the Department of Homeland Security (DHS), or any other government agency.</p>
    <p>The blank CBP Form 3299 is free from CBP. You can download it at <a href="${blankForm}">cbp.gov</a>. You do not have to pay anyone to get that blank form.</p>
    <p>This site charges $4.99 once for a guided questionnaire and a clean, filled PDF. You can preview a watermarked copy before you pay.</p>
    <h2 id="notice">Not affiliated with U.S. Customs and Border Protection</h2>
    <p class="note">cbpform3299.com is an independent document preparation service and is not affiliated with, sponsored by, endorsed by, or authorized by U.S. Customs and Border Protection (CBP), the U.S. Department of Homeland Security (DHS), or the United States Government. Blank CBP forms and filing instructions are free at <a href="https://www.cbp.gov">cbp.gov</a>.</p>
    <p>You choose every answer. The tool only places your answers on the form. It does not decide whether you qualify for anything, and it does not choose a category for you.</p>
    <p>This site does not give legal advice, tax advice, or customs brokerage services. You are responsible for checking that what you enter is true before you sign the form or give it to a carrier, a broker, or a customs officer.</p>
    <h2>Who sells this</h2>
    <p>The seller is ${seller}.</p>
    <p>Email <a href="mailto:${email}">${email}</a>. There is also a <a href="${origin}/contact/">contact page</a>, a <a href="${origin}/privacy/">privacy policy</a>, <a href="${origin}/terms/">terms of use</a>, and a <a href="${origin}/refund/">refund policy</a>.</p>
    <p>Guides: <a href="${origin}/guides/how-to-fill-out-cbp-form-3299/">how to fill out Form 3299</a>, <a href="${origin}/guides/cbp-form-3299-fedex/">FedEx shipments</a>, and the <a href="${origin}/guides/cbp-form-3299-supplemental-declaration/">supplemental list of articles</a>.</p>
    `,
  },
  {
    slug: 'contact',
    title: 'Contact | cbpform3299.com',
    description:
      'Email the seller of this independent Form 3299 fill-in tool about a purchase, a download, or a refund.',
    body: `
    <p>Email <a href="mailto:${email}">${email}</a>.</p>
    <p>Use that email for a question about a purchase, a download, or a refund. For a refund, write within 14 days of payment. You do not need to give a reason. Read the <a href="${origin}/refund/">refund policy</a>.</p>
    <p>The seller is ${seller}.</p>
    <p>This site is not U.S. Customs and Border Protection. For the blank form, use <a href="${blankForm}">the free CBP PDF</a>.</p>
    `,
  },
  {
    slug: 'privacy',
    title: 'Privacy policy | cbpform3299.com',
    description:
      'How cbpform3299.com handles what you type. The draft stays in your browser. The paid PDF is built after Stripe confirms payment and is not stored.',
    body: `
    <p>${finePrint} <a href="mailto:${email}">${email}</a></p>
    <p>This policy is from ${seller}, the seller of cbpform3299.com. Last updated 5 November 2026.</p>
    <h2>What the form collects</h2>
    <p>The form collects only what you type or select:</p>
    <ul>
      <li>your name (last name, first name, and middle initial) and date of birth</li>
      <li>a U.S. address</li>
      <li>travel details: date of arrival, port of arrival, and the vessel or flight</li>
      <li>names of household members you enter</li>
      <li>shipment details: date the goods arrive, carrier, country the goods are sent from, bill of lading or air waybill number, number of containers, and marks and numbers</li>
      <li>the residency category you select, the country you enter, and any length of stay you enter</li>
      <li>dates you enter if you mark the personnel or evacuee section</li>
      <li>the article boxes you mark, and any item description, value, and place and date acquired</li>
      <li>whether you sign as the importer or as an agent, the date, and an agent or firm name if you type one</li>
    </ul>
    <p>The form does not ask for a passport number or a Social Security number.</p>
    <p>Those answers stay in your browser. They are sent to the payment check only for the moment it takes to build the PDF.</p>
    <p>We do not store those answers on a server.</p>
    <h2>Hosting</h2>
    <p>This site is hosted on GitHub Pages (GitHub, Inc.). The payment check runs on Cloudflare Workers (Cloudflare, Inc.). Like any web host, they receive your IP address and basic browser details when you visit, to deliver the site and keep it secure, under their own privacy policies.</p>
    <p><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub privacy policy</a>. <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a>.</p>
    <p>Stripe takes the payment on Stripe's own site and receives your name, email and card details under its own privacy policy. We do not receive your card number. <a href="https://stripe.com/privacy">https://stripe.com/privacy</a></p>
    <h2>Analytics</h2>
    <p>We do not use advertising cookies. If you choose Accept Analytics, we use Google Analytics (Google LLC) to count visits and see which pages are used. Google receives your IP address and device details and sets analytics cookies, under Google's privacy policy. If you choose Essential Only, Google Analytics does not load. You can change your choice at any time using the cookie settings link in the footer. The form draft uses your browser's local storage, which is not an advertising cookie. <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
    <h2>What we keep</h2>
    <p>If you email us, we keep your email and any Stripe receipt you send for as long as we need to handle your request, refunds and tax records. Stripe keeps payment records under its own policy.</p>
    <h2>Your rights</h2>
    <p>You can ask us for a copy of the personal information we hold about you, or ask us to correct or delete it, by emailing <a href="mailto:${email}">${email}</a>. We will reply within 30 days. We may need to keep some payment records where the law requires it. If you are in the EU or UK, you can also complain to your local data protection authority.</p>
    <h2>Children</h2>
    <p>This service is for adults 18 and older.</p>
    <h2>Erasing the draft</h2>
    <p>On the fill-in tool, use "Reset / Clear Data" or "Erase draft on this device" to delete the draft from this browser.</p>
    `,
  },
  {
    slug: 'terms',
    title: 'Terms of use | cbpform3299.com',
    description:
      'Terms for the independent CBP Form 3299 fill-in tool at cbpform3299.com. Not a government service. The clean PDF is a one-time $4.99 charge.',
    body: `
    <p>${finePrint} <a href="mailto:${email}">${email}</a></p>
    <p>These terms are between you and ${seller} ("we") for cbpform3299.com. Last updated 5 November 2026.</p>
    <h2>1. What this is</h2>
    <p>A helper that places answers you type onto CBP Form 3299. It is not CBP, DHS, or any other government agency. The blank form is free from CBP at <a href="${blankForm}">cbp.gov</a>.</p>
    <p>You choose every answer. The tool only places your answers on the form. It does not decide whether you qualify for anything, and it does not choose a category for you.</p>
    <h2>2. Not advice</h2>
    <p>Everything on this site, including the guides and FAQ, is general information, not legal, tax or customs advice. We do not provide customs brokerage. You must check your answers before you sign the form. A carrier, broker, or customs officer may still ask you to change it.</p>
    <h2>3. Price</h2>
    <p>The clean PDF costs $4.99, paid once through Stripe. There is no subscription. The watermarked preview and the packing-list PDF are free.</p>
    <h2>4. Refunds</h2>
    <p>The <a href="${origin}/refund/">refund policy</a> is part of these terms. You can ask for a full refund within 14 days of payment by email. You do not need to give a reason.</p>
    <h2>5. Your responsibility</h2>
    <p>You must be 18 or older. You must not use the tool to make a false statement to customs.</p>
    <h2>6. Acceptance of the file</h2>
    <p>We do not guarantee that a carrier, a broker, or a government office will accept the file.</p>
    <h2>7. As is</h2>
    <p>The service is provided as is.</p>
    <h2>8. Limit on liability</h2>
    <p>Our liability is limited to the $4.99 you paid, except where the law does not allow that limit.</p>
    <h2>9. Changes to these terms</h2>
    <p>We may update these terms, and the version shown when you paid applies to your purchase.</p>
    <h2>10. Governing law</h2>
    <p>These terms are governed by the laws of the State of ${governingState}, United States. If you are a consumer in the EU, the UK or another country with mandatory consumer protection laws, you keep the rights those laws give you, and nothing in these terms takes them away.</p>
    <h2>11. Contact</h2>
    <p>Email <a href="mailto:${email}">${email}</a>.</p>
    `,
  },
  {
    slug: 'refund',
    title: 'Refund policy | cbpform3299.com',
    description:
      'Full refund of the $4.99 within 14 days if you email the seller. No reason required. No letter from a broker or mover.',
    body: `
    <p>You can ask for a full refund of the $4.99 within 14 days of payment.</p>
    <p>Email <a href="mailto:${email}">${email}</a> and include your Stripe receipt if you have it. You do not need to give a reason. You do not need a letter from a mover, a carrier, or a broker.</p>
    <p>We will refund the full $4.99 to the original payment method.</p>
    <p>If something went wrong, email us before you ask your card company to dispute the charge. We would rather refund you ourselves, and a refund is usually faster than a dispute.</p>
    <p>The seller is ${seller}.</p>
    `,
  },
];

for (const entry of pages) {
  const file = resolve('public', entry.slug, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(entry));
  console.log(`wrote ${file}`);
}
