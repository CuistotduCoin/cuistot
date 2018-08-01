import { findFirstWhere, insertObject, deleteObject } from './utils';

const TABLE_NAME = 'evaluations';

async function getEvaluation(args) {
  const result = await findFirstWhere(TABLE_NAME, args.booking_id, 'booking_id');
  return result;
}

async function createEvaluation(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function deleteEvaluation(args) {
  const result = await deleteObject(TABLE_NAME, args.booking_id, 'booking_id');
  return result;
}

export { getEvaluation, createEvaluation, deleteEvaluation };
