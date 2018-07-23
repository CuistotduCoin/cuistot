const faker = require('faker'); // eslint-disable-line
const { seedData } = require('../utils/seeds/utils');

faker.seed(1000);

const createKitchen = knex => (
  knex('kitchens').insert({
    name: faker.company.companyName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    zip_code: faker.address.zipCode(),
  })
);

exports.seed = seedData('kitchens', createKitchen);
