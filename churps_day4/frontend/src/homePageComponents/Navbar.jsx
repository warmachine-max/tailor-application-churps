import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import masterLogo from "../../tailorHomePageImage/masterLogo.png";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar({ setAuthModal }) {
  const [openUser, setOpenUser] = useState(false);
  const [openMen, setOpenMen] = useState(false);
  const [openWomen, setOpenWomen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { user, loading, logout } = useAuth();

  const menRef = useRef(null);
  const womenRef = useRef(null);
  const userRef = useRef(null);

  // Fetch cart count for logged-in users
  useEffect(() => {
    if (!user) return;

    const fetchCartCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart/count", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setCartCount(data.count || 0);
      } catch (err) {
        console.log("Cart fetch failed:", err.message);
      }
    };

    fetchCartCount();
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menRef.current && !menRef.current.contains(event.target)) setOpenMen(false);
      if (womenRef.current && !womenRef.current.contains(event.target)) setOpenWomen(false);
      if (userRef.current && !userRef.current.contains(event.target)) setOpenUser(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <img src={masterLogo} className="w-28" />

        {/* LINKS */}
        <ul className="hidden md:flex items-center gap-10 text-black font-semibold">

          {/* MEN */}
          <li className="relative" ref={menRef}>
            <p className="cursor-pointer py-2 flex items-center gap-1" onClick={() => setOpenMen(!openMen)}>
              Men <FaCaretDown />
            </p>
            {openMen && (
              <div className="absolute left-0 top-full mt-1 bg-white shadow-xl rounded-xl w-48 px-5 py-4 space-y-3 z-50">
                <Link to="/men/kurtas" className="hover:text-blue-600 block">Kurtas</Link>
                <Link to="/men/shirts" className="hover:text-blue-600 block">Shirts</Link>
                <Link to="/men/suits" className="hover:text-blue-600 block">Suits</Link>
              </div>
            )}
          </li>

          {/* WOMEN */}
          <li className="relative" ref={womenRef}>
            <p className="cursor-pointer py-2 flex items-center gap-1" onClick={() => setOpenWomen(!openWomen)}>
              Women <FaCaretDown />
            </p>
            {openWomen && (
              <div className="absolute left-0 top-full mt-1 bg-white shadow-xl rounded-xl w-48 px-5 py-4 space-y-3 z-50">
                <Link to="/women/sarees" className="hover:text-blue-600 block">Sarees</Link>
                <Link to="/women/blouses" className="hover:text-blue-600 block">Blouses</Link>
                <Link to="/women/lehenga" className="hover:text-blue-600 block">Lehenga</Link>
                <Link to="/women/salwars" className="hover:text-blue-600 block">Salwar</Link>
              </div>
            )}
          </li>

          <li className="hover:text-blue-600 cursor-pointer">Blog</li>
          <li className="hover:text-blue-600 cursor-pointer">Fabric</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
        </ul>

        {/* RIGHT SIDE: CART + USER */}
        <div className="flex items-center gap-6">

          {/* CART ICON */}
          {user && user.role === "customer" && (
            <Link to="/cart" className="relative">
              <FaShoppingCart size={26} className="text-gray-700" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-[1px] rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* USER MENU */}
          <div className="relative" ref={userRef}>
            <button className="flex items-center gap-1 cursor-pointer text-gray-700" onClick={() => setOpenUser(!openUser)}>
              <FaUserCircle size={32} />

              {loading ? (
                <span className="font-semibold">Loading...</span>
              ) : user ? (
                <span className="font-semibold">Hi, {user.name.split(" ")[0]}</span>
              ) : (
                <span className="font-semibold">Hi, Guest</span>
              )}

              <FaCaretDown />
            </button>

            {openUser && (
              <div className="absolute right-0 top-full mt-1 bg-white shadow-xl rounded-xl w-48 px-5 py-4 space-y-3 z-50">
                {user ? (
                  <>
                    <p className="font-semibold">{user.name}</p>
                    <p
                      className="hover:text-red-600 cursor-pointer"
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
                      className="hover:text-blue-600 cursor-pointer"
                      onClick={() => {
                        setAuthModal("login");
                        setOpenUser(false);
                      }}
                    >
                      Login
                    </p>
                    <p
                      className="hover:text-blue-600 cursor-pointer"
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
