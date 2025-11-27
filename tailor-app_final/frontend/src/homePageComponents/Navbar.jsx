import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setAuthModal }) {
  const [openUser, setOpenUser] = useState(false);
  const [openMen, setOpenMen] = useState(false);
  const [openWomen, setOpenWomen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const menRef = useRef(null);
  const womenRef = useRef(null);
  const userRef = useRef(null);

  // Fetch cart count
  useEffect(() => {
    if (!user) return;

    const fetchCartCount = async () => {
      try {
        const endpoint =
          user.role === "admin"
            ? "http://localhost:5000/api/booking/all"
            : "http://localhost:5000/api/booking/user";

        const res = await fetch(endpoint, { credentials: "include" });
        const data = await res.json();
        if (res.ok) setCartCount(data.length || 0);
      } catch (err) {
        console.log("Cart fetch failed:", err.message);
      }
    };

    fetchCartCount();
  }, [user]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menRef.current && !menRef.current.contains(event.target)) setOpenMen(false);
      if (womenRef.current && !womenRef.current.contains(event.target)) setOpenWomen(false);
      if (userRef.current && !userRef.current.contains(event.target)) setOpenUser(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Utility for dropdown items hover effect
  const dropdownItemClass =
    "block px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white transition";

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 py-3 md:py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-purple-700 hover:text-purple-800 transition">
          Chrups
        </Link>

        {/* LINKS */}
        <ul className="hidden md:flex items-center gap-8 font-semibold text-gray-800">
          {/* MEN */}
          <li className="relative" ref={menRef}>
            <p
              className="cursor-pointer flex items-center gap-1 px-2 py-1 hover:text-purple-600 transition"
              onClick={() => setOpenMen(!openMen)}
            >
              Men <FaCaretDown />
            </p>
            {openMen && (
              <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-xl w-48 px-4 py-3 space-y-2 z-50">
                <Link to="/men/kurtas" className={dropdownItemClass}>Kurtas</Link>
                <Link to="/men/shirts" className={dropdownItemClass}>Shirts</Link>
                <Link to="/men/suits" className={dropdownItemClass}>Suits</Link>
              </div>
            )}
          </li>

          {/* WOMEN */}
          <li className="relative" ref={womenRef}>
            <p
              className="cursor-pointer flex items-center gap-1 px-2 py-1 hover:text-purple-600 transition"
              onClick={() => setOpenWomen(!openWomen)}
            >
              Women <FaCaretDown />
            </p>
            {openWomen && (
              <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-xl w-48 px-4 py-3 space-y-2 z-50">
                <Link to="/women/sarees" className={dropdownItemClass}>Sarees</Link>
                <Link to="/women/blouses" className={dropdownItemClass}>Blouses</Link>
                <Link to="/women/lehengas" className={dropdownItemClass}>Lehenga</Link>
                <Link to="/women/salwars" className={dropdownItemClass}>Salwar</Link>
              </div>
            )}
          </li>

          <li>
            <Link to="/about" className="hover:text-purple-600 transition">About</Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-purple-600 transition">Blog</Link>
          </li>
          <li>
            <Link to="/fabric" className="hover:text-purple-600 transition">Fabric</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-purple-600 transition">Contact</Link>
          </li>
        </ul>

        {/* RIGHT SIDE: CART + USER */}
        <div className="flex items-center gap-5 md:gap-6">

          {/* CART ICON */}
          {user && (
            <div
              className="relative cursor-pointer text-gray-700 hover:text-purple-600 transition"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          )}

          {/* USER MENU */}
          <div className="relative" ref={userRef}>
            <button
              className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-purple-600 transition"
              onClick={() => setOpenUser(!openUser)}
            >
              <FaUserCircle size={30} />
              {loading ? (
                <span className="font-medium">Loading...</span>
              ) : user ? (
                <span className="font-medium">Hi, {user.name.split(" ")[0]}</span>
              ) : (
                <span className="font-medium">Hi, Guest</span>
              )}
              <FaCaretDown />
            </button>

            {openUser && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-xl w-48 px-4 py-3 space-y-2 z-50">
                {user ? (
                  <>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p
                      className="hover:text-red-600 cursor-pointer transition"
                      onClick={() => {
                        logout();
                        setOpenUser(false);
                      }}
                    >
                      Logout
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      className="hover:text-purple-600 cursor-pointer transition"
                      onClick={() => {
                        setAuthModal("login");
                        setOpenUser(false);
                      }}
                    >
                      Login
                    </p>
                    <p
                      className="hover:text-purple-600 cursor-pointer transition"
                      onClick={() => {
                        setAuthModal("signup");
                        setOpenUser(false);
                      }}
                    >
                      Sign Up
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
