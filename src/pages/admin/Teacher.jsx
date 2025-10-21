import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Teacher() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    teacher_name: "",
    major: "",
    description: "",
    profile_teacher: null,
  });

  const token = localStorage.getItem("auth_token"); 

  // Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch teachers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "profile_teacher") {
      setFormData({ ...formData, profile_teacher: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const openModal = (teacher = null) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData({
        teacher_name: teacher.teacher_name,
        major: teacher.major,
        description: teacher.description,
        profile_teacher: null,
      });
    } else {
      setEditingTeacher(null);
      setFormData({
        teacher_name: "",
        major: "",
        description: "",
        profile_teacher: null,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }

    try {
      if (editingTeacher) {
        await axios.post(
          `http://localhost:8000/api/editTeacher/${editingTeacher.teacher_id}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:8000/api/addTeacher", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchTeachers();
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to save teacher:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this teacher?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/deleteTeacher/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTeachers();
    } catch (err) {
      console.error("Failed to delete teacher:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading teachers...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Manage Teachers</h2>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          + Add Teacher
        </button>
      </div>

      {/* Teacher Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600">#</th>
              <th className="px-4 py-3 text-left text-gray-600">Profile</th>
              <th className="px-4 py-3 text-left text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-gray-600">Major</th>
              <th className="px-4 py-3 text-left text-gray-600">Description</th>
              <th className="px-4 py-3 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teachers.map((teacher, index) => (
              <tr key={teacher.teacher_id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={teacher.profile_teacher}
                    alt={teacher.teacher_name}
                    className="h-12 w-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-700">{teacher.teacher_name}</td>
                <td className="px-4 py-3 text-gray-600">{teacher.major}</td>
                <td className="px-4 py-3 text-gray-600">{teacher.description}</td>
                <td className="px-4 py-3 flex space-x-2">
                  <button
                    onClick={() => openModal(teacher)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-sm transition-all duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.teacher_id)}
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
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {editingTeacher ? "Edit Teacher" : "Add Teacher"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="teacher_name"
                  placeholder="Teacher Name"
                  value={formData.teacher_name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="major"
                  placeholder="Major"
                  value={formData.major}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                  type="file"
                  name="profile_teacher"
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
                    {editingTeacher ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Teacher;
