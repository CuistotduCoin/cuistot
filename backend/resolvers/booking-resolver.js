import { findFirstWhere, insertObject, updateObject, deleteObject } from './utils';

const TABLE_NAME = 'bookings';

async function getBooking(args) {
  const result = await findFirstWhere(TABLE_NAME, args.booking_id);
  return result;
}

async function createBooking(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function updateBooking(args) {
  const result = await updateObject(TABLE_NAME, args);
  return result;
}

async function deleteBooking(args) {
  const result = await deleteObject(TABLE_NAME, args.booking_id);
  return result;
}

export { getBooking, createBooking, updateBooking, deleteBooking };
