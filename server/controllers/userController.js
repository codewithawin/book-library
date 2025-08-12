import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user!"));
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      },
      { new: true }
    );
    const { password: pass, ...info } = updatedUser._doc;
    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};
