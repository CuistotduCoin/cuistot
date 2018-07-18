exports.up = function(knex, Promise) {
	return knex.schema.createTable('bookings', table => {
		table.increments('id');
	  table.integer('gourmet_id').notNullable().references('id').inTable('gourmets').onDelete('CASCADE');
	  table.integer('workshop_id').notNullable().references('id').inTable('workshops').onDelete('CASCADE');
	  table.integer('amount').notNullable().defaultTo(1);
	  table.unique(['gourmet_id', 'workshop_id']);
	  table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('bookings');
};
