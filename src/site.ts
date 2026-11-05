import config from '../site.config.json' with { type: 'json' };

/** Seller identity. Replace the two values in site.config.json, then rebuild. */
export const SELLER_NAME = config.sellerName;
export const SELLER_CONTACT_EMAIL = config.sellerEmail;
