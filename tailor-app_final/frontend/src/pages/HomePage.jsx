import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../homePageComponents/Navbar";
import AuthModal from "../components/AuthModal";

// Hero Slider Images
import hero1 from "./homePageImages/hero1.jpg";
import hero2 from "./homePageImages/hero2.jpeg";
import hero3 from "./homePageImages/hero3.jpg";
import hero5 from "./homePageImages/hero5.jpg";

// Category Images
import category_saree from "./homePageImages/category_saree.jpg";
import category_salwar from "./homePageImages/category_salwar.jpg";
import category_kurta from "./homePageImages/category_kurta.jpg";
import category_blouse from "./homePageImages/blouse.jpg";
import category_lehenga from "./homePageImages/lehenga.jpg";
import category_menPants from "./homePageImages/category_mens_pant.jpg";
import category_shirt from "./homePageImages/category_shirt.jpg";

// Featured Images
import feature_women from "./homePageImages/feature_women.jpg";
import feature_men from "./homePageImages/feature_men.jpg";
import FabricRollextileSewingTheme from "./homePageImages/Fabric rolls, textiles, sewing theme.jpg";

const HomePage = () => {
  const [authModal, setAuthModal] = useState(null);
  const categoryRef = useRef(null);

  const heroImages = [hero1, hero2, hero3, hero5];
  const slideTime = 5;
  const totalDuration = heroImages.length * slideTime;

  const categories = [
    { img: category_saree, title: "Saree", route: "/women/sarees" },
    { img: category_salwar, title: "Salwar", route: "/women/salwars" },
    { img: category_kurta, title: "Kurta", route: "/men/kurtas" },
    { img: category_blouse, title: "Blouse", route: "/women/blouses" },
    { img: category_lehenga, title: "Lehenga", route: "/women/lehengas" },
    // { img: category_menPants, title: "Men's Pants", route: "/men/pants" },
    { img: category_shirt, title: "Men's Shirts", route: "/men/shirts" },
  ];

  const features = [
    {
      img: feature_women,
      title: "Women's Collection",
      desc: "Explore trending sarees, salwars, blouses, and designer outfits.",
    },
    {
      img: feature_men,
      title: "Men's Collection",
      desc: "Premium shirts, tshirts, jeans, and customized tailoring.",
    },
    {
      img: FabricRollextileSewingTheme,
      title: "Premium Fabrics",
      desc: "High-quality fabrics, handpicked for comfort and elegance.",
    },
  ];

  const trendingItems = [
    { title: "Elegant Saree", img: category_saree },
    { title: "Designer Kurta", img: category_kurta },
    { title: "Kids Party Outfit", img: category_blouse },
    { title: "Men's Casual Shirt", img: category_shirt },
  ];

  const advantages = [
    { title: "High Quality", desc: "Top-notch fabrics & stitching.", icon: "✅" },
    { title: "Affordable Prices", desc: "Luxury without breaking budget.", icon: "💰" },
    { title: "Custom Tailoring", desc: "Fits perfectly every time.", icon: "✂️" },
    { title: "Fast Delivery", desc: "Your orders reach quickly.", icon: "🚚" },
  ];

  // Smooth scroll function
  const scrollToCategory = () => {
    if (categoryRef.current) {
      const yOffset = -80; // adjust if navbar is sticky
      const y = categoryRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar setAuthModal={setAuthModal} />

      {/* HERO SLIDER */}
      <div className="w-full mt-3 max-w-7xl mx-auto px-2 relative">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl">
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Hero Slide"
              className="absolute inset-0 w-full h-full object-cover slider-image"
              style={{
                animationDelay: `${index * slideTime}s`,
                animationDuration: `${totalDuration}s`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start px-6 md:px-20 text-white space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">Discover Your Style</h1>
            <p className="text-lg md:text-xl max-w-xl">
              Trendy outfits, premium fabrics, and perfect tailoring – all in one place.
            </p>
            <button
              onClick={scrollToCategory}
              className="bg-purple-700 hover:bg-purple-800 transition px-6 py-2 rounded text-white font-semibold"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY GRID */}
      <div ref={categoryRef} className="max-w-7xl mx-auto px-6 mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={cat.route}
              className="group bg-white rounded-xl shadow hover:shadow-xl transition relative overflow-hidden cursor-pointer"
            >
              <div className="w-full h-28 overflow-hidden rounded-lg">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
              </div>
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-white font-semibold bg-black/50 px-2 rounded">
                {cat.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* FEATURED COLLECTION */}
      <div className="max-w-7xl mx-auto px-6 mt-20 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Collections</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <div
              key={i}
              className="rounded-xl bg-white shadow hover:shadow-2xl transition overflow-hidden"
            >
              <img src={feature.img} alt="" className="w-full h-52 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.desc}</p>
               
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING NOW */}
      <div className="max-w-7xl mx-auto px-6 mt-20 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Trending Now</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {trendingItems.map((item, i) => (
            <div key={i} className="bg-white shadow rounded-xl overflow-hidden group hover:shadow-xl transition">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-7xl mx-auto px-6 mt-20 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {advantages.map((adv, i) => (
            <div
              key={i}
              className="bg-purple-50 p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-3">{adv.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{adv.title}</h3>
              <p className="text-gray-600">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      

      {authModal && <AuthModal type={authModal} close={() => setAuthModal(null)} />}

      <style>
        {`
          @keyframes fadeSlide {
            0% { opacity: 0; }
            8% { opacity: 1; }
            25% { opacity: 1; }
            33% { opacity: 0; }
            100% { opacity: 0; }
          }
          .slider-image {
            opacity: 0;
            animation-name: fadeSlide;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            position: absolute;
            inset: 0;
          }
        `}
      </style>
    </>
  );
};

export default HomePage;
