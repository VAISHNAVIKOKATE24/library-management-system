const borrowModel = require('../models/borrowModel');

const borrowBook = async (userId, bookId) => {
  return await borrowModel.borrowBook(userId, bookId);
};

const returnBook = async (userId, bookId) => {
  return await borrowModel.returnBook(userId, bookId);
};

module.exports = { borrowBook, returnBook };
