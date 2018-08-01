exports.up = knex => (
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').createTable('bookings', (table) => {
    table.uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary()
      .index();
    table.uuid('gourmet_id')
      .notNullable()
      .references('id')
      .inTable('gourmets')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .index();
    table.uuid('workshop_id')
      .notNullable()
      .references('id')
      .inTable('workshops')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .index();
    table.integer('amount').notNullable().defaultTo(1);
    table.unique(['gourmet_id', 'workshop_id']);
    table.timestamps(true, true);
  })
);

exports.down = knex => knex.schema.dropTable('bookings');
