exports.up = knex => (
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').createTable('workshops', (table) => {
    table.uuid('id')
      .primary()
      .references('id')
      .inTable('template')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .index();
    table.integer('mango_wallet_id');
    table.dateTime('date').notNullable();
    table.string('state').notNullable().defaultTo('PUBLISH');
    table.uuid('kitchen_id')
      .notNullable()
      .references('id')
      .inTable('kitchens')
      .onUpdate('CASCADE');
    table.timestamps(true, true);
  }).then(() => {
    knex.raw("ALTER TABLE workshops ADD CONSTRAINT state_constraint CHECK(state='PUBLISH' OR state='CANCEL' OR state='CONFIRM' OR state='DONE');").then();
  })
);

exports.down = knex => knex.schema.dropTable('workshops');