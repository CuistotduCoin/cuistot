exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('gourmets', (table) => {
      table.timestamp('deleted_at');
    }),
    knex.schema.table('cooks', (table) => {
      table.timestamp('deleted_at');
    }),
    knex.schema.table('kitchens', (table) => {
      table.timestamp('deleted_at');
    }),
    knex.schema.table('bookings', (table) => {
      table.timestamp('deleted_at');
    }),
    knex.schema.table('evaluations', (table) => {
      table.timestamp('deleted_at');
    }),
    knex.schema.table('workshops', (table) => {
      table.timestamp('deleted_at');
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table('gourmets', (table) => {
      table.dropColumn('deleted_at');
    }),
    knex.schema.table('cooks', (table) => {
      table.dropColumn('deleted_at');
    }),
    knex.schema.table('kitchens', (table) => {
      table.dropColumn('deleted_at');
    }),
    knex.schema.table('bookings', (table) => {
      table.dropColumn('deleted_at');
    }),
    knex.schema.table('evaluations', (table) => {
      table.dropColumn('deleted_at');
    }),
    knex.schema.table('workshops', (table) => {
      table.dropColumn('deleted_at');
    }),
  ])
);
