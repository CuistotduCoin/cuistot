exports.up = knex => (
  knex.schema.table('workshops', (table) => {
    table.boolean('confirmed').notNullable().defaultTo(false);
  })
);

exports.down = knex => (
  knex.schema.table('workshops', (table) => {
    table.dropColumn('confirmed');
  })
);
