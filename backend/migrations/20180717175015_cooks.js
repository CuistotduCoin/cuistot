exports.up = knex => (
  knex.schema.createTable('cooks', (table) => {
    table.uuid('id')
      .primary()
      .references('id')
      .inTable('gourmets')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .index();
    table.boolean('is_pro')
      .notNullable()
      .defaultTo(false);
    table.string('business_name', 100);
    table.string('siren', 9);
    table.string('pro_email', 256);
    table.string('legal_first_name', 100);
    table.string('legal_last_name', 100);
    table.date('legal_birthdate');
    table.timestamps(true, true);
  })
);

exports.down = knex => knex.schema.dropTable('cooks');
