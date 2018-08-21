import {
  findFirstWhere,
  findWhere,
  insertObject,
  updateObject,
  deleteObject,
  performOperation,
  getConnection,
} from './utils';

const TABLE_NAME = 'gourmets';

async function getGourmet(args) {
  const result = await findFirstWhere(TABLE_NAME, args.gourmet_id);
  return result;
}

async function getGourmets(args) {
  const result = await getConnection(TABLE_NAME, args);
  return result;
}

async function getGourmetBookings(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...otherArgs } = args;
  let result = await performOperation(
    args,
    getGourmet({ gourmet_id: otherArgs.gourmet_id }),
    findWhere('bookings', otherArgs.gourmet_id, 'gourmet_id'),
    'id',
  );
  if (result.userError) {
    result = { bookings: [] };
  }
  return result;
}

async function createGourmet(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function updateGourmet(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...updateArgs } = args;
  const result = await performOperation(
    args,
    getGourmet({ gourmet_id: updateArgs.id }),
    updateObject(TABLE_NAME, updateArgs),
    'id',
  );
  return result;
}

async function deleteGourmet(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...deleteArgs } = args;
  const result = await performOperation(
    args,
    getGourmet({ gourmet_id: deleteArgs.id }),
    deleteObject(TABLE_NAME, deleteArgs.id),
    'id',
  );
  return result;
}

export {
  getGourmet,
  getGourmets,
  getGourmetBookings,
  createGourmet,
  updateGourmet,
  deleteGourmet,
};
