import { regex } from 'react-admin';
import { isValidNumber } from 'libphonenumber-js';

const validateZipCode = regex(/^\d{5}$/, 'Must be a valid zip code');
const validatePhoneNumber = value => (
  !value || isValidNumber(value, 'FR') ? undefined : 'Numéro de téléphone invalide'
);

export { validateZipCode, validatePhoneNumber };
