const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',              // or the mysql user you created
  password: 'GMU Sleep-Tracker', // put your mysql password here
  database: 'sleep_tracker',
});

module.exports = pool;