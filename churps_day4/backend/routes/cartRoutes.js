import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

// ADD ITEM TO CART
router.post("/add", protect, addToCart);

// GET USER CART
router.get("/", protect, getCart);

// REMOVE ITEM
router.delete("/:id", protect, removeFromCart);

export default router;
