const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: '060911',
  port: 5432,
  database: 'DBEmpresa',
});

module.exports = pool;
