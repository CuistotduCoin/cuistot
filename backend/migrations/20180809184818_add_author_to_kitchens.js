exports.up = knex => (
  knex.schema.table('kitchens', (table) => {
    table.uuid('author_id')
      .notNullable()
      .references('id')
      .inTable('gourmets')
      .onUpdate('CASCADE');
  })
);

exports.down = knex => (
  knex.schema.table('kitchens', (table) => {
    table.dropColumn('author_id');
  })
);
