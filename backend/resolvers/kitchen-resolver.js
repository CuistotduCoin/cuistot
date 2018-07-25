import { findFirstWhere, insertObject, updateObject, deleteObject } from './utils';

const TABLE_NAME = 'kitchens';

async function getKitchen(args) {
  const result = await findFirstWhere(TABLE_NAME, args.kitchen_id);
  return result;
}

async function createKitchen(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function updateKitchen(args) {
  const result = await updateObject(TABLE_NAME, args);
  return result;
}

async function deleteKitchen(args) {
  const result = await deleteObject(TABLE_NAME, args.kitchen_id);
  return result;
}

export { getKitchen, createKitchen, updateKitchen, deleteKitchen };
