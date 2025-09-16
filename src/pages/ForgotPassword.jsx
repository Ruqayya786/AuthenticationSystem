import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/reset-password", // reset page
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setMessage("⚠️ This email is not verified. Please verify first.");
          setMessageType("error");
        } else {
          setMessage("❌ " + error.message);
          setMessageType("error");
        }
      } else {
        setMessage("✅ Please check your email for the reset link.");
        setMessageType("success");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage("❌ Something went wrong. Try again.");
      setMessageType("error");
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
            className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Messages */}
        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center text-sm font-medium 
            ${
              messageType === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

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
