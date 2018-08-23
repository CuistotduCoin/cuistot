exports.up = knex => (
  knex.schema.table('evaluations', (table) => {
    table.uuid('author_id')
      .notNullable()
      .references('id')
      .inTable('gourmets')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.unique(['id', 'author_id']);
  }).then(() => {
    knex.raw('ALTER TABLE evaluations ADD CONSTRAINT author_constraint CHECK(id != author_id);').then();
  })
);

exports.down = knex => (
  knex.schema.table('evaluations', (table) => {
    table.dropUnique(['id', 'author_id']);
    table.dropColumn('author_id');
  })
);
