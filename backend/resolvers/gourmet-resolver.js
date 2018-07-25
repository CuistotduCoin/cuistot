import { getSingleRow, insertObject } from './utils';

const TABLE_NAME = 'gourmets';

async function getGourmet(args) {
  const result = await getSingleRow(TABLE_NAME, args.gourmet_id);
  return result;
}

async function createGourmet(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

export { getGourmet, createGourmet };
