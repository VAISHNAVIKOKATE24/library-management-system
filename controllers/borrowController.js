const borrowService = require('../services/borrowService');

// Validate borrow input
const validateBorrowFields = (user_id, book_id) => {
  if (!user_id || !book_id) {
    throw new Error('Missing required fields: user_id and book_id are required.');
  }
};

// Borrow a book
const borrowBook = async (req, res) => {
  const { user_id, book_id } = req.body;
  try {
    // Validate input fields
    validateBorrowFields(user_id, book_id);

    const borrowRecord = await borrowService.borrowBook(user_id, book_id);
    res.status(201).json(borrowRecord);
  } catch (err) {
    res.status(400).send({ message: 'Error borrowing book', error: err.message });
  }
};

// Return a borrowed book
const returnBook = async (req, res) => {
  const { user_id, book_id } = req.body;
  try {
    // Validate input fields
    validateBorrowFields(user_id, book_id);

    const borrowRecord = await borrowService.returnBook(user_id, book_id);
    res.json(borrowRecord);
  } catch (err) {
    res.status(400).send({ message: 'Error returning book', error: err.message });
  }
};

module.exports = { borrowBook, returnBook };
