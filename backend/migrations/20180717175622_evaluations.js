exports.up = knex => (
  knex.schema.createTable('evaluations', (table) => {
    table.uuid('id')
      .notNullable()
      .references('id')
      .inTable('cooks')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .index();
    table.float('rating').notNullable();
    table.text('comment').notNullable();
    table.timestamps(true, true);
  })
);

exports.down = knex => knex.schema.dropTable('evaluations');
