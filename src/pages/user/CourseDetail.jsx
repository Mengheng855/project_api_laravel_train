import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/course/${id}`);
        setCourse(res.data.data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    alert("Enrollment feature would be implemented here!");
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-white text-xl mt-4">Loading course details...</p>
      </div>
    </div>
  );

  if (!course) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="text-center text-white">
        <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-4"></i>
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <p className="text-gray-400 mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate("/course")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
        >
          Browse All Courses
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => navigate("/course")}
              className="flex items-center text-white hover:text-blue-400 transition-colors back-btn"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Courses
            </button>
            <h1 className="text-xl font-bold text-white hidden md:block">Course Details</h1>
            <button
              onClick={handleEnroll}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Info */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-700">
              {/* Course Image */}
              <div className="relative">
                <img
                  src={course.image || "/api/placeholder/800/400"}
                  alt={course.title}
                  className="w-full h-64 md:h-80 object-cover course-image"
                />
                {course.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                    {course.discount}% OFF
                  </div>
                )}
              </div>

              {/* Course Details */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
                <p className="text-gray-300 text-lg mb-6">{course.course_name}</p>
                
                <p className="text-gray-400 mb-6 leading-relaxed">{course.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                    <i className="fas fa-clock text-blue-400 text-xl mb-2"></i>
                    <p className="text-white font-semibold">12 Hours</p>
                    <p className="text-gray-400 text-sm">Duration</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                    <i className="fas fa-video text-green-400 text-xl mb-2"></i>
                    <p className="text-white font-semibold">24 Lessons</p>
                    <p className="text-gray-400 text-sm">Videos</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                    <i className="fas fa-signal text-yellow-400 text-xl mb-2"></i>
                    <p className="text-white font-semibold">Intermediate</p>
                    <p className="text-gray-400 text-sm">Level</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                    <i className="fas fa-users text-purple-400 text-xl mb-2"></i>
                    <p className="text-white font-semibold">1.2K Students</p>
                    <p className="text-gray-400 text-sm">Enrolled</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-700 mb-6">
                  <div className="flex space-x-8">
                    {["overview", "curriculum", "reviews", "instructor"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 px-1 font-medium transition-colors ${
                          activeTab === tab
                            ? "text-blue-400 border-b-2 border-blue-400"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="text-gray-300">
                  {activeTab === "overview" && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Course Overview</h3>
                      <p className="mb-4">This comprehensive course will take you from beginner to advanced level in {course.course_name}. You'll learn the fundamentals and advanced concepts through practical examples and real-world projects.</p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <i className="fas fa-check text-green-400 mr-3"></i>
                          Hands-on projects and exercises
                        </li>
                        <li className="flex items-center">
                          <i className="fas fa-check text-green-400 mr-3"></i>
                          Lifetime access to course materials
                        </li>
                        <li className="flex items-center">
                          <i className="fas fa-check text-green-400 mr-3"></i>
                          Certificate of completion
                        </li>
                        <li className="flex items-center">
                          <i className="fas fa-check text-green-400 mr-3"></i>
                          Q&A support from instructors
                        </li>
                      </ul>
                    </div>
                  )}
                  {activeTab === "curriculum" && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Course Curriculum</h3>
                      <div className="space-y-3">
                        {[1, 2, 3, 4].map((week) => (
                          <div key={week} className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-white">Week {week}: Introduction to Key Concepts</h4>
                              <span className="text-gray-400 text-sm">4 lessons • 2h 30m</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === "reviews" && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Student Reviews</h3>
                      <div className="flex items-center mb-6">
                        <div className="text-3xl font-bold text-white mr-4">4.8</div>
                        <div className="mr-4">
                          <div className="flex text-yellow-400">
                            {[1,2,3,4,5].map((star) => (
                              <i key={star} className="fas fa-star"></i>
                            ))}
                          </div>
                          <p className="text-gray-400 text-sm">Based on 247 reviews</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-semibold text-white">Amazing Course!</h4>
                            <div className="flex text-yellow-400">
                              {[1,2,3,4,5].map((star) => (
                                <i key={star} className="fas fa-star"></i>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-300">This course completely transformed my understanding of the subject. The instructor explains complex topics in a very simple way.</p>
                          <p className="text-gray-400 text-sm mt-2">- John D.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "instructor" && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">About the Instructor</h3>
                      <div className="flex items-start">
                        <img 
                          src="/api/placeholder/100/100" 
                          alt="Instructor" 
                          className="w-16 h-16 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-bold text-white text-lg">Dr. Sarah Johnson</h4>
                          <p className="text-blue-400 mb-2">Senior Developer & Educator</p>
                          <p className="text-gray-300">With over 10 years of experience in the industry and 5 years teaching, Sarah has helped thousands of students master complex technical concepts through her engaging teaching style.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing & Actions */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700 sticky top-24">
              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Original Price:</span>
                  <span className="text-gray-400 line-through">${course.price}</span>
                </div>
                {course.discount > 0 && (
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Discount:</span>
                    <span className="text-green-400 font-semibold">{course.discount}% OFF</span>
                  </div>
                )}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white font-semibold text-lg">Total Price:</span>
                  <span className="text-2xl font-bold text-cyan-400">${course.total_price}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleEnroll}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105"
                >
                  Enroll Now
                </button>
                <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg border border-gray-600 transition-colors">
                  <i className="far fa-heart mr-2"></i>
                  Add to Wishlist
                </button>
                <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg border border-gray-600 transition-colors">
                  <i className="fas fa-share-alt mr-2"></i>
                  Share Course
                </button>
              </div>

              {/* Course Features */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-white font-semibold mb-4">This course includes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <i className="fas fa-play-circle text-blue-400 mr-3"></i>
                    12 hours on-demand video
                  </li>
                  <li className="flex items-center text-gray-300">
                    <i className="fas fa-file-alt text-green-400 mr-3"></i>
                    15 downloadable resources
                  </li>
                  <li className="flex items-center text-gray-300">
                    <i className="fas fa-infinity text-purple-400 mr-3"></i>
                    Full lifetime access
                  </li>
                  <li className="flex items-center text-gray-300">
                    <i className="fas fa-mobile-alt text-yellow-400 mr-3"></i>
                    Access on mobile and TV
                  </li>
                  <li className="flex items-center text-gray-300">
                    <i className="fas fa-certificate text-red-400 mr-3"></i>
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;