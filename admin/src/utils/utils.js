import { regex } from 'react-admin';

const validateZipCode = regex(/^\d{5}$/, 'Must be a valid zip code');

export { validateZipCode }; // eslint-disable-line
