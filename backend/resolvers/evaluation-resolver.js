import { getSingleRow, insertObject } from './utils';

const TABLE_NAME = 'evaluations';

async function getEvaluation(args) {
  const result = await getSingleRow(TABLE_NAME, args.booking_id, 'booking_id');
  return result;
}

async function createEvaluation(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

export { getEvaluation, createEvaluation };
