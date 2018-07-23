import { getSingleRow } from './utils';

async function getKitchen(args) {
  const result = await getSingleRow('kitchens', args.kitchen_id);
  return result;
}

export { getKitchen };
