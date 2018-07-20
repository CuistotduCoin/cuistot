import { getSingleRow } from './utils';

async function getWorkshop(args) {
  const result = await getSingleRow('workshops', args.workshop_id);
  return result;
}

export { getWorkshop };
