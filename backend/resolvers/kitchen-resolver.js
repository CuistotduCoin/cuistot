import { getSingleRow, insertObject, deleteObject } from './utils';

const TABLE_NAME = 'kitchens';

async function getKitchen(args) {
  const result = await getSingleRow(TABLE_NAME, args.kitchen_id);
  return result;
}

async function createKitchen(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function deleteKitchen(args) {
  const result = await deleteObject(TABLE_NAME, args.kitchen_id);
  return result;
}

export { getKitchen, createKitchen, deleteKitchen };
