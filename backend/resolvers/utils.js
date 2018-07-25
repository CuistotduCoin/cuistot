import connection from '../knexfile';
import { formatKnexQueryError, cleanKnexQueryArgs, isEmpty } from '../utils/utils';

const knex = require('knex')(connection[process.env.NODE_ENV]); // eslint-disable-line

async function getSingleRow(tableName, id, idField = 'id') {
  try {
    const query = knex(tableName).where(idField, id).first();
    const result = await query;
    if (result) {
      return { data: result };
    }
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
  return { userError: 'resource not found' };
}

async function insertObject(tableName, args) {
  try {
    const createArgs = cleanKnexQueryArgs(args);
    const query = knex(tableName).insert(createArgs).returning('*');
    const result = await query;
    if (result.length) {
      return { data: result[0], message: 'success' };
    }
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
  return { userError: 'failure' };
}

async function updateObject(tableName, args, idField = 'id') {
  try {
    const updateArgs = cleanKnexQueryArgs(args);
    delete updateArgs[idField];
    if (isEmpty(updateArgs)) {
      return { message: 'not modified' };
    }
    const query = knex(tableName)
      .where(idField, args[idField])
      .update(updateArgs)
      .returning('*');
    const result = await query;
    if (result.length) {
      return { data: result[0], message: 'success' };
    }
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
  return { userError: 'failure' };
}

async function deleteObject(tableName, id, idField = 'id') {
  try {
    let result = await getSingleRow(tableName, id, idField);
    if (result.userError) {
      return result;
    }
    const query = knex(tableName).where(idField, id).del();
    result = await query;
    if (result > 0) {
      return { message: 'success' };
    }
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
  return { userError: 'failure' };
}

export { getSingleRow, insertObject, deleteObject, updateObject };
