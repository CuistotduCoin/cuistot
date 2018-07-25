import connection from '../knexfile';
import { formatKnexQueryError, cleanKnexQueryArgs, isEmpty } from '../utils/utils';

const knex = require('knex')(connection[process.env.NODE_ENV]); // eslint-disable-line

async function findFirstWhere(tableName, value, field = 'id') {
  try {
    const query = knex(tableName).where(field, value).first();
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

async function findWhere(tableName, value, field = 'id') {
  let result = [];
  try {
    const query = knex(tableName).where(field, value);
    result = await query;
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
  return { data: result };
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

async function deleteObject(tableName, value, field = 'id') {
  try {
    let result = await findFirstWhere(tableName, value, field);
    if (result.userError) {
      return result;
    }
    const query = knex(tableName).where(field, value).del();
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

export {
  findFirstWhere,
  findWhere,
  insertObject,
  deleteObject,
  updateObject,
};
