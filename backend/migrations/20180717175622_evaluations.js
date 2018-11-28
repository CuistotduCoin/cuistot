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
    table.uuid('author_id')
      .notNullable()
      .references('id')
      .inTable('gourmets')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.unique(['cook_id', 'author_id']);
    table.integer('rating').notNullable();
    table.text('comment').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  }).then(() => {
    knex.raw('ALTER TABLE evaluations ADD CONSTRAINT rating_constraint CHECK(rating >= 1 AND rating <= 5);').then();
    knex.raw('ALTER TABLE evaluations ADD CONSTRAINT author_constraint CHECK(cook_id != author_id);').then();
  })
);

exports.down = knex => knex.schema.dropTable('evaluations');
