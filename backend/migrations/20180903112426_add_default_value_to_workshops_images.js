exports.up = knex => (
  knex.schema.alterTable('workshops', (t) => {
    t.json('images')
      .notNullable()
      .defaultTo('[]')
      .alter();
  })
);

exports.down = () => null;
