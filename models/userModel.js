const pool = require('../config/db');

// Get all users
const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

// Add a new user
const addUser = async (name, email, membership_start_date) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, membership_start_date) VALUES ($1, $2, $3) RETURNING *',
    [name, email, membership_start_date]
  );
  return result.rows[0];
};

module.exports = { getAllUsers, addUser };
