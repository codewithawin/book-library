import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["available", "borrowed", "lost"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
