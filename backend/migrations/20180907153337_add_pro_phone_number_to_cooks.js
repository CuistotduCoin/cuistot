exports.up = knex => (
  knex.schema.table('cooks', (table) => {
    table.string('pro_phone_number', 15).notNullable();
  })
);

exports.down = knex => (
  knex.schema.table('cooks', (table) => {
    table.dropColumn('pro_phone_number');
  })
);
