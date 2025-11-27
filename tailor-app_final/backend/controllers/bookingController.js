import MenKurtaScema from "../models/men/MenKurtaScema.js";
import MenSuitSchema from "../models/men/MenSuitSchema.js";
import MenShirtSchema from "../models/men/menShirtSchema.js";

import WomenBlouseSchema from "../models/women/WomenBlouseSchema.js";
import WomenSareeSchema from "../models/women/WomenSareeSchema.js";
import WomenLehengaShema from "../models/women/WomenLehengaSchema.js";
import WomenSalwarSchema from "../models/women/WomenSalwarSchema.js";

import Booking from "../models/Booking.js";
const productSchemas = {
  MenKurta: MenKurtaScema,
  MenSuit: MenSuitSchema,
  MenShirt: MenShirtSchema,
  WomenBlouse: WomenBlouseSchema,
  WomenSaree: WomenSareeSchema,
  WomenLehenga: WomenLehengaShema,
  WomenSalwar: WomenSalwarSchema,
};

export const createBooking = async (req, res) => {
  console.log("Booking Request Body:", req.body); // Debugging line
  try {
    const { productId, productType, notes,phone } = req.body;

    const Schema = productSchemas[productType];
    if (!Schema) return res.status(400).json({ message: "Invalid product type" });

    const product = await Schema.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const booking = await Booking.create({
      user: req.user._id,
      productType,
      productId,
      productTitle: product.title,
      productImage: product.image?.url,
      name: req.user.name,
      phone:  phone,
      email: req.user.email,
      notes,
      status: "pending",
    });

    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminUpdateBooking = async (req, res) => {
  try {
    const { status, adminMessage } = req.body;

    // VALID STATUS VALUES
    const validStatuses = [
      "pending",
      "confirmed",
      "rejected",
      "completed",
      "delivered"
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // UPDATE DETAILS
    booking.status = status;
    booking.adminMessage = adminMessage || "";

    await booking.save();

    return res.json({
      message: `Booking updated to ${status}`,
      booking,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteBooking = async (req, res) => {
 // console.log("Delete Booking Request Params:", req.params); // Debugging line
  try {
    
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // // Ensure only the owner can delete
    // if (booking.user.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "Not authorized to delete this booking" });
    // }

    await booking.deleteOne()
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





