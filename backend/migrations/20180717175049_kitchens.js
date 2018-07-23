exports.up = knex => (
  knex.schema.createTable('kitchens', (table) => {
    table.increments('id');
    table.string('name', 100);
    table.string('address', 100).notNullable();
    table.string('city', 100).notNullable();
    table.string('zip_code', 10).notNullable();
    table.specificType('location', 'POINT').defaultTo(knex.raw('POINT (48.390394, -4.486076)')).notNullable();
    table.timestamps(true, true);
  })
);

exports.down = knex => knex.schema.dropTable('kitchens');
