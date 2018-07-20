const connection = require('../knexfile');

const knex = require('knex')(connection[process.env.NODE_ENV]);

async function getWorkshop(args) {
  try {
    const getWorkshopQuery = knex('workshops')
      .where('id', args.workshop_id)
      .first();
    const result = await getWorkshopQuery;
    return result
  } catch (err) {
    console.log(err);
  }
}

module.exports.getWorkshop = getWorkshop;
