const bookModel = require('../models/bookModel');

// Get all books
const getAllBooks = async () => {
  return await bookModel.getAllBooks();
};

// Get book by ID
const getBookById = async (id) => {
  return await bookModel.getBookById(id);
};

// Add a new book
const addBook = async (title, author, published_year, genre) => {
  return await bookModel.addBook(title, author, published_year, genre);
};

// Update book details
const updateBook = async (id, title, author, published_year, genre) => {
  return await bookModel.updateBook(id, title, author, published_year, genre);
};

// Delete a book
const deleteBook = async (id) => {
  return await bookModel.deleteBook(id);
};

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook };
