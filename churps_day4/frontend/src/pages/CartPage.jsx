import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const { user } = useAuth();

  if (!user) return <p className="text-center mt-10">Please login</p>;

  const cart = user.cart || [];

  // TOTAL PRICE
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded"
                />

                <div>
                  <p className="font-semibold capitalize">{item.category}</p>
                  <p className="text-gray-600">₹{item.price}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>

             <button
                onClick={async () => {
                  const res = await fetch(
                    `http://localhost:5000/api/cart/${item.productId}`,
                    {
                      method: "DELETE",
                      credentials: "include",
                    }
                  );

                  if (res.ok) {
                    window.location.reload();
                  } else {
                    alert("Failed to remove item");
                  }
                }}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                Remove
            </button>

            </div>
          ))}

          {/* TOTAL */}
          <div className="text-right mt-6">
            <p className="text-xl font-bold">
              Total: ₹{total}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
