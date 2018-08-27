import {
  findFirstWhere,
  insertObject,
  updateObject,
  deleteObject,
  performOperation,
  performPagination,
} from './utils';

const TABLE_NAME = 'bookings';

async function getBooking(args) {
  const result = await findFirstWhere(TABLE_NAME, args.booking_id);
  return result;
}

async function getBookings(args) {
  const result = await performPagination(TABLE_NAME, args);
  return result;
}

async function createBooking(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function updateBooking(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...updateArgs } = args;
  const result = performOperation(
    args,
    getBooking({ booking_id: updateArgs.id }),
    updateObject(TABLE_NAME, updateArgs),
    'gourmet_id',
  );
  return result;
}

async function deleteBooking(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...deleteArgs } = args;
  const result = await performOperation(
    args,
    getBooking({ booking_id: deleteArgs.id }),
    deleteObject(TABLE_NAME, deleteArgs.id),
    'gourmet_id',
  );
  return result;
}

export {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
};
