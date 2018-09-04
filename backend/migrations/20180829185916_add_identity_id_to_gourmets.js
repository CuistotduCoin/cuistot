exports.up = knex => (
  knex.schema.table('gourmets', (table) => {
    table.string('identity_id');
  })
);

exports.down = knex => (
  knex.schema.table('gourmets', (table) => {
    table.dropColumn('identity_id');
  })
);
