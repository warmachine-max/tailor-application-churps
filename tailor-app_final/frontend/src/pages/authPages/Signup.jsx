import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Signup({ closeModal }) {
  const { refetchUser, setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );

      const payloadUser = res.data?.user ?? res.data ?? null;

      // Attempt to refetch user (cookie-based)
      try {
        await refetchUser();
      } catch (inner) {
        if (payloadUser) {
          setUser({
            _id: payloadUser._id,
            name: payloadUser.name,
            email: payloadUser.email,
            role: payloadUser.role,
          });
        }
      }

      setError("");
      if (typeof closeModal === "function") closeModal();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Signup failed";
      setError(msg);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col gap-4 w-80 bg-white p-6 rounded-xl shadow-xl"
    >
      <h2 className="text-xl font-bold">Sign Up</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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

      <button className="bg-green-600 text-white p-2 rounded" type="submit">
        Sign Up
      </button>
    </form>
  );
}
