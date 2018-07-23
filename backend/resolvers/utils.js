import connection from '../knexfile';

const knex = require('knex')(connection[process.env.NODE_ENV]); // eslint-disable-line

async function getSingleRow(tableName, id) {
  let result;
  try {
    const query = knex(tableName).where('id', id).first();
    result = await query;
  } catch (err) {
    console.log(err);
  }
  return result;
}

export { getSingleRow };
