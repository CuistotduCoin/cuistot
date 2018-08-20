const faker = require('faker'); // eslint-disable-line
const { seedData } = require('../utils/seeds/utils');
const { randomElement } = require('../utils/utils');

faker.seed(1000);

const createKitchen = knex => (
  knex.select('id').from('cooks').then((cooks) => {
    const cookId = randomElement(cooks).id;
    return knex('kitchens').insert({
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      zip_code: faker.address.zipCode(),
      author_id: cookId,
    });
  })
);

exports.seed = seedData('kitchens', createKitchen);
