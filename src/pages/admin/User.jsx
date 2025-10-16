import React, { useEffect, useState } from "react";
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile: null,
    role: 0,
  });

  const token = localStorage.getItem("auth_token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "profile") {
      setFormData({ ...formData, profile: e.target.files[0] });
    } else if (e.target.name === "role") {
      setFormData({ ...formData, role: parseInt(e.target.value) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        profile: null,
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        profile: null,
        role: 0,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.password) data.append("password", formData.password);
    data.append("role", formData.role);
    if (formData.profile) data.append("profile", formData.profile);

    try {
      if (editingUser) {
        await axios.post(
          `http://localhost:8000/api/editUser/${editingUser.user_id}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:8000/api/register", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/deleteUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading users...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Users</h2>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          + Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600">ID</th>
              <th className="px-4 py-3 text-left text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-gray-600">Email</th>
              <th className="px-4 py-3 text-left text-gray-600">Role</th>
              <th className="px-4 py-3 text-left text-gray-600">Profile</th>
              <th className="px-4 py-3 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user.user_id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-3">{user.user_id}</td>
                <td className="px-4 py-3 font-medium text-gray-700">{user.name}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3 text-gray-600">{user.role === 0 ? "User" : "Admin"}</td>
                <td className="px-4 py-3 ">
                  <img
                    src={user.profile}
                    alt={user.name}
                    className="h-10 w-10 object-cover rounded-full shadow-sm"
                  />
                </td>
                <td className="px-4 py-3  space-x-2">
                  <button
                    onClick={() => openModal(user)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-sm transition-all duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.user_id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm transition-all duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl transform transition-transform duration-300 scale-100">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {editingUser ? "Edit User" : "Add User"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password (Leave blank if not change)"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="file"
                name="profile"
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:scale-105 transition-transform duration-300"
                >
                  {editingUser ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
