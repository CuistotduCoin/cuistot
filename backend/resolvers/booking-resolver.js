import {
  findFirstWhere,
  insertObject,
  updateObject,
  deleteObject,
  performOperation,
  performPagination,
  recreateObject,
} from './utils';

const TABLE_NAME = 'bookings';

async function getBooking(args) {
  const result = await findFirstWhere(TABLE_NAME, args.booking_id, args.is_admin);
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
    updateObject(TABLE_NAME, updateArgs),
    'gourmet_id',
    getBooking({ booking_id: updateArgs.id }),
  );
  return result;
}

async function deleteBooking(args) {
  const result = await performOperation(
    args,
    deleteObject(TABLE_NAME, args.id),
    'gourmet_id',
    getBooking({ booking_id: args.id }),
  );
  return result;
}

async function recreateBooking(args) {
  const result = await recreateObject(TABLE_NAME, args.id);
  return result;
}

export {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  recreateBooking,
};
