// Initialize mysql module
const mysql = require('mysql2/promise');

// Create database connection using dotenv data.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Export
module.exports = {
  query: (sql, params) => pool.execute(sql, params),
  pool
};
