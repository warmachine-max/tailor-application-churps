import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Suits() {
  const [suits, setSuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Admin create suit popup states
  const [showForm, setShowForm] = useState(false);
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { user, refreshUser } = useAuth();
  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer";

  // --------------------------
  // FETCH ALL SUITS
  // --------------------------
  useEffect(() => {
    const fetchSuits = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/men/suits");
        const data = await res.json();
        setSuits(data.suits || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuits();
  }, []);

  // --------------------------
  // DELETE SUIT (ADMIN ONLY)
  // --------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this suit?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/men/suit/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuits(suits.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // --------------------------
  // CREATE SUIT (ADMIN ONLY)
  // --------------------------
  const handleCreateSuit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");

    setUploading(true);

    const formData = new FormData();
    formData.append("price", price);
    formData.append("notes", notes);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/men/suit/create", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuits([...suits, data.suit]);
      resetForm();
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setPrice("");
    setNotes("");
    setImage(null);
    setPreview(null);
    setShowForm(false);
  };

  // --------------------------
  // ADD TO CART (CUSTOMER ONLY)
  // --------------------------
  const handleAddToCart = async (suit) => {
    if (!user) return alert("Please login first to add to cart!");

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: suit._id,
          quantity: 1,
          price: suit.price,
          imageUrl: suit.image?.url || "",
          category: "suit",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Suit added to cart!");
      await refreshUser(); // update cart count in navbar
    } catch (err) {
      alert(err.message);
    }
  };

  // --------------------------
  // HANDLE IMAGE SELECTION
  // --------------------------
  const handleImageSelect = (file) => {
    if (!file) return;

    if (image) {
      alert("Image already selected. Remove it to select new.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  if (loading) return <p className="text-center mt-10">Loading suits...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="relative max-w-7xl mx-auto px-6 py-10">
      {/* ---------- Create Suit Popup Form (Admin Only) ---------- */}
      {isAdmin && showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <form
            onSubmit={handleCreateSuit}
            className="bg-white p-6 rounded-lg shadow-xl w-80"
          >
            <h2 className="text-xl font-semibold mb-4">Create Suit</h2>

            <input
              type="number"
              placeholder="Price"
              className="border p-2 w-full mb-3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <textarea
              placeholder="Notes"
              className="border p-2 w-full mb-3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <label className="block font-medium mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full mb-2"
              onChange={(e) => handleImageSelect(e.target.files[0])}
              required
            />

            {preview && (
              <div className="mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md shadow"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setPreview(null);
                  }}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
                >
                  Remove Image
                </button>
              </div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={uploading}
                className={`px-4 py-2 text-white rounded ${
                  uploading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {uploading ? "Uploading..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------- Suit Cards ---------- */}
      {suits.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No suits available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {suits.map((suit) => (
            <div
              key={suit._id}
              className="border rounded-xl shadow hover:shadow-lg p-4 relative"
            >
              <img
                src={suit.image?.url || "/placeholder.png"}
                alt="Suit"
                className="w-full h-64 object-cover rounded-md mb-4"
              />

              <p className="font-semibold text-lg">₹{suit.price}</p>
              <p className="text-gray-600">{suit.notes || "No notes"}</p>

              {/* CUSTOMER ONLY — Add to Cart */}
              {isCustomer && (
                <button
                  onClick={() => handleAddToCart(suit)}
                  className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              )}

              {/* ADMIN ONLY — Delete */}
              {isAdmin && (
                <button
                  onClick={() => handleDelete(suit._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ---------- Floating + Button (Admin Only) ---------- */}
      {isAdmin && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-xl text-3xl flex justify-center items-center hover:bg-blue-700"
        >
          +
        </button>
      )}
    </div>
  );
}
