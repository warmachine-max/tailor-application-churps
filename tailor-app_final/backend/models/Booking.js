import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productType: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },

    productTitle: String,
    productImage: String,

    name: String,
    phone: String,
    email: String,
    notes: String,

    // UPDATED STATUS ENUM
    status: {
      type: String,
      enum: [
        "pending",     // customer requested
        "confirmed",   // admin accepted
        "rejected",    // admin rejected
        "completed",   // stitching finished
        "delivered"    // customer received
      ],
      default: "pending",
    },

    adminMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
