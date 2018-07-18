const NUM_RECORDS_TO_CREATE = {
  cooks: 3,
  kitchens: 7,
  workshops: 6,
  bookings: 3,
  evaluations: 2,
};

exports.seedData = (tableName, createRecordCallback) =>
  (knex, Promise) =>
    knex(tableName).del().then(() => {
      console.log(`seeding ${tableName}...`);
      const records = [];
      const numToCreate = NUM_RECORDS_TO_CREATE[tableName] || 10;
      for (let i = 0; i < numToCreate; i++) {
        records.push(createRecordCallback(knex, i));
      }
      return Promise.all(records);
    });
