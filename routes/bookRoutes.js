const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

// Get all books
router.get('/books', bookController.getAllBooks);

// Get a specific book by ID
router.get('/books/:id', bookController.getBookById);

// Add a new book
router.post('/books', bookController.addBook);

// Update book details
router.put('/books/:id', bookController.updateBook);

// Delete a book
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
