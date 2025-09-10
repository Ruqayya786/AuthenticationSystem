import React from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import users from "../data/users.json";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">Dashboard</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Settings
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Add More
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Welcome, {user.email}</h1>
          <Button text="Logout" onClick={handleLogout} variant="danger" size="sm" />
        </header>

        {/* Stats / Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-2xl font-bold text-blue-600">
              {Array.isArray(users) ? users.length : 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold">Sales</h2>
            <p className="text-2xl font-bold text-green-600">$12,300</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold">Performance</h2>
            <p className="text-2xl font-bold text-yellow-600">89%</p>
          </div>
        </section>

        {/* Users Table */}
        <section className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Users List</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{u.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{u.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{u.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{u.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Extra Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <p className="text-gray-600 mt-2">No recent activity yet...</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <p className="text-gray-600 mt-2">You're all caught up!</p>
          </div>
        </section>
      </main>
    </div>
  );
}
