import { getSingleRow, insertObject } from './utils';

const TABLE_NAME = 'kitchens';

async function getKitchen(args) {
  const result = await getSingleRow(TABLE_NAME, args.kitchen_id);
  return result;
}

async function createKitchen(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

export { getKitchen, createKitchen };
