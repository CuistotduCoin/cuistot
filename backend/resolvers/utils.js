import connection from '../knexfile';

const knex = require('knex')(connection[process.env.NODE_ENV]); // eslint-disable-line

async function getSingleRow(tableName, id, idField = 'id') {
  let result;
  try {
    const query = knex(tableName).where(idField, id).first();
    result = await query;
    if (!result) {
      return { userError: 'resource not found' };
    }
    return { data: result };
  } catch (err) {
    console.error(err);
  }
  return {};
}

async function insertObject(tableName, args) {
  let result;
  try {
    const query = knex(tableName).insert(args).returning('*');
    result = await query;
    if (!result.length) {
      return { userError: 'failure' };
    }
    return { data: result[0], message: 'success' };
  } catch (err) {
    console.error(err);
  }
  return {};
}

async function deleteObject(tableName, id, idField = 'id') {
  let result;
  try {
    result = await getSingleRow(tableName, id, idField);
    if (result.userError) {
      return result;
    }
    const query = knex(tableName).where(idField, id).del();
    result = await query;
    if (result === 0) {
      return { userError: 'failure' };
    }
    return { message: 'success' };
  } catch (err) {
    console.error(err);
  }
  return {};
}

export { getSingleRow, insertObject, deleteObject };
