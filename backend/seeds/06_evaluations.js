const faker = require('faker'); // eslint-disable-line
const { seedData } = require('../utils/seeds/utils');
const { randomElement } = require('../utils/utils');

faker.seed(1000);

const createEvaluation = (knex, i) => (
  knex.select('id').from('cooks').then(cooks => (
    knex.select('id').from('gourmets').then((gourmets) => {
      const cookIds = cooks.map(cook => cook.id);
      const authorIds = gourmets.filter(gourmet => !cookIds.includes(gourmet.id));
      const cookId = cookIds[i];
      const authorId = randomElement(authorIds).id;
      return knex('evaluations').insert({
        cook_id: cookId,
        rating: faker.random.number() % 5,
        comment: faker.lorem.sentence(),
        author_id: authorId,
      });
    })
  ))
);

exports.seed = seedData('evaluations', createEvaluation);
