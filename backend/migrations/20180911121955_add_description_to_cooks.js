exports.up = knex => (
  knex.schema.table('cooks', (table) => {
    table.text('description');
  })
);

exports.down = knex => (
  knex.schema.table('cooks', (table) => {
    table.dropColumn('description');
  })
);
