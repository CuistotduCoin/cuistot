
exports.up = knex => (
  knex.schema.table('gourmets', (table) => {
    table.string('username', 100).notNullable();
  })
);

exports.down = knex => (
  knex.schema.table('gourmets', (table) => {
    table.dropColumn('username');
  })
);
