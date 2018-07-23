import { getSingleRow } from './utils';

async function getGourmet(args) {
  const result = await getSingleRow('gourmets', args.gourmet_id);
  return result;
}

export { getGourmet };
