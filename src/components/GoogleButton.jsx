import { supabase } from "../supabaseClient";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton({ text }) {
  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Google Auth Error:", error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleSignup}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white py-3 px-4 rounded-full text-gray-700 font-medium text-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200"
    >
      <FcGoogle className="text-2xl" />
      {text || "Continue with Google"}
    </button>
  );
}
