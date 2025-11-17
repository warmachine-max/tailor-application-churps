import express from "express";
import upload from "../middleware/upload.js";
import {
  createBlouse,
  deleteBlouse,
  createSaree,
  deleteSaree,
  createLehenga,
  deleteLehenga,
  createSalwar,
  deleteSalwar,
  //getAllWomenItems
} from "../controllers/womenController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------------------- BLOUSE ---------------------- */
router.post(
  "/blouse/create",
  protect,
  admin,
  upload.single("image"),
  createBlouse
);

router.delete("/blouse/:id", protect, admin, deleteBlouse);

/* ---------------------- SAREE ---------------------- */
router.post(
  "/saree/create",
  protect,
  admin,
  upload.single("image"),
  createSaree
);

router.delete("/saree/:id", protect, admin, deleteSaree);

/* ---------------------- LEHENGA ---------------------- */
router.post(
  "/lehenga/create",
  protect,
  admin,
  upload.single("image"),
  createLehenga
);

router.delete("/lehenga/:id", protect, admin, deleteLehenga);

/* ---------------------- SALWAR ---------------------- */
router.post(
  "/salwar/create",
  protect,
  admin,
  upload.single("image"),
  createSalwar
);

router.delete("/salwar/:id", protect, admin, deleteSalwar);



export default router;
