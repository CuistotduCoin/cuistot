const faker = require('faker'); // eslint-disable-line
const uuidv4 = require('uuid/v4'); // eslint-disable-line
const { seedData } = require('../utils/seeds/utils');

faker.seed(1000);

const createGourmet = knex => (
  knex('gourmets').insert({
    id: uuidv4(),
    username: faker.internet.userName(),
    email: faker.internet.exampleEmail(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    gender: 'M',
    birthdate: faker.date.past(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    zip_code: faker.address.zipCode(),
    description: faker.lorem.sentence(),
  })
);

exports.seed = seedData('gourmets', createGourmet);
