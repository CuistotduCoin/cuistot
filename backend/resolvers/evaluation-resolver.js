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
    updateObject(TABLE_NAME, updateArgs),
    'author_id',
    getEvaluation({ evaluation_id: updateArgs.id }),
  );
  return result;
}

async function deleteEvaluation(args) {
  const result = await performOperation(
    args,
    deleteObject(TABLE_NAME, args.id),
    'author_id',
    getEvaluation({ evaluation_id: args.id }),
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
