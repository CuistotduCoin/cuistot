import connection from '../knexfile';
import { getSingleRow, insertObject, deleteObject, updateObject } from './utils';

const knex = require('knex')(connection[process.env.NODE_ENV]); // eslint-disable-line

const TABLE_NAME = 'workshops';

async function getWorkshop(args) {
  const result = await getSingleRow(TABLE_NAME, args.workshop_id);
  return result;
}

async function getWorkshops() {
  let result;
  try {
    const query = knex(TABLE_NAME);
    result = await query;
  } catch (err) {
    console.log(err);
  }
  return { items: result };
}

async function getWorkshopBookings(args) {
  let result;
  try {
    const query = knex('bookings').where('workshop_id', args.workshop_id);
    result = await query;
  } catch (err) {
    console.log(err);
  }
  return { data: result };
}

async function createWorkshop(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function updateWorkshop(args) {
  const result = await updateObject(TABLE_NAME, args);
  return result;
}

async function deleteWorkshop(args) {
  const result = await deleteObject(TABLE_NAME, args.workshop_id);
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
