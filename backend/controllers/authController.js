import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.cookie("token", token, { httpOnly: true, maxAge: 7*24*60*60*1000 })
     .status(201)
     .json({ _id: user._id, name: user.name, email: user.email, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id);
  res.cookie("token", token, { httpOnly: true, maxAge: 7*24*60*60*1000 })
     .status(200)
     .json({ _id: user._id, name: user.name, email: user.email, token });
};

export const logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) })
     .status(200)
     .json({ message: "Logged out successfully" });
};
