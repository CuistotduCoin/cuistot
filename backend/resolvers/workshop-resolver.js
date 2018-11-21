import {
  findFirstWhere,
  findWhere,
  insertObject,
  deleteObject,
  updateObject,
  performOperation,
  performPagination,
  recreateObject,
} from './utils';
import algoliasearch from algoliasearch;

var client = algoliasearch(process.env.ALGOLIASEARCH_SEARCH_APP_ID, process.env.ALGOLIASEARCH_SEARCH_KEY);
var index = client.initIndex(process.env.ALGOLIASEARCH_INDEX);

const TABLE_NAME = 'workshops';

async function getWorkshop(args) {
  const result = await findFirstWhere(TABLE_NAME, args.workshop_id, args.is_admin);
  return result;
}

async function getWorkshops(args) {
  const result = await performPagination(TABLE_NAME, args);
  return result;
}

async function getWorkshopBookings(args) {
  const { is_allowed: isAllowed, ...otherArgs } = args;
  let result;
  if (isAllowed) {
    result = await findWhere('bookings', otherArgs.workshop_id, 'workshop_id');
  } else {
    result = { bookings: [] };
  }
  return result;
}

async function createWorkshop(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function updateWorkshop(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...updateArgs } = args;
  const result = await performOperation(
    args,
    () => updateObject(TABLE_NAME, updateArgs),
    'cook_id',
    () => getWorkshop({ workshop_id: updateArgs.id }),
  );
  if (result && result.data && result.data.confirmed == true) {
    index.saveObject(result.data);
  }
  return result;
}

async function deleteWorkshop(args) {
  const result = await performOperation(
    args,
    () => deleteObject(TABLE_NAME, args.id),
    'cook_id',
    () => getWorkshop({ workshop_id: args.id }),
  );
  if (result && result.data && result.data.confirmed == true) {
    index.deleteObject(result.data);
  }
  return result;
}

async function recreateWorkshop(args) {
  const result = await recreateObject(TABLE_NAME, args.id);
  if (result && result.data && result.data.confirmed == true) {
    index.addObject(result.data);
  }
  return result;
}

async function confirmWorkshop(args) {
  const result = await updateObject(TABLE_NAME, { id: args.id, confirmed: true });
  if (result && result.data && result.data.confirmed == true) {
    index.addObject(result.data);
  }
  return result;
}

export {
  getWorkshop,
  getWorkshops,
  getWorkshopBookings,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  recreateWorkshop,
  confirmWorkshop,
};
