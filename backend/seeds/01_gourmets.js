const faker = require('faker');
const { seedData } = require('../utils/seeds/utils');

faker.seed(1000);

const createGourmet = (knex) => (
  knex('gourmets').insert({
    email: faker.internet.exampleEmail(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    gender: 'M',
    birthdate: faker.date.past(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    zip_code: faker.address.zipCode(),
    description: faker.lorem.sentence()
  })
);

exports.seed = seedData('gourmets', createGourmet);