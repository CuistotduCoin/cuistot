exports.up = knex => (
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').createTable('evaluations', (table) => {
    table.uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary()
      .index();
    table.uuid('cook_id')
      .notNullable()
      .references('id')
      .inTable('cooks')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .index();
    table.float('rating').notNullable();
    table.text('comment').notNullable();
    table.timestamps(true, true);
  })
);

exports.down = knex => knex.schema.dropTable('evaluations');
