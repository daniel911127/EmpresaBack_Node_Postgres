const { Pool } = require('pg');

const pool = new Pool({
  user: 'daniel',
  host: 'localhost',
  password: '060911River.',
  port: 5432,
  database: 'dbempresa',
});

module.exports = pool;
