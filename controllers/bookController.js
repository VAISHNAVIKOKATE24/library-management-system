const bookService = require('../services/bookService');

// Validate input for adding and updating books
const validateBookFields = (title, author, published_year, genre) => {
  if (!title || !author || !published_year || !genre) {
    throw new Error('Missing required fields: title, author, published_year, and genre are all required.');
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving books', error: err.message });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookService.getBookById(id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving book', error: err.message });
  }
};

// Add a new book
const addBook = async (req, res) => {
  const { title, author, published_year, genre } = req.body;
  try {
    // Validate input fields
    validateBookFields(title, author, published_year, genre);

    const newBook = await bookService.addBook(title, author, published_year, genre);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).send({ message: 'Error adding book', error: err.message });
  }
};

// Update book details
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, published_year, genre } = req.body;
  try {
    // Validate input fields
    validateBookFields(title, author, published_year, genre);

    const updatedBook = await bookService.updateBook(id, title, author, published_year, genre);
    if (!updatedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).send({ message: 'Error updating book', error: err.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await bookService.deleteBook(id);
    if (!deletedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error deleting book', error: err.message });
  }
};

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook };
