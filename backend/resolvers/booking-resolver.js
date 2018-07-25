import { getSingleRow, insertObject } from './utils';

const TABLE_NAME = 'bookings';

async function getBooking(args) {
  const result = await getSingleRow(TABLE_NAME, args.booking_id);
  return result;
}

async function createBooking(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

export { getBooking, createBooking };
