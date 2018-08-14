import connection from '../knexfile';
import {
  findFirstWhere,
  findWhere,
  insertObject,
  deleteObject,
  updateObject,
  getConnection,
  performOperation,
} from './utils';

const knex = require('knex')(connection[process.env.NODE_ENV]); // eslint-disable-line

const TABLE_NAME = 'workshops';

async function getWorkshop(args) {
  const result = await findFirstWhere(TABLE_NAME, args.workshop_id);
  return result;
}

async function getWorkshops(args) {
  const result = await getConnection(TABLE_NAME, args);
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
    getWorkshop({ workshop_id: updateArgs.id }),
    updateObject(TABLE_NAME, updateArgs),
    'cook_id',
  );
  return result;
}

async function deleteWorkshop(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...deleteArgs } = args;
  const result = await performOperation(
    args,
    getWorkshop({ workshop_id: deleteArgs.id }),
    deleteObject(TABLE_NAME, deleteArgs.id),
    'cook_id',
  );
  return result;
}

export {
  getWorkshop,
  getWorkshops,
  getWorkshopBookings,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
};
