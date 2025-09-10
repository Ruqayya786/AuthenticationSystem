import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else {
        console.log("Login successful:", data);
        navigate("/dashboard", { replace: true }); //
      }
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
        <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
            <div className="text-right">
  <Link to="/forgot-password" className="text-cyan-600 hover:underline">
    Forgot password?
  </Link>
</div>

          <Button
            type="submit"
            disabled={loading}
            text={loading ? "Logging in..." : "Login"}
          />

          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-cyan-600 hover:underline">
              Signup now
            </Link>
            
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
