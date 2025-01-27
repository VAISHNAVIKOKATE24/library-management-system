const pool = require('../config/db');

// Borrow a book
const borrowBook = async (userId, bookId) => {
  const bookResult = await pool.query('SELECT availability FROM books WHERE id = $1', [bookId]);
  const book = bookResult.rows[0];
  if (!book || !book.availability) {
    throw new Error('Book is not available');
  }

  const result = await pool.query(
    'INSERT INTO borrowings (user_id, book_id) VALUES ($1, $2) RETURNING *',
    [userId, bookId]
  );

  await pool.query('UPDATE books SET availability = FALSE WHERE id = $1', [bookId]);

  return result.rows[0];
};

// Return a borrowed book
const returnBook = async (userId, bookId) => {
  const borrowResult = await pool.query('SELECT * FROM borrowings WHERE user_id = $1 AND book_id = $2 AND return_date IS NULL', [userId, bookId]);
  if (borrowResult.rows.length === 0) {
    throw new Error('Borrowing record not found');
  }

  const borrowId = borrowResult.rows[0].id;
  await pool.query('UPDATE borrowings SET return_date = CURRENT_TIMESTAMP WHERE id = $1', [borrowId]);
  await pool.query('UPDATE books SET availability = TRUE WHERE id = $1', [bookId]);

  return borrowResult.rows[0];
};

module.exports = { borrowBook, returnBook };
