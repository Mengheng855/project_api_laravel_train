import React, { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./Contact";
import About from "./About";
import Course from "./Course";

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/courses");
        console.log("Fetched:", res.data);
        setCourses(res.data.data || []); // ✅ Ensure it's an array
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="font-sans overflow-hidden">
      {/* 🏠 Enhanced Hero Section */}
      <section
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/originals/5f/f4/58/5ff45883d083027e28142ce6fc48659d.gif')",
        }}
      >


        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 text-white max-w-4xl">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-sm font-semibold">🚀 10,000+ Students Enrolled</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
            Learn From
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              The Best
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl leading-relaxed">
            Master new skills with our expert-led courses. Join thousands of learners
            transforming their careers through immersive online education.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 transform">
              <span className="relative z-10">Start Learning Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-bold text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 transform">
              <span className="flex items-center gap-2">
                🎬 Watch Demo
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-200 text-sm">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-200 text-sm">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-200 text-sm">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* 🌟 Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Learn Your Way to <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text">Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to acquire new skills and advance your career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.84 6.845L12 14z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-4 text-center">Expert Instructors</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Learn from industry leaders and experienced professionals who bring real-world insights to every lesson.
              </p>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-4 text-center">Flexible Learning</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Study at your own pace with 24/7 access to all course materials and lifetime updates.
              </p>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-4 text-center">Certification</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Earn industry-recognized certificates to showcase your skills and boost your career prospects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 📚 Courses Section */}
      <Course />

      {/* 🧭 About Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl"></div>
        <About />
      </section>

      {/* 📞 Contact Section */}
      <Contact/>
    </div>
  );
}

export default Home;