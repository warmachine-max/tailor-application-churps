import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );


export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({
    name,
    email,
    password,
    role: role || "customer"   // default role
  });

  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7*24*60*60*1000
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7*24*60*60*1000
  });

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token
  });
};

;

export const logout = (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    maxAge: 0
  });
  res.status(200).json({ message: "Logged out successfully" });
};
