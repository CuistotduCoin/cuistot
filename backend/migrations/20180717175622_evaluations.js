exports.up = knex => (
  knex.schema.createTable('evaluations', (table) => {
    table.uuid('booking_id')
      .primary()
      .references('id')
      .inTable('bookings')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .index();
    table.float('rating').notNullable();
    table.text('comment').notNullable();
    table.timestamps(true, true);
  })
);

exports.down = knex => knex.schema.dropTable('evaluations');
