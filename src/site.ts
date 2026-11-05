import config from '../site.config.json' with { type: 'json' };

/** Seller identity. Replace the values in site.config.json, then rebuild. */
export const SELLER_NAME = config.sellerName;
export const SELLER_CONTACT_EMAIL = config.sellerEmail;
export const LEGAL_ENTITY = config.legalEntity;
export const GOVERNING_STATE = config.governingState;
export const SELLER_FINE_PRINT = `${SELLER_NAME} is a brand of ${LEGAL_ENTITY}.`;
