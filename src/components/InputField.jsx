export default function InputField({ type, placeholder, value, onChange, required }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500"
    />
  );
}
