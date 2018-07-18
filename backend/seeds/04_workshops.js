const faker = require('faker');
const { seedData } = require('../utils/seeds/utils');
const { randomElement } = require('../utils/utils');

faker.seed(1000);

const createWorkshop = (knex) => (
	knex.select('id').from('kitchens').then((kitchens) => {
  	const kitchenId = randomElement(kitchens).id;
  	return knex.select('id').from('cooks').then((cooks) => {
  		const cookId = randomElement(cooks).id;

  		const minGourmet = faker.random.number() % 4 + 1;
			const maxGourmet = minGourmet + faker.random.number() % 10;
			const duration = faker.random.number() % 120 + 60;

			const newWorkshop = {
				name: faker.lorem.sentence(),
				price: faker.commerce.price(),
				duration: duration,
				min_gourmet: minGourmet,
				max_gourmet: maxGourmet,
				description: faker.lorem.sentences(),
				date: faker.date.future(),
				cook_id: cookId,
				kitchen_id: kitchenId,
			};

			return knex('workshops').insert(newWorkshop);
		});
	})
);

exports.seed = seedData('workshops', createWorkshop);