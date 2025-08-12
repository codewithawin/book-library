import Book from "../models/bookModel.js";

export const createBook = async (req, res, next) => {
  try {
    const newBook = new Book({ userId: req.user.id, ...req.body });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    next(error);
  }
};
