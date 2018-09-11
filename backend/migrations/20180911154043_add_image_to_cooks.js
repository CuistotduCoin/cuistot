exports.up = knex => (
  knex.schema.table('cooks', (table) => {
    table.json('image');
  })
);

exports.down = knex => (
  knex.schema.table('cooks', (table) => {
    table.dropColumn('image');
  })
);
