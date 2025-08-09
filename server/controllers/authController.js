import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    username === "" ||
    !email ||
    email === "" ||
    !password ||
    password === ""
  ) {
    console.log("All fields are required!");
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).send("User has been created!");
  } catch (error) {
    console.log(error);
  }
};
