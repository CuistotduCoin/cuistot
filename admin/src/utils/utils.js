import { regex } from 'react-admin';

const validateZipCode = regex(/^\d{5}$/, 'Must be a valid Zip Code');

export { validateZipCode }; // eslint-disable-line
