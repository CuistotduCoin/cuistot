import {
  findFirstWhere,
  insertObject,
  deleteObject,
  updateObject,
  performOperation,
  performPagination,
} from './utils';

const TABLE_NAME = 'evaluations';

async function getEvaluation(args) {
  const result = await findFirstWhere(TABLE_NAME, args.evaluation_id);
  return result;
}

async function getEvaluations(args) {
  const result = await performPagination(TABLE_NAME, args);
  return result;
}

async function createEvaluation(args) {
  const result = await insertObject(TABLE_NAME, args);
  return result;
}

async function updateEvaluation(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...updateArgs } = args;
  const result = performOperation(
    args,
    getEvaluation({ evaluation_id: updateArgs.id }),
    updateObject(TABLE_NAME, updateArgs),
  );
  return result;
}

async function deleteEvaluation(args) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId, ...deleteArgs } = args;
  const result = await performOperation(
    args,
    getEvaluation({ evaluation_id: deleteArgs.id }),
    deleteObject(TABLE_NAME, deleteArgs.id),
  );
  return result;
}

export {
  getEvaluation,
  getEvaluations,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
};
