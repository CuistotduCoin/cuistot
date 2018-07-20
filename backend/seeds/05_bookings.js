const faker = require('faker');
const { seedData } = require('../utils/seeds/utils');

faker.seed(1000);

const createBooking = (knex, i) => (
  knex.select('id').from('gourmets').then((gourmets) => (
    knex.select('id').from('workshops').then((workshops) => {
      const gourmetId = gourmets[i].id;
      const workshopId = workshops[i].id;
      return knex('bookings').insert({
        gourmet_id: gourmetId,
        workshop_id: workshopId,
      });
    })
  ))
);

exports.seed = seedData('bookings', createBooking);