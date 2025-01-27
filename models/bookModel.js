const pool = require('../config/db');

// Get all books
const getAllBooks = async () => {
  const result = await pool.query('SELECT * FROM books');
  return result.rows;
};

// Get a book by ID
const getBookById = async (id) => {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  return result.rows[0];
};

// Add a new book
const addBook = async (title, author, published_year, genre) => {
  const result = await pool.query(
    'INSERT INTO books (title, author, published_year, genre, availability) VALUES ($1, $2, $3, $4, TRUE) RETURNING *',
    [title, author, published_year, genre]
  );
  return result.rows[0];
};

// Update a book
const updateBook = async (id, title, author, published_year, genre) => {
  const result = await pool.query(
    'UPDATE books SET title = $1, author = $2, published_year = $3, genre = $4 WHERE id = $5 RETURNING *',
    [title, author, published_year, genre, id]
  );
  return result.rows[0];
};

// Delete a book
const deleteBook = async (id) => {
  const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook };
