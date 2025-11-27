import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(null);

  // ================= FETCH BOOKINGS =================
  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const endpoint =
          user.role === "admin"
            ? "http://localhost:5000/api/booking/all"
            : "http://localhost:5000/api/booking/user";

        const res = await fetch(endpoint, { credentials: "include" });
        const data = await res.json();
        if (res.ok) setCartItems(data);
        else console.log("Fetch failed", data.message);
      } catch (err) {
        console.log("Error fetching cart:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // ================= STATUS COUNTS (ADMIN) =================
  const statusCounts = cartItems.reduce((acc, item) => {
    if (["pending", "confirmed", "completed"].includes(item.status)) {
      acc[item.status] = (acc[item.status] || 0) + 1;
    }
    return acc;
  }, { pending: 0, confirmed: 0, completed: 0 });

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    const adminMessage = prompt("Optional message for customer:", "");
    if (!window.confirm(`Are you sure to mark this booking as ${status}?`)) return;

    try {
      setUpdating(true);
      const res = await fetch(`http://localhost:5000/api/booking/${id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminMessage }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      if (data.deleted) {
        setCartItems((prev) => prev.filter((item) => item._id !== data.id));
        alert(`Booking ${status} and removed.`);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) => (item._id === id ? data.booking : item))
      );
      alert(`Booking updated to ${status}`);
    } catch (err) {
      alert(err.message || "Failed to update booking");
    } finally {
      setUpdating(false);
    }
  };

  // ================= DELETE BOOKING =================
  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/booking/${id}/delete`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      setCartItems((prev) => prev.filter((item) => item._id !== id));
      alert("Booking deleted successfully!");
    } catch (err) {
      alert(err.message || "Failed to delete booking");
    }
  };

  // ================= UTILITIES =================
  const statusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "";
    }
  };

  const activeItemsCount = (bookings) =>
    bookings.filter((b) =>
      ["pending", "confirmed", "completed"].includes(b.status)
    ).length;

  // ================= LOADING & EMPTY STATES =================
  if (!user)
    return <p className="text-center mt-10 text-lg text-gray-700">Please login to view your bookings.</p>;

  if (loading)
    return <p className="text-center mt-10 text-lg text-gray-700">Loading bookings...</p>;

  if (cartItems.length === 0)
    return <p className="text-center mt-10 text-lg text-gray-700">No bookings found.</p>;

  // ================= GROUP FOR ADMIN =================
  const grouped =
    user.role === "admin"
      ? cartItems.reduce((acc, item) => {
          const key = item.phone || "Unknown Customer";
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {})
      : null;

  // ================= UI RENDER =================
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 bg-gray-50 min-h-screen">

      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
        {user.role === "admin" ? "Customer Booking Dashboard" : "My Orders"}
      </h1>

      {/* ================= ADMIN STATUS SUMMARY ================= */}
      {user.role === "admin" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div
              key={status}
              className={`p-6 rounded-2xl shadow flex flex-col items-center border border-gray-200 ${statusColor(status)}`}
            >
              <p className="capitalize text-lg font-medium">{status}</p>
              <p className="text-4xl font-bold mt-2">{count}</p>
            </div>
          ))}
        </div>
      )}

      {/* ================= ADMIN VIEW ================= */}
      {user.role === "admin" &&
        Object.entries(grouped).map(([phone, bookings], index) => (
          <div key={phone} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

            {/* CUSTOMER HEADER */}
            <button
              className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition"
              onClick={() =>
                setOpenCustomer(openCustomer === phone ? null : phone)
              }
            >
              <div>
                <h2 className="text-lg md:text-xl font-semibold">
                  {bookings[0]?.name || `Customer ${index + 1}`}
                </h2>
                <p className="text-sm">{phone}</p>
              </div>

              <span className="px-4 py-1 rounded-full bg-white text-purple-700 text-sm font-semibold">
                {activeItemsCount(bookings)} Active
              </span>
            </button>

            {/* CUSTOMER BOOKINGS */}
            {openCustomer === phone && (
              <div className="p-6 space-y-6 bg-gray-50">
                {bookings.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-5 rounded-2xl shadow flex flex-col md:flex-row gap-6 hover:shadow-lg transition border border-gray-100"
                  >
                    <img
                      src={item.productImage || "/placeholder.png"}
                      alt={item.productTitle}
                      className="w-full md:w-36 h-36 md:h-32 rounded-xl object-cover border"
                    />

                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.productTitle}</h3>
                      <p className="text-gray-600">{item.notes}</p>

                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${statusColor(item.status)}`}>
                        {item.status}
                      </span>

                      {item.adminMessage && (
                        <p className="mt-2 text-gray-700 bg-gray-100 p-2 rounded">
                          {item.adminMessage}
                        </p>
                      )}

                      {/* ADMIN BUTTONS */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.status === "pending" && (
                          <>
                            <button
                              disabled={updating}
                              onClick={() => updateStatus(item._id, "confirmed")}
                              className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Confirm
                            </button>
                            <button
                              disabled={updating}
                              onClick={() => updateStatus(item._id, "rejected")}
                              className="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {item.status === "confirmed" && (
                          <button
                            disabled={updating}
                            onClick={() => updateStatus(item._id, "completed")}
                            className="px-4 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                          >
                            Mark Completed
                          </button>
                        )}

                        {item.status === "completed" && (
                          <button
                            disabled={updating}
                            onClick={() => updateStatus(item._id, "delivered")}
                            className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Mark Delivered
                          </button>
                        )}

                        {(item.status === "delivered" || item.status === "rejected") && (
                          <button
                            onClick={() => deleteBooking(item._id)}
                            className="px-4 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-black"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

      {/* ================= USER VIEW ================= */}
      {user.role !== "admin" &&
        cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition"
          >
            <img
              src={item.productImage || "/placeholder.png"}
              alt={item.productTitle}
              className="w-36 h-36 md:w-40 md:h-40 rounded-xl object-cover border"
            />

            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">{item.productTitle}</h2>
              <p className="text-gray-600">{item.notes}</p>

              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${statusColor(item.status)}`}>
                {item.status}
              </span>

              {item.adminMessage && (
                <p className="mt-2 text-gray-700 bg-gray-100 p-2 rounded">
                  {item.adminMessage}
                </p>
              )}

              {(item.status === "delivered" || item.status === "rejected") && (
                <button
                  onClick={() => deleteBooking(item._id)}
                  className="mt-3 px-4 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-black"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
