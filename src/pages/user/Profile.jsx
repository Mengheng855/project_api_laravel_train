import React, { useState, useEffect } from "react";
import { FaCamera, FaEdit, FaSave, FaUser, FaEnvelope, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import axios from "axios";
import { FaShield } from "react-icons/fa6";

function Profile() {
  const token = localStorage.getItem("auth_token");
  const user_id = localStorage.getItem("user_id");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: 0,
    profile: null,
  });
  const [preview, setPreview] = useState("/defaultProfile.png");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Fetch user profile
  const fetchProfile = async () => {
    if (!user_id) {
      console.error("No user_id found");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/user/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("API Response:", res.data);
      
      const userData = res.data.data;
      if (!userData) throw new Error("No user data returned from API");
      
      setUser(userData);
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || 0,
        profile: null,
      });
      setPreview(userData.profile || "/defaultProfile.png");
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setSaveError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, profile: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!user_id) {
      alert("User not found");
      return;
    }

    try {
      setSaveLoading(true);
      setSaveError("");
      
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("role", formData.role.toString()); // Ensure role is string
      
      if (formData.profile) {
        formPayload.append("profile", formData.profile);
      }

      // Add _method for Laravel if needed (for PUT requests)
      formPayload.append("_method", "PUT");

      console.log("Saving data:", {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        hasProfile: !!formData.profile
      });

      // Try different approaches
      let res;
      
      try {
        // Approach 1: POST with FormData (your current route)
        res = await axios.post(
          `http://localhost:8000/api/editUser/${user_id}`,
          formPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (postError) {
        console.log("POST failed, trying PUT...", postError);
        
        // Approach 2: Try PUT method instead
        res = await axios.put(
          `http://localhost:8000/api/user/${user_id}`,
          formPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      console.log("Save API Response:", res.data);

      // Handle different response formats
      let updatedUser;
      
      if (res.data.data) {
        updatedUser = res.data.data; // Your API format
      } else if (res.data.user) {
        updatedUser = res.data.user; // Alternative format
      } else if (res.data) {
        updatedUser = res.data; // Direct user object
      } else {
        throw new Error("Invalid response format from server");
      }

      if (updatedUser) {
        // Update state with the response data
        setUser(updatedUser);
        setFormData({
          name: updatedUser.name || "",
          email: updatedUser.email || "",
          role: updatedUser.role || 0,
          profile: null,
        });
        
        // Update preview if we have a new profile image
        if (updatedUser.profile) {
          // Handle both full URL and relative path
          const profileUrl = updatedUser.profile.startsWith('http') 
            ? updatedUser.profile 
            : `http://localhost:8000/storage/${updatedUser.profile}`;
          setPreview(profileUrl);
        }
        
        setEditing(false);
        setSaveSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      } else {
        throw new Error("No user data in response");
      }

    } catch (err) {
      console.error("Failed to update profile:", err);
      
      let errorMessage = "Update failed! Please try again.";
      
      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.message || 
                      err.response.data?.error || 
                      `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request made but no response
        errorMessage = "No response from server. Please check your connection.";
      }
      
      setSaveError(errorMessage);
      
      // Refetch original data on error to reset form
      await fetchProfile();
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || 0,
        profile: null,
      });
      setPreview(user.profile || "/defaultProfile.png");
    }
    setEditing(false);
    setSaveError("");
  };

  // Loading and error states remain the same...
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin absolute top-4 left-1/2 -translate-x-1/2"></div>
          </div>
          <p className="text-xl font-semibold text-white/80 mt-6 animate-pulse">
            Loading Your Profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
          <p className="text-gray-400">Please check your authentication and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl mt-9 font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-4">
            Your Profile
          </h1>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-blue-500/10 overflow-hidden">
          <div className="grid lg:grid-cols-3 gap-8 p-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/5">
                {/* Profile Image */}
                <div className="relative mx-auto w-48 h-48 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-lg opacity-30"></div>
                  <img
                    src={preview}
                    alt="Profile"
                    className="relative w-48 h-48 rounded-full object-cover border-4 border-white/20 shadow-2xl z-10"
                  />
                  {editing && (
                    <label
                      htmlFor="profile"
                      className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                               rounded-full flex items-center justify-center cursor-pointer hover:from-blue-600 hover:to-purple-700 
                               transition-all duration-300 transform hover:scale-110 shadow-lg z-20"
                    >
                      <FaCamera className="w-5 h-5" />
                    </label>
                  )}
                  <input
                    id="profile"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfileChange}
                  />
                  
                  {/* Online Status */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-green-400 border-2 border-white rounded-full z-20 animate-pulse"></div>
                </div>

                {/* User Info */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">{formData.name}</h2>
                  <p className="text-gray-400 mb-4 flex items-center justify-center gap-2">
                    <FaEnvelope className="w-4 h-4" />
                    {formData.email}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                                text-blue-300 px-4 py-2 rounded-full border border-blue-500/30">
                    <FaShield className="w-4 h-4" />
                    <span className="font-semibold">{formData.role === 1 ? "Administrator" : "Premium User"}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-2xl font-bold text-white mb-1">12</div>
                    <div className="text-gray-400 text-sm">Courses</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-2xl font-bold text-white mb-1">45h</div>
                    <div className="text-gray-400 text-sm">Learned</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-8 border border-white/5 h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FaUser className="w-4 h-4 text-white" />
                      </div>
                      Account Information
                    </h3>
                    <p className="text-gray-400">
                      Update your personal details and preferences
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    {editing && (
                      <button
                        onClick={handleCancel}
                        disabled={saveLoading}
                        className="px-6 py-3 bg-gray-500/50 text-white font-semibold rounded-2xl 
                                 hover:bg-gray-600/50 transition-all duration-300 transform hover:scale-105 
                                 border border-gray-400/30"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={handleSave}
                      disabled={saveLoading}
                      className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 
                                transform hover:scale-105 shadow-lg ${
                                  editing
                                    ? saveLoading
                                      ? "bg-green-600 text-white"
                                      : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                                    : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                                }`}
                    >
                      {saveLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : editing ? (
                        <FaSave className="w-4 h-4" />
                      ) : (
                        <FaEdit className="w-4 h-4" />
                      )}
                      {saveLoading ? "Saving..." : editing ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>
                </div>

                {/* Status Messages */}
                {saveSuccess && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 animate-fade-in">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <FaCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-green-400 font-semibold">Profile updated successfully!</span>
                  </div>
                )}

                {saveError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <FaExclamationTriangle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-red-400 font-semibold">{saveError}</span>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="group">
                      <label className="block text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!editing || saveLoading}
                          className={`w-full bg-white/5 border ${
                            editing 
                              ? "border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white cursor-text" 
                              : "border-white/10 bg-white/3 text-gray-400 cursor-not-allowed"
                          } rounded-2xl px-4 py-4 placeholder-gray-400 transition-all duration-300 
                          ${editing ? "group-hover:border-blue-400" : ""}`}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="group">
                      <label className="block text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!editing || saveLoading}
                          className={`w-full bg-white/5 border ${
                            editing 
                              ? "border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white cursor-text" 
                              : "border-white/10 bg-white/3 text-gray-400 cursor-not-allowed"
                          } rounded-2xl px-4 py-4 placeholder-gray-400 transition-all duration-300 
                          ${editing ? "group-hover:border-blue-400" : ""}`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role Display */}
                  <div className="group">
                    <label className="block text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">
                      Account Type
                    </label>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <FaShield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          {formData.role === 1 ? "Administrator" : "Premium User"}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {formData.role === 1 ? "Full system access" : "Full learning access"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Profile;