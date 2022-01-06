import { readFileSync } from 'fs';

export default {
  client: process.env.SQL_TYPE || 'pg',
  connection: {
    host: process.env.SQL_HOST || 'localhost',
    port: +process.env.SQL_PORT || 5432,
    user: process.env.SQL_USERNAME || 'user',
    password: process.env.SQL_PASSWORD || 'postgres',
    database: process.env.SQL_DBNAME || 'db',
    ssl:
      parseInt(process.env.SQL_USE_SSL || '0') === 1
        ? {
            ca: readFileSync(process.env.SQL_CERT_PATH),
            rejectUnauthorized: false,
          }
        : false,
  },
  pool: {
    min: 1,
    max: 20,
  },
  migrations: {
    tableName: 'migrations',
  },
};
