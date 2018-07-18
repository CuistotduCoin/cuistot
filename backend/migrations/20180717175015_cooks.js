exports.up = function(knex, Promise) {
  return knex.schema.createTable('cooks', table => {
    table.integer('id').notNullable().primary().references('id').inTable('gourmets').onDelete('CASCADE').index();
    table.boolean('is_pro').notNullable().defaultTo(false);
    table.string('business_name', 100);
    table.string('siren', 9);
    table.string('pro_email', 256);
    table.string('legal_firstname', 100);
    table.string('legal_lastname', 100);
    table.date('legal_birthdate');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cooks');
};
