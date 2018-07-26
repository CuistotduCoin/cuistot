import {
  findWhere,
  findFirstWhere,
  insertObject,
  updateObject,
  deleteObject,
} from './utils';

const TABLE_NAME = 'cooks';

async function getCook(args) {
  const result = await findFirstWhere(TABLE_NAME, args.cook_id);
  return result;
}

async function getCookWorkshops(args) {
  const result = await findWhere('workshops', args.cook_id, 'cook_id');
  return result;
}

async function createCook(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function updateCook(args) {
  const result = await updateObject(TABLE_NAME, args);
  return result;
}

async function deleteCook(args) {
  const result = await deleteObject(TABLE_NAME, args.cook_id);
  return result;
}

export {
  getCook,
  createCook,
  deleteCook,
  updateCook,
  getCookWorkshops,
};
