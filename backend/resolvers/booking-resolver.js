import { getSingleRow } from './utils';

async function getBooking(args) {
  const result = await getSingleRow('bookings', args.booking_id);
  return result;
}

export { getBooking };
