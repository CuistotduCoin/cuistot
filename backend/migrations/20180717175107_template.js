exports.up = knex => (
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').createTable('template', (table) => {
    table.uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary()
      .index();
    table.string('name', 100);
    table.float('price').notNullable();
    table.integer('duration').notNullable(); // minutes
    table.text('description');
    table.json('images').notNullable().defaultTo('[]');
    table.string('state').notNullable().defaultTo('DRAFT');
    table.string('reason_refuse');
    table.uuid('cook_id')
      .notNullable()
      .references('id')
      .inTable('cooks')
      .onUpdate('CASCADE')
      .index();
    table.timestamps(true, true);
  }).then(() => {
    knex.raw("ALTER TABLE workshops ADD CONSTRAINT state_constraint CHECK(state='DRAFT' OR state='REFUSE' OR state='OK' OR state='DELETE');").then();
  })
);

exports.down = knex => knex.schema.dropTable('template');