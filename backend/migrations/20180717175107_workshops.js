exports.up = knex => (
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').createTable('workshops', (table) => {
    table.uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary()
      .index();
    table.string('name', 100);
    table.float('price').notNullable();
    table.integer('duration').notNullable(); // minutes
    table.integer('min_gourmet').notNullable();
    table.integer('max_gourmet').notNullable();
    table.text('description');
    table.json('images');
    table.integer('mango_wallet_id');
    table.dateTime('date').notNullable();
    table.uuid('kitchen_id')
      .notNullable()
      .references('id')
      .inTable('kitchens')
      .onUpdate('CASCADE');
    table.uuid('cook_id')
      .notNullable()
      .references('id')
      .inTable('cooks')
      .onUpdate('CASCADE')
      .index();
    table.timestamps(true, true);
  }).then(() => {
    knex.raw('ALTER TABLE workshops ADD CONSTRAINT gourmet_count_constraint CHECK(min_gourmet <= max_gourmet);').then();
  })
);

exports.down = knex => knex.schema.dropTable('workshops');
