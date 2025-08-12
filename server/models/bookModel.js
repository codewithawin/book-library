import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    genre: { type: String },
    yearPublished: { type: Number },
    description: { type: String },
  },
  { timestamps: true }
);

const Book = new mongoose.model("Book", bookSchema);

export default Book;
