import React from "react";

// Feature Icons
import customMeasurement from "../../tailorHomePageImage/customMeasurement.jpg";
import affordablePrices from "../../tailorHomePageImage/aa.jpg";
import quickDelivery from "../../tailorHomePageImage/aab.jpg";
import psq from "../../tailorHomePageImage/premiumStichingQuality.jpg";

// Brands
import raymond from "../../tailorHomePageImage/ba.png";
import jane from "../../tailorHomePageImage/bb.png";
import mark from "../../tailorHomePageImage/bc.jpg";

// Categories
import saree from "../../tailorHomePageImage/ca.jpg";
import suit from "../../tailorHomePageImage/cb.jpg";
import kids from "../../tailorHomePageImage/cc.jpg";

const MiddleHomePage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 mt-10">

      {/* WHY CHOOSE US */}
      <h2 className="text-3xl font-semibold text-center mb-14">
        Why Choose Churps?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {[
          { img: customMeasurement, text: "Custom Measurement" },
          { img: affordablePrices, text: "Affordable & Transparent Pricing" },
          { img: quickDelivery, text: "Quick Delivery & Easy Pickup" },
          { img: psq, text: "Premium Stitching Quality" }
        ].map((item, index) => (
          <div key={index}>
            <img
              src={item.img}
              className="w-32 h-32 mx-auto rounded-xl object-cover"
            />
            <p className="mt-4 font-semibold">{item.text}</p>
          </div>
        ))}
      </div>

      {/* TRUST SECTION */}
      <div className="text-center mt-24">
        <h3 className="text-4xl font-bold">2000+ Happy Customers</h3>
        <p className="mt-2 text-gray-600 text-lg">
          Delivering perfect fits for over 15 years.
        </p>
      </div>

      {/* CATEGORIES */}
      <h2 className="text-3xl font-semibold text-center mt-20 mb-10">
        Popular Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-14">

        <div>
          <img
            src={saree}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
          <p className="mt-4 font-semibold">Women — Saree Finishing / Blouse</p>
        </div>

        <div>
          <img
            src={suit}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
          <p className="mt-4 font-semibold">Men — Shirts / Kurtas / Pants</p>
        </div>

        <div>
          <img
            src={kids}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
          <p className="mt-4 font-semibold">Kids — Uniform Stitching</p>
        </div>

      </div>

      {/* BRANDS */}
      <h2 className="text-3xl font-semibold text-center mt-20 mb-8">
        Fabric Trusted by Top Brands
      </h2>

      <div className="flex items-center justify-center gap-20 opacity-80">
        <img src={raymond} className="w-32" />
        <img src={jane} className="w-32" />
        <img src={mark} className="w-32" />
      </div>

    </div>
  );
};

export default MiddleHomePage;
