import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Shirt() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Admin create form
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Booking modal
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingProduct, setBookingProduct] = useState(null);
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookNotes, setBookNotes] = useState("");
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer";
  const navigate = useNavigate();

  const PLACEHOLDER = "/mnt/data/Screenshot 2025-11-22 111052.png";

  /* ------------------ FETCH SHIRTS ------------------ */
  useEffect(() => {
    let mounted = true;
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/men/shirts");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch");
        if (mounted) setItems(data.shirts || []);
      } catch (err) {
        if (mounted) setError(err.message || "Something went wrong");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchItems();
    return () => (mounted = false);
  }, []);

  /* ------------------ IMAGE UPLOAD ------------------ */
  const handleImageSelect = (file) => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ------------------ CREATE SHIRT ------------------ */
  const handleCreateSection = async (e) => {
    e.preventDefault();
    if (!isAdmin) return alert("Only admins can create sections.");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("notes", notes);
      formData.append("price", price);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("http://localhost:5000/api/men/shirt/create", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Create failed");

      setItems((prev) => [...prev, data.shirt]);

      // reset
      setTitle("");
      setNotes("");
      setPrice("");
      setImageFile(null);
      setImagePreview(null);
      setShowAdminForm(false);
    } catch (err) {
      alert(err.message || "Failed to create");
    } finally {
      setUploading(false);
    }
  };

  /* ------------------ DELETE SHIRT ------------------ */
  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm("Delete this shirt section?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/men/shirt/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      setItems((prev) => prev.filter((it) => it._id !== id));
    } catch (err) {
      alert(err.message || "Could not delete");
    }
  };

  /* ------------------ BOOKING ------------------ */
  const openBooking = (product) => {
    if (!user) return navigate("/login");
    if (!isCustomer) return alert("Only customers can book consultations.");

    setBookingProduct(product);
    setBookName(user?.name || "");
    setBookPhone("");
    setBookNotes("");
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!isCustomer) return;
    setBookingSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/booking/book", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: bookingProduct._id,
          productType: "MenShirt",
          notes: bookNotes,
          phone: bookPhone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      alert("Consultation booked successfully!");
      setShowBookingModal(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setBookingSubmitting(false);
    }
  };

  /* ------------------ RENDER ------------------ */
  if (error)
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-center text-red-600 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h1 className="text-4xl font-extrabold text-purple-900">Shirt Collection</h1>
          {isAdmin && (
            <button
              onClick={() => setShowAdminForm(true)}
              className="px-5 py-3 bg-purple-900 text-white rounded-full shadow hover:bg-purple-800 transition"
            >
              + Add Section
            </button>
          )}
        </div>

        {/* Loading / Empty */}
        {loading ? (
          <p className="text-center text-gray-500">Loading shirts...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500">No shirts available.</p>
        ) : (
          items.map((it, idx) => (
            <section
              key={it._id}
              className={`flex flex-col lg:flex-row items-center gap-10 p-6 bg-white rounded-3xl shadow-lg transition hover:shadow-2xl ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text */}
              <div className="w-full lg:w-1/2 space-y-4">
                <h2 className="text-2xl font-bold text-purple-800 uppercase">{it.title}</h2>
                <p className="text-gray-700 leading-relaxed">{it.notes}</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {user ? (
                    <button
                      onClick={() => openBooking(it)}
                      className="px-6 py-2 bg-purple-900 text-white rounded-full hover:bg-purple-800 transition"
                    >
                      Book Consultation
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                    >
                      Login to Book
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(it._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {/* Image */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <img
                  src={it.image?.url || PLACEHOLDER}
                  alt={it.title}
                  className="rounded-3xl shadow-xl w-full max-w-md object-cover transition transform hover:scale-105"
                />
              </div>
            </section>
          ))
        )}
      </div>

      {/* ---------------- Admin Modal ---------------- */}
      {showAdminForm && isAdmin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <form className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4" onSubmit={handleCreateSection}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Add New Shirt</h3>
              <button type="button" onClick={() => setShowAdminForm(false)}>✕</button>
            </div>
            <input type="text" placeholder="Shirt Title" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" required />
            <textarea placeholder="Notes / Description" value={notes} onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" rows={4} />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
            <label className="block text-gray-700 font-medium mt-2">Upload Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageSelect(e.target.files?.[0])} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3 w-full h-44 object-cover rounded-lg shadow-md" />}
            <div className="flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setShowAdminForm(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Cancel</button>
              <button type="submit"
                className="px-4 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition">{uploading ? "Uploading..." : "Create"}</button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- Booking Modal ---------------- */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <form className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4" onSubmit={handleBookingSubmit}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Book Consultation</h3>
              <button type="button" onClick={() => setShowBookingModal(false)}>✕</button>
            </div>
            <input type="text" placeholder="Your Name" value={bookName} onChange={(e) => setBookName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" required />
            <input type="tel" placeholder="Phone Number" value={bookPhone} onChange={(e) => setBookPhone(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" required />
            <textarea placeholder="Notes (optional)" value={bookNotes} onChange={(e) => setBookNotes(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" rows={4} />
            <div className="flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setShowBookingModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Cancel</button>
              <button type="submit"
                className="px-4 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition">{bookingSubmitting ? "Submitting..." : "Confirm Booking"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
