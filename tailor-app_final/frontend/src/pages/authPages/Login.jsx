import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Login({ closeModal }) {
  const { refetchUser, setUser } = useAuth(); // refetchUser updates context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // CLEAR any previous error

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true } // important to accept cookie
      );

      // If backend returns { success: true, user: {...} } prefer that
      // But we will handle both response shapes.
      const payloadUser = res.data?.user ?? res.data ?? null;

      // if response contained an error-like status, show message
      if (res.status >= 400) {
        setError(res.data?.message || "Login failed");
        return;
      }

      // If login successful, try to update auth context:
      // Prefer refetchUser (re-validate cookie -> /user)
      try {
        await refetchUser();
      } catch (inner) {
        // fallback: if backend returned user directly, set it
        if (payloadUser) {
          setUser({
            _id: payloadUser._id,
            name: payloadUser.name,
            email: payloadUser.email,
            role: payloadUser.role,
          });
        }
      }

      // clear error and close modal
      setError("");
      if (typeof closeModal === "function") closeModal();
    } catch (err) {
      // show backend message if available
      const msg = err.response?.data?.message || err.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 w-80 bg-white p-6 rounded-xl shadow-xl"
    >
      <h2 className="text-xl font-bold">Login</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        className="border p-2 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className="border p-2 rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="bg-blue-600 text-white p-2 rounded" type="submit">
        Login
      </button>
    </form>
  );
}
