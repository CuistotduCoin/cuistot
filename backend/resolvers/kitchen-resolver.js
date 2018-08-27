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
    getKitchen({ kitchen_id: updateArgs.id }),
    updateObject(TABLE_NAME, updateArgs),
  );
  return result;
}

async function deleteKitchen(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...deleteArgs } = args;
  const result = await performOperation(
    args,
    getKitchen({ kitchen_id: deleteArgs.id }),
    deleteObject(TABLE_NAME, deleteArgs.id),
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
