import connection from '../knexfile';
import { getSingleRow } from './utils';

const knex = require('knex')(connection[process.env.NODE_ENV]); // eslint-disable-line

const TABLE_NAME = 'workshops';

async function getWorkshop(args) {
  const result = await getSingleRow(TABLE_NAME, args.workshop_id);
  return result;
}

async function getWorkshops() {
  let result;
  try {
    const query = knex(TABLE_NAME);
    result = await query;
  } catch (err) {
    console.log(err);
  }
  return { items: result };
}

export { getWorkshop, getWorkshops };
