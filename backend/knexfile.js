const baseConfig = {
  client: 'postgresql',
  connection: {
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: { tableName: 'knex_migrations' },
};

module.exports = {
  development: { ...baseConfig },
  production: { ...baseConfig },
};
