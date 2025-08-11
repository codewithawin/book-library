import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/:userId", getUser);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
