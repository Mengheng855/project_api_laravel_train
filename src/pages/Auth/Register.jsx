import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [profilePreview, setProfilePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile: null, // file
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle profile file change
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile: file });
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (formData.profile) data.append("profile", formData.profile);

      const response = await axios.post("http://localhost:8000/api/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Register Success:", response.data);
      alert("Register successful!");
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Register Error:", error.response?.data || error.message);
      alert("Register failed! Check your inputs.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo" className="mx-auto h-16 w-16 mb-3" />
          <h1 className="text-3xl font-bold text-gray-800">Create Account ✨</h1>
          <p className="text-gray-500 mt-2">Join us and start learning today</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
            />
          </div>

          {/* Profile Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={profilePreview || "/defaultProfile.png"}
                alt=""
                className="h-24 w-24 rounded-full object-cover border-4 border-indigo-500 shadow-md"
              />
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition"
              >
                <FaCamera />
              </label>
              <input
                type="file"
                id="profile"
                accept="image/*"
                className="hidden"
                onChange={handleProfileChange}
              />
            </div>
            <p className="text-gray-500 text-sm mt-2">Upload your profile picture</p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
