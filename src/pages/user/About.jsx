import React, { useEffect, useState } from "react";
import axios from "axios";

function About() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("http://localhost:8000/api/teacher", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeam(response.data.data || []); // <- fix here
      } catch (error) {
        console.error(
          "Failed to fetch teachers:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading team...</p>;

  return (
    <div className="font-sans relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/3 rounded-full blur-2xl"></div>

      {/* Enhanced Team Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Dream Team
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our
            <span className="block bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Expert Team
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get to know the passionate professionals behind your learning journey. 
            Our team combines industry expertise with teaching excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div 
              key={member.teacher_id}
              className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-4"
              style={{
                animationDelay: `${idx * 200}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Image Container */}
              <div className="relative p-8 pb-0">
                <div className="relative mx-auto w-48 h-48">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <img
                    src={member.profile_teacher || "https://source.unsplash.com/150x150/?person"}
                    alt={member.teacher_name}
                    className="relative w-48 h-48 mx-auto rounded-full object-cover border-4 border-white shadow-2xl  z-10"
                  />
                  {/* Status Indicator */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-400 border-4 border-white rounded-full z-20 shadow-lg animate-pulse"></div>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-8 pt-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {member.teacher_name}
                </h3>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 shadow-lg">
                  {member.major}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {member.description || "No bio available"}
                </p>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          {[{ number: '50K+', label: 'Students Enrolled' },
            { number: '500+', label: 'Courses Available' },
            { number: '98%', label: 'Success Rate' },
            { number: '24/7', label: 'Support Available' }]
          .map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 max-w-4xl mx-auto border border-blue-100 shadow-2xl">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with our expert-led courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl 
                              hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 
                              shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
                Explore Courses
              </button>
              <button className="px-8 py-4 bg-white text-gray-800 font-bold rounded-2xl border border-gray-200 
                              hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 
                              shadow-lg hover:shadow-xl">
                Meet All Instructors
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default About;
