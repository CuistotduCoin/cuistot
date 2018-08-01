exports.up = knex => (
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').createTable('kitchens', (table) => {
    table.uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary()
      .index();
    table.string('name', 100);
    table.string('address', 100).notNullable();
    table.string('city', 100).notNullable();
    table.string('zip_code', 10).notNullable();
    table.specificType('location', 'POINT').defaultTo(knex.raw('POINT (48.390394, -4.486076)')).notNullable();
    table.timestamps(true, true);
  })
);

exports.down = knex => knex.schema.dropTable('kitchens');
