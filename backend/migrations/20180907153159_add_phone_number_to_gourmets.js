exports.up = knex => (
  knex.schema.table('gourmets', (table) => {
    table.string('phone_number', 15);
  })
);

exports.down = knex => (
  knex.schema.table('gourmets', (table) => {
    table.dropColumn('phone_number');
  })
);
