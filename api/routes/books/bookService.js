'use strict';

const { model: Book } = require('./bookModel');

exports.createBook = async (bookData) => {
  const book = new Book(bookData);
  try {

    const newBook = await book.save();
    return newBook;
  } catch (e) {
    throw e;
  }
};

exports.listBooks = async (id) => {
  try {
    const allBooks = await Book.find({userId: id});
    return allBooks;
  } catch (e) {
    throw e;
  }
};

exports.getBookById = async (bookId) => {
  try {
    const book = await Book.findById(bookId);
    return book;
  } catch (e) {
    throw e;
  }
}

exports.deleteBook = async(bookId) => {
  try {
    const book = await Book.findByIdAndDelete(bookId);
    return book;
  } catch (e) {
    throw e;
  }
}

exports.editBook = async (bookId, update) => {
  try {
    const book = await Book.findByIdAndUpdate(bookId, update);
    return book;
  } catch (e) {
    throw e;
  }
}