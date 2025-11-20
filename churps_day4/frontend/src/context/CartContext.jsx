import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // 🔥 Fetch user's cart from backend
  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/user", {
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) return;

      setCartItems(data.cart || []);
      setCartCount(data.cart?.length || 0);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Only once when app loads
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
