exports.up = knex => (
  knex.schema.createTable('workshops', (table) => {
    table.increments('id');
    table.string('name', 100);
    table.float('price').notNullable();
    table.integer('duration').notNullable(); // minutes
    table.integer('min_gourmet').notNullable();
    table.integer('max_gourmet').notNullable();
    table.text('description');
    table.json('pictures');
    table.dateTime('date').notNullable();
    table.integer('kitchen_id')
      .notNullable()
      .references('id')
      .inTable('kitchens')
      .onDelete('CASCADE')
      .index();
    table.integer('cook_id')
      .notNullable()
      .references('id')
      .inTable('cooks')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  }).then(() => {
    knex.raw('ALTER TABLE workshops ADD CONSTRAINT gourmet_count_constraint CHECK(min_gourmet <= max_gourmet);').then();
  })
);

exports.down = knex => knex.schema.dropTable('workshops');
