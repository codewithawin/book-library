import express from "express";
import { createBook } from "../controllers/bookController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, createBook);

export default router;
