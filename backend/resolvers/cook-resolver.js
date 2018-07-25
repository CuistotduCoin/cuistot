import { getSingleRow, insertObject } from './utils';

const TABLE_NAME = 'cooks';

async function getCook(args) {
  const result = await getSingleRow(TABLE_NAME, args.cook_id);
  return result;
}

async function createCook(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

export { getCook, createCook };
