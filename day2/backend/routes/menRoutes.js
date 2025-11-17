import express from "express";
import upload from "../middleware/upload.js";
import {
  createKurta,
  deleteKurta,
  createShirt,
  deleteShirt,
  createSuit,
  deleteSuit,
  
} from "../controllers/menController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------------------- KURTA ---------------------- */
router.post(
  "/kurta/create",
  protect,
  admin,
  upload.single("image"),
  createKurta
);

router.delete("/kurta/:id", protect, admin, deleteKurta);

/* ---------------------- SHIRT ---------------------- */
router.post(
  "/shirt/create",
  protect,
  admin,
  upload.single("image"),
  createShirt
);

router.delete("/shirt/:id", protect, admin, deleteShirt);

/* ---------------------- SUIT ---------------------- */
router.post(
  "/suit/create",
  protect,
  admin,
  upload.single("image"),
  createSuit
);

router.delete("/suit/:id", protect, admin, deleteSuit);

/* ---------------------- GET ALL ITEMS ---------------------- */


export default router;
