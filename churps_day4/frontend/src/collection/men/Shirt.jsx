import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Shirt() {
  const [shirts, setShirts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer";

  // FETCH SHIRTS
  useEffect(() => {
    const fetchShirts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/men/shirts");
        const data = await res.json();
        setShirts(data.shirts || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShirts();
  }, []);

  // DELETE SHIRT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/men/shirt/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setShirts(shirts.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // CREATE SHIRT
  const handleCreateShirt = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");

    setUploading(true);

    const formData = new FormData();
    formData.append("price", price);
    formData.append("notes", notes);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/men/shirt/create", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setShirts([...shirts, data.shirt]);
      setShowForm(false);
      setPrice("");
      setNotes("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  // IMG PREVIEW
  const handleImageSelect = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // LOADER
  if (loading)
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-10">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-300 w-24 mb-2 rounded"></div>
            <div className="h-4 bg-gray-300 w-32 rounded"></div>
          </div>
        ))}
      </div>
    );

  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="relative max-w-7xl mx-auto px-6 py-10">

      {/* ---------- Popup Create Shirt ---------- */}
      {isAdmin && showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 backdrop-blur-sm">
          <form
            onSubmit={handleCreateShirt}
            className="bg-white p-6 rounded-xl shadow-xl w-80 border"
          >
            <h2 className="text-xl font-semibold mb-4">Create Shirt</h2>

            <input
              type="number"
              placeholder="Price"
              className="border p-2 w-full mb-3 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <textarea
              placeholder="Notes"
              className="border p-2 w-full mb-3 rounded"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              className="mb-4"
              onChange={(e) => handleImageSelect(e.target.files[0])}
              required
            />

            {preview && (
              <img
                src={preview}
                className="w-full h-40 object-cover rounded mb-4 border"
                alt="Preview"
              />
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={uploading}
                className={`px-4 py-2 text-white rounded ${
                  uploading ? "bg-blue-400" : "bg-blue-600"
                }`}
              >
                {uploading ? "Uploading..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------- Shirt Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shirts.map((shirt) => (
          <div
            key={shirt._id}
            className="border rounded-xl shadow hover:shadow-lg p-4 relative"
          >
            <img
              src={shirt.image?.url || "/placeholder.png"}
              alt="Shirt"
              className="w-full h-64 object-cover rounded-md mb-4"
            />

            <p className="font-semibold text-lg">₹{shirt.price}</p>
            <p className="text-gray-600">{shirt.notes || "No notes"}</p>

            {/* ADMIN DELETE */}
            {isAdmin && (
              <button
                onClick={() => handleDelete(shirt._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}

            {/* CUSTOMER ADD TO CART */}
            {isCustomer && (
              <button
                className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                onClick={async () => {
                  try {
                    const res = await fetch("http://localhost:5000/api/cart/add", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        productId: shirt._id,
                        quantity: 1,
                        price: shirt.price,
                        imageUrl: shirt.image?.url,
                        category: "shirt",
                      }),
                    });

                    const data = await res.json();
                    if (!res.ok) throw new Error(data.message);

                    alert("Shirt added to cart!");
                  } catch (err) {
                    alert(err.message);
                  }
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Floating Add (+) */}
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
