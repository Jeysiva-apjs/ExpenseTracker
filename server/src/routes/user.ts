import express from "express";
import { User } from "../database/models";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { z } from "zod";

const SECRET = process.env.SECRET as string;
const router = express.Router();

const signupInput = z.object({
  userName: z
    .string()
    .min(3, "User name must be atleast 3 characters")
    .max(50, "User name must be less than 50 characters"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(50, "Password must be less than 50 characters"),
});

router.post("/signup", async (req, res) => {
  const parsedInput = signupInput.safeParse(req.body);

  if (!parsedInput.success) {
    console.log(parsedInput.error.errors[0].message);
    res.json({ error: parsedInput.error.errors[0].message });
    return;
  }

  const userName = parsedInput.data.userName;
  const password = parsedInput.data.password;

  const existingUser = await User.findOne({ userName: userName });
  if (existingUser) {
    res.json({ error: "User already exists" });
  } else {
    const newUser = new User({ userName, password });
    await newUser.save();
    console.log(newUser);
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1hr" });
    res
      .status(201)
      .json({ message: "User created successfully", token: token });
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName, password });
  if (!user) {
    res.json({ error: "Invalid user name or password" });
    return;
  }

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1hr" });
  res.status(200).json({ message: "Logged in successfully", token: token });
});

export default router;
