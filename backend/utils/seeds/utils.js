const NUM_RECORDS_TO_CREATE = {
  gourmets: 4,
  cooks: 2,
  kitchens: 4,
  workshops: 5,
  bookings: 3,
  evaluations: 2,
};

exports.seedData = (tableName, createRecordCallback) => (
  (knex, Promise) => (
    knex(tableName).del().then(() => {
      console.log(`seeding ${tableName}...`);
      const records = [];
      const numToCreate = NUM_RECORDS_TO_CREATE[tableName];
      for (let i = 0; i < numToCreate; i++) {
        records.push(createRecordCallback(knex, i));
      }
      return Promise.all(records);
    })
  )
);
