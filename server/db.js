const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'sleepapp',          // use the user you created (recommended)
  password: 'StrongPass123!',// your password
  database: 'sleep_tracker',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
