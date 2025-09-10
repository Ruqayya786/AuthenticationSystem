import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionReady, setSessionReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSessionFromUrl = async () => {
      try {
        const { data, error } = await supabase.auth.getSessionFromUrl({
          storeSession: true,
        });
        if (error) {
          console.warn("getSessionFromUrl error:", error.message);
        } else {
          console.log("Temporary session created:", data);
        }
      } catch (err) {
        console.error("Unexpected reset error:", err);
      } finally {
        setSessionReady(true);
      }
    };

    getSessionFromUrl();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!password || password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("✅ Password updated. Redirecting to login...");
        await supabase.auth.signOut();
        setTimeout(() => navigate("/login", { replace: true }), 1500);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!sessionReady) {
    return <div className="text-center mt-20">⏳ Checking reset link...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="w-[430px] bg-white p-8 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>

        {/* Input fields */}
        <div className="space-y-3">
          <InputField
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <InputField
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <div className="pt-2">
          <Button
            type="submit"
            text={loading ? "Updating..." : "Update Password"}
          />
        </div>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
