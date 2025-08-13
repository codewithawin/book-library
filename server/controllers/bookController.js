import Book from "../models/bookModel.js";
import { errorHandler } from "../utils/error.js";

export const createBook = async (req, res, next) => {
  try {
    const newBook = new Book({ userId: req.user.id, ...req.body });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req, res, next) => {
  const search = req.query.search || "";
  const regex = new RegExp(search, "i");

  try {
    const books = await Book.find({
      userId: req.user.id,
      $or: [{ title: regex }, { author: regex }, { genre: regex }],
    }).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!book) {
      return next(errorHandler(404, "Book not found!"));
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  const { title, author, genre, yearPublished, description } = req.body;

  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!book) {
      return next(errorHandler(404, "Book not found!"));
    }

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.genre = genre ?? book.genre;
    book.yearPublished = yearPublished ?? book.yearPublished;
    book.description = description ?? book.description;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!book) {
      return next(errorHandler(404, "Book not found!"));
    }
    res.json({ message: "Book deleted!" });
  } catch (error) {
    next(error);
  }
};
