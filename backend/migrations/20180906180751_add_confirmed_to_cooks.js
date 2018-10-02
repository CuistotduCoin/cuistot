exports.up = knex => (
  knex.schema.table('cooks', (table) => {
    table.boolean('confirmed').notNullable().defaultTo(false);
  })
);

exports.down = knex => (
  knex.schema.table('cooks', (table) => {
    table.dropColumn('confirmed');
  })
);
