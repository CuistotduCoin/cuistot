import connection from '../knexfile';

const knex = require('knex')(connection[process.env.NODE_ENV]); // eslint-disable-line

async function getSingleRow(tableName, id) {
  let result;
  try {
    const query = knex(tableName).where('id', id).first();
    result = await query;
    if (!result) {
      return { userError: 'Resource Not Found' };
    }
  } catch (err) {
    console.error(err);
  }
  return { data: result };
}

export { getSingleRow };
