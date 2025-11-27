import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createBooking, getUserBookings, getAllBookings, adminUpdateBooking,deleteBooking } from "../controllers/bookingController.js";

const router = express.Router();

// Customer creates booking
router.post("/book", protect, createBooking);

// Customer fetches own bookings
router.get("/user", protect, getUserBookings);

// Admin fetch all bookings
router.get("/all", protect, admin, getAllBookings);

// Admin update booking status + message
router.patch("/:id/status", protect, admin, adminUpdateBooking);

router.delete("/:id/delete",  deleteBooking)


export default router;
