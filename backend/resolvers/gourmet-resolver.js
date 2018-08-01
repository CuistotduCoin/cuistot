import {
  findFirstWhere,
  findWhere,
  insertObject,
  updateObject,
  deleteObject,
} from './utils';

const TABLE_NAME = 'gourmets';

async function getGourmet(args) {
  const result = await findFirstWhere(TABLE_NAME, args.gourmet_id);
  return result;
}

async function getGourmetBookings(args) {
  const result = await findWhere('bookings', args.gourmet_id, 'gourmet_id');
  return result;
}

async function createGourmet(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function updateGourmet(args) {
  const result = await updateObject(TABLE_NAME, args);
  return result;
}

async function deleteGourmet(args) {
  const result = await deleteObject(TABLE_NAME, args.gourmet_id);
  return result;
}

export {
  getGourmet,
  getGourmetBookings,
  createGourmet,
  updateGourmet,
  deleteGourmet,
};
