const faker = require('faker'); // eslint-disable-line
const { seedData } = require('../utils/seeds/utils');

faker.seed(1000);

const createEvaluation = (knex, i) => (
  knex.select('id').from('bookings').then((bookings) => {
    const bookingId = bookings[i].id;
    return knex('evaluations').insert({
      booking_id: bookingId,
      rating: faker.random.number() % 5,
      comment: faker.lorem.sentence(),
    });
  })
);

exports.seed = seedData('evaluations', createEvaluation);
