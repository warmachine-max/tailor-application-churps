import User from "../models/User.js";

// ==========================
// ADD TO CART
// ==========================
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // from protect middleware
    const { productId, price, imageUrl, category } = req.body;

    if (!productId || !price || !category) {
      return res.status(400).json({ message: "Missing product details" });
    }

    const user = await User.findById(userId);

    // Check if product already exists
    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({
        productId,
        price,
        imageUrl,
        category,
      });
    }

    await user.save();

    res.json({ message: "Added to cart", cart: user.cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// GET CART
// ==========================
export const getCart = async (req, res) => {

  try {
    const user = await User.findById(req.user._id);

    res.json({ cart: user.cart });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==========================
// REMOVE FROM CART
// ==========================
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id; // product ID coming from frontend

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // FIX: match productId, not _id
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res.json({
      message: "Item removed from cart",
      cart: user.cart
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

