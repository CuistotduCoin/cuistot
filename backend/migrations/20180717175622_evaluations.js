exports.up = function(knex, Promise) {
  return knex.schema.createTable('evaluations', table => {
    table.integer('booking_id').notNullable().primary().references('id').inTable('bookings').onDelete('CASCADE');
    table.float('rating').notNullable();
    table.text('comment').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('evaluations');
};
