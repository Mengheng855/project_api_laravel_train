import React, { useEffect, useState } from "react";
import axios from "axios";

function Course() {
  const [courses, setCourses] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("course_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("course_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/courses");
        console.log("Fetched:", res.data);
        setCourses(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Add to Cart Functionality
  const addToCart = (course) => {
    const existingItem = cart.find(item => item.course_id === course.course_id);
    
    if (existingItem) {
      // Show notification that course is already in cart
      showNotification("This course is already in your cart!", "info");
      return;
    }

    const cartItem = {
      course_id: course.course_id,
      course_name: course.course_name,
      title: course.title,
      price: course.price || "99",
      discount: course.discount,
      total_price: course.total_price || course.price || "99",
      image: course.image,
      quantity: 1
    };

    setCart(prevCart => [...prevCart, cartItem]);
    showNotification(`${course.course_name} added to cart!`, "success");
  };

  // Remove from Cart
  const removeFromCart = (courseId) => {
    setCart(prevCart => prevCart.filter(item => item.course_id !== courseId));
    showNotification("Course removed from cart", "warning");
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
    showNotification("Cart cleared", "warning");
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + parseFloat(item.total_price || item.price), 0);

  // Notification function
  const showNotification = (message, type = "success") => {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-2xl backdrop-blur-sm border transform translate-x-full transition-transform duration-300 ${
      type === "success" 
        ? "bg-green-500/20 border-green-400/30 text-green-100" 
        : type === "warning"
        ? "bg-yellow-500/20 border-yellow-400/30 text-yellow-100"
        : "bg-blue-500/20 border-blue-400/30 text-blue-100"
    }`;
    
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-2 h-2 rounded-full ${
          type === "success" ? "bg-green-400" : type === "warning" ? "bg-yellow-400" : "bg-blue-400"
        } animate-pulse"></div>
        <span class="font-semibold">${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin absolute top-4 left-1/2 -translate-x-1/2"></div>
          </div>
          <p className="text-xl font-semibold text-white/80 mt-6 animate-pulse">
            Loading Amazing Courses...
          </p>
          <p className="text-blue-200/60 mt-2">Preparing your learning journey</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen py-24 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
        {/* Cart Floating Button */}
        {cart.length > 0 && (
          <button
            onClick={() => setShowCart(true)}
            className="fixed top-6 right-6 z-40 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart ({cart.length})
            <span className="bg-white/20 px-2 py-1 rounded-lg text-sm">
              ${cartTotal.toFixed(2)}
            </span>
          </button>
        )}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 to-transparent"></div>
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <span className="text-sm font-semibold text-green-400">🎯 Premium Learning Paths</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Master New
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Skills Today
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your career with our expertly crafted courses. Learn from industry leaders
              and join a community of passionate learners.
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-32 h-32 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l6.16-3.422a12.083 12.083 0 01.84 6.845L12 14z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Coming Soon!</h3>
                <p className="text-gray-400 text-lg mb-6">We're crafting amazing courses for you. Stay tuned!</p>
                <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/20 transition-all duration-300">
                  Notify Me
                </button>
              </div>
            </div>
          ) : (
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-8">
              {courses.map((course, index) => {
                const isInCart = cart.some(item => item.course_id === course.course_id);
                
                return (
                  <div
                    key={course.course_id}
                    className="group relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    {/* Course Image Container */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.image || "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
                        alt={course.title}
                        className="w-full h-full object-cover "
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                      {/* Status Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          Popular
                        </span>
                        {isInCart && (
                          <span className="bg-cyan-500/20 backdrop-blur-sm text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-400/30">
                            In Cart
                          </span>
                        )}
                      </div>

                      {/* Duration */}
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                        ⏱️ 8 Weeks
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-cyan-400 text-sm font-semibold">Development</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-100 transition-colors">
                        {course.course_name}
                      </h3>

                      {/* Subtitle */}
                      <h4 className="text-lg font-semibold text-gray-300 mb-4 line-clamp-1">
                        {course.title}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                        {course.description || "Master the fundamentals and advanced concepts with hands-on projects and real-world applications."}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-yellow-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-white font-semibold">4.8</span>
                            <span className="text-gray-400">(1.2k)</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            <span>2.4k</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">
                            ${course.price || "99"}
                          </div>
                          <div className="text-green-400 text-sm font-semibold">
                            ⚡ Limited Time
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
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
                        <button className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add CSS for animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCart(false)}
          ></div>
          
          {/* Cart Panel */}
          <div className="relative w-full max-w-md bg-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">
                    Your Learning Cart
                  </h3>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-white/10 rounded-2xl transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-400 mt-2">{cart.length} course(s) selected</p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">Your cart is empty</h4>
                    <p className="text-gray-400">Add some courses to get started!</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.course_id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="flex gap-4">
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"}
                          alt={item.title}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-semibold text-white text-sm line-clamp-2">{item.course_name}</h5>
                          <p className="text-cyan-400 font-bold mt-1">${item.total_price || item.price}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.course_id)}
                          className="p-2 hover:bg-red-500/20 rounded-xl transition-colors group"
                        >
                          <svg className="w-4 h-4 text-red-400 group-hover:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-300">Total:</span>
                    <span className="text-2xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={clearCart}
                      className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => {
                        showNotification(`Proceeding to checkout with ${cart.length} courses!`, "success");
                        setShowCart(false);
                      }}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-2xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Course;