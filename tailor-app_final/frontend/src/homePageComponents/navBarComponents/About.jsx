import React from "react";

const About = () => {
  return (
    <div className="mt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            About <span className="text-indigo-600">Churps</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A modern tailoring and fashion platform built to bring precision,
            creativity, and convenience to your wardrobe. We blend craftsmanship
            with technology for a seamless experience.
          </p>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Mission */}
          <div className="p-8 bg-white bordered rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To redefine how people experience tailoring and fashion. We aim to
              eliminate the struggle of traditional tailoring by offering a digital
              platform where customers can explore designs, order custom outfits,
              and get precise fittings — all with trust and transparency.
            </p>
          </div>

          {/* Vision */}
          <div className="p-8 bg-white bordered rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become India’s most reliable tailoring partner by combining
              skilled workmanship with modern digital experiences. We envision a
              future where every outfit is personalized, perfectly stitched, and
              delivered with utmost care.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">What We Offer</h2>
          <p className="text-gray-600 mt-2">
            A complete tailoring ecosystem built for both men and women, stitched & unstitched.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Custom Tailoring",
            "Ready-made Collections",
            "Fabric Selection",
            "Measurement Precision",
            "Fast Delivery",
            "Customer-Centric Service"
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md text-center hover:shadow-xl transition-all border"
            >
              <h3 className="text-xl font-semibold text-indigo-600">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg text-center">
            Churps began with a simple idea — making tailoring modern, reliable, and
            accessible. With technology shaping convenience everywhere, we wanted
            to bring the same transformation to fashion and stitching. 
            <br /><br />
            Today, we proudly offer a platform where customers can explore designs,
            choose fabrics, upload measurements, and get tailored outfits with
            unmatched quality.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let’s Craft Something Beautiful Together
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-6">
          Explore designs, customize outfits, or choose from premium-quality garments.
          Your perfect fit is just a click away.
        </p>
        <a
          href="/"
          className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          Explore Collections
        </a>
      </section>
    </div>
  );
};

export default About;
