import { getSingleRow } from './utils';

async function getCook(args) {
  const result = await getSingleRow('cooks', args.cook_id);
  return result;
}

export { getCook };
