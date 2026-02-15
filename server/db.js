const mysql = require('mysql2/promise');

require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,              // or the mysql user you created
  password: process.env.DB_PASSWORD, // put your mysql password here
  database: process.env.DB_NAME,
});

module.exports = pool;