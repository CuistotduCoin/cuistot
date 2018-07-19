exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('gourmets', table => {
      table.increments('id');
      table.string('email', 255).notNullable();
      table.string('first_name', 100).notNullable();
      table.string('last_name', 100).notNullable();
      table.json('picture');
      table.specificType('gender', 'CHAR(1)');
      table.date('birthdate');
      table.string('address', 100);
      table.string('city', 100);
      table.string('zip_code', 10);
      table.specificType('location', 'POINT').defaultTo(knex.raw('POINT (48.390394, -4.486076)'));
      table.text('description');
      table.timestamps(true, true);
    }),
    knex.schema.raw("ALTER TABLE gourmets ADD CONSTRAINT gender_constraint CHECK(gender='F' OR gender='M' OR gender='U');"),
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('gourmets');
};
