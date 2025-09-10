export default function Button({
  type = "button",
  disabled,
  text,
  onClick,
  variant = "primary", // default for login/signup
  size = "md", // default size
}) {
  // Base styles
  const baseClasses =
    "rounded-full font-medium transition disabled:opacity-50 focus:outline-none";

  // Variants (color styles)
  const variants = {
    primary:
      "w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white text-lg hover:opacity-90",
    danger:
      "bg-red-500 text-white hover:bg-red-600", // for logout
  };

  // Sizes
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
    >
      {text}
    </button>
  );
}
