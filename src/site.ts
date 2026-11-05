import config from '../site.config.json' with { type: 'json' };

/** Seller identity. Replace the values in site.config.json, then rebuild. */
export const SELLER_NAME = config.sellerName;
export const SELLER_CONTACT_EMAIL = config.sellerEmail;
export const SELLER_ADDRESS = config.sellerAddress;
export const GOVERNING_STATE = config.governingState;
