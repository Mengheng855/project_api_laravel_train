import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Course() {
  const [courses, setCourses] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("course_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("course_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
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
    fetchCourses();
  }, []);

  const addToCart = (course) => {
    const existing = cart.find((item) => item.course_id === course.course_id);
    if (existing) {
      showNotification("This course is already in your cart!", "info");
      return;
    }
    const newItem = {
      course_id: course.course_id,
      course_name: course.course_name,
      title: course.title,
      price: course.price || "99",
      total_price: course.total_price || course.price || "99",
      image: course.image,
    };
    setCart([...cart, newItem]);
    showNotification(`${course.course_name} added to cart!`, "success");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.course_id !== id));
    showNotification("Course removed from cart", "warning");
  };

  const clearCart = () => {
    setCart([]);
    showNotification("Cart cleared", "warning");
  };

  const cartTotal = cart.reduce(
    (t, i) => t + parseFloat(i.total_price || i.price),
    0
  );

  const showNotification = (msg, type = "success") => {
    const n = document.createElement("div");
    n.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-2xl backdrop-blur-sm border transform translate-x-full transition-transform duration-300 ${
      type === "success"
        ? "bg-green-500/20 border-green-400/30 text-green-100"
        : type === "warning"
        ? "bg-yellow-500/20 border-yellow-400/30 text-yellow-100"
        : "bg-blue-500/20 border-blue-400/30 text-blue-100"
    }`;
    n.innerHTML = `<div class="flex items-center gap-3"><span class="font-semibold">${msg}</span></div>`;
    document.body.appendChild(n);
    setTimeout(() => {
      n.style.transform = "translateX(0)";
    }, 100);
    setTimeout(() => {
      n.style.transform = "translateX(100%)";
      setTimeout(() => document.body.removeChild(n), 300);
    }, 3000);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading Courses...
      </div>
    );

  return (
    <>
      <section className="min-h-screen py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 drop-shadow-lg">
            Available Courses
          </h2>

          {courses.length === 0 ? (
            <div className="text-center text-gray-300">
              No courses found.
            </div>
          ) : (
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-10">
              {courses.map((course) => {
                const isInCart = cart.some(
                  (item) => item.course_id === course.course_id
                );
                return (
                  <div
                    key={course.course_id}
                    className="group relative bg-white/5 rounded-3xl border border-white/10 hover:border-cyan-400/40 hover:shadow-cyan-400/20 hover:shadow-xl transition-all duration-500 backdrop-blur-xl overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          course.image || "https://via.placeholder.com/400x200"
                        }
                        alt={course.title}
                        className="w-full h-56 object-cover rounded-t-3xl transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition">
                        {course.course_name}
                      </h3>
                      <p className="text-gray-300 mb-4">{course.title}</p>

                      <div className="flex justify-between items-center mb-4">
                        <p className="text-cyan-400 font-semibold text-xl">
                          ${course.price || "99"}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        {/* ✅ Add to Cart button */}
                        <button
                          onClick={() => addToCart(course)}
                          disabled={isInCart}
                          className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                            isInCart
                              ? "bg-gray-600 text-gray-300 cursor-not-allowed shadow-gray-500/25"
                              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-cyan-500/25 group-hover:shadow-cyan-500/40"
                          }`}
                        >
                          {isInCart ? "Added to Cart" : "Add to Cart"}
                        </button>

                        {/* ✅ View Detail button */}
                        <button
                          onClick={() =>
                            navigate(`/course/${course.course_id}`)
                          }
                          className="flex-1 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                        >
                          View Detail
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Course;
