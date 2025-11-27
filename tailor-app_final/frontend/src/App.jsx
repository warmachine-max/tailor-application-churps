import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"

import Kurta from "./collection/men/Kurta"
import Shirt from "./collection/men/Shirt"
import Suits from "./collection/men/Suits"

import Blouse from "./collection/women/Blouse"
import Saree from "./collection/women/Saree"
import Lehenga from "./collection/women/Lehenga"
import Salwar from "./collection/women/Salwar"
import Cart from "./homePageComponents/Cart"

import About from "./homePageComponents/navBarComponents/About"
import Blog from "./homePageComponents/navBarComponents/Blog"

import KidsWear from "./homePageComponents/navBarComponents/blogCategories/KidsWear"
import EthnicWear from "./homePageComponents/navBarComponents/blogCategories/EthnicWear"
import WomensWear from "./homePageComponents/navBarComponents/blogCategories/WomensWear"
import MensWear from "./homePageComponents/navBarComponents/blogCategories/MensWear"
import BridalFashion from "./homePageComponents/navBarComponents/blogCategories/BridalFashion"
import MatchingIdeas from "./homePageComponents/navBarComponents/blogCategories/MatchingIdeas"
import CurrentTrend from "./homePageComponents/navBarComponents/blogCategories/CurrentTrend"
import FashionTips from "./homePageComponents/navBarComponents/blogCategories/FashionTips"

import Contact from "./pages/Contact"

import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Routes>

        <Route path="/" element={<HomePage />} />
      
        {/* ---------------------- MEN ---------------------- */}
        <Route path="/men/kurtas" element={<Kurta />} />
        <Route path="/men/shirts" element={<Shirt />} />
        <Route path="/men/suits" element={<Suits />} />

        
        {/* ---------------------- WOMEN ---------------------- */}

        <Route path="/women/blouses" element={<Blouse />} />
        <Route path="/women/sarees" element={<Saree />} />
        <Route path="/women/lehengas" element={<Lehenga />} />
        <Route path="/women/salwars" element={<Salwar />} />

        {/* ---------------------- CART ---------------------- */}
        <Route path="/cart" element={<Cart />} />

        {/* ---------------------- OTHERS ---------------------- */}
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />

        {/* ---------------------- BLOG CATEGORIES ---------------------- */}
        <Route path="/blog/kids-wear" element={<KidsWear />} />
        <Route path="/blog/ethnic-wear" element={<EthnicWear />} />
        <Route path="/blog/womens-wear" element={<WomensWear />} />
        <Route path="/blog/mens-wear" element={<MensWear />} />
        <Route path="/blog/bridal-fashion" element={<BridalFashion />} />
        <Route path="/blog/matching-ideas" element={<MatchingIdeas />} />
        <Route path="/blog/current-trends" element={<CurrentTrend />} />
        <Route path="/blog/fashion-tips" element={<FashionTips />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>
    </AuthProvider>
  )
}

export default App
