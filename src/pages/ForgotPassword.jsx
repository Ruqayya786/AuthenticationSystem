import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // 1️⃣ Pehle check karo email "profiles" table me exist karta hai ya nahi
      const { data: userData, error: checkError } = await supabase
        .from("profiles") // apne table ka naam jahan email save hota hai
        .select("id")
        .eq("email", email)
        .single();

      if (checkError || !userData) {
        setMessage("❌ This email is not registered. Please sign up first.");
        setLoading(false);
        return;
      }

      // 2️⃣ Agar email exist karta hai → reset link bhejo
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/reset-password",
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setMessage("⚠️ This email is not authenticated. Please verify first.");
        } else {
          setMessage("❌ " + error.message);
        }
      } else {
        setMessage("✅ Please wait... check your email for reset link.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[430px] bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-2 rounded-lg"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="mt-3 text-center text-gray-700">{message}</p>}

        <p className="text-center mt-4 text-sm">
          Remembered your password?{" "}
          <Link to="/login" className="text-cyan-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
