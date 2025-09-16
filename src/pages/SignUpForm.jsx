import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import InputField from "../components/InputField";
import Button from "../components/Button";
import GoogleButton from "../components/GoogleButton";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name }, // custom metadata
        },
      });

      if (error) {
        console.error("Signup error:", error.message);
        alert(error.message);
        return;
      }

      console.log("Signup successful:", data);

      // ✅ Success message aur login redirect
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[430px] bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">Signup</h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          {/* Full Name */}
          <InputField
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Confirm Password */}
          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Signup button */}
          <Button
            type="submit"
            disabled={loading}
            text={loading ? "Creating Account..." : "Signup"}
          />

          {/* Google Auth */}
          <GoogleButton text="SignUp with Google" />

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
