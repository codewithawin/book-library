import express from "express";
import {
  createBook,
  getBookById,
  getBooks,
} from "../controllers/bookController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, createBook);
router.get("/", verifyToken, getBooks);
router.get("/:id", verifyToken, getBookById);

export default router;
