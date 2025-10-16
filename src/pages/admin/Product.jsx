import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; 
function Product() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    course_name: "",
    title: "",
    price: "",
    discount: "",
    description: "",
    image: null,
  });

  const token = localStorage.getItem("auth_token");

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/courses");
      setCourses(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const openModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        course_name: course.course_name,
        title: course.title,
        price: course.price,
        discount: course.discount,
        description: course.description,
        image: null,
      });
    } else {
      setEditingCourse(null);
      setFormData({
        course_name: "",
        title: "",
        price: "",
        discount: "",
        description: "",
        image: null,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) form.append(key, formData[key]);

    try {
      if (editingCourse) {
        await axios.post(
          `http://localhost:8000/api/editCourse/${editingCourse.course_id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:8000/api/addCourse", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchCourses();
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to submit course:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/deleteCourse/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourses();
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading courses...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Manage Courses</h2>
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          + Add Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600">#</th>
              <th className="px-4 py-3 text-left text-gray-600">Image</th>
              <th className="px-4 py-3 text-left text-gray-600">Title</th>
              <th className="px-4 py-3 text-left text-gray-600">Course Name</th>
              <th className="px-4 py-3 text-left text-gray-600">Price</th>
              <th className="px-4 py-3 text-left text-gray-600">Discount</th>
              <th className="px-4 py-3 text-left text-gray-600">Total Price</th>
              <th className="px-4 py-3 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course, index) => (
              <tr
                key={course.course_id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={
                      course.image
                        ? course.image
                        : `http://localhost:8000/courses/${course.image}`
                    }
                    alt={course.title}
                    className="h-16 w-24 object-contain rounded-lg shadow-sm"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-700">{course.title}</td>
                <td className="px-4 py-3 text-gray-600">{course.course_name}</td>
                <td className="px-4 py-3 text-gray-600">${course.price}</td>
                <td className="px-4 py-3 text-gray-600">{course.discount}%</td>
                <td className="px-4 py-3 font-semibold text-gray-800">${course.total_price}</td>
                <td className="px-4 py-3 flex space-x-2">
                  <button
                    onClick={() => openModal(course)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-sm transition-all duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.course_id)}
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
                {editingCourse ? "Edit Course" : "Add Course"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="course_name"
                  placeholder="Course Name"
                  value={formData.course_name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                  type="number"
                  name="discount"
                  placeholder="Discount"
                  value={formData.discount}
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
                  name="image"
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
                    {editingCourse ? "Update" : "Add"}
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

export default Product;
