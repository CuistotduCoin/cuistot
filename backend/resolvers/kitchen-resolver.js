import {
  findFirstWhere,
  insertObject,
  updateObject,
  deleteObject,
  performOperation,
  performPagination,
} from './utils';

const TABLE_NAME = 'kitchens';

async function getKitchen(args) {
  const result = await findFirstWhere(TABLE_NAME, args.kitchen_id);
  return result;
}

async function getKitchens(args) {
  const result = await performPagination(TABLE_NAME, args);
  return result;
}

async function createKitchen(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function updateKitchen(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...updateArgs } = args;
  const result = await performOperation(
    args,
    updateObject(TABLE_NAME, updateArgs),
    'author_id',
    getKitchen({ kitchen_id: updateArgs.id }),
  );
  return result;
}

async function deleteKitchen(args) {
  const result = await performOperation(
    args,
    deleteObject(TABLE_NAME, args.id),
    'author_id',
    getKitchen({ kitchen_id: args.id }),
  );
  return result;
}

export {
  getKitchen,
  getKitchens,
  createKitchen,
  updateKitchen,
  deleteKitchen,
};
