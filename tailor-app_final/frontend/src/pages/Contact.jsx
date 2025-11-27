import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send data to backend or email service
    console.log(form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mt-20 mb-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
      <div className="bg-white shadow rounded-xl p-8 md:p-12">
        {submitted && (
          <p className="mb-4 text-green-600 font-semibold text-center">
            Thank you! We will get back to you soon.
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="border px-4 py-3 rounded w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="border px-4 py-3 rounded w-full"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="border px-4 py-3 rounded w-full md:col-span-2"
            rows={5}
            required
          />
          <button
            type="submit"
            className="md:col-span-2 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded font-semibold transition"
          >
            Send Message
          </button>
        </form>

        {/* Optional: Contact Info */}
        <div className="mt-10 grid md:grid-cols-3 gap-6 text-gray-700">
          <div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p>support@yourtailor.com</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p>123 Fashion Street, Chennai, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
