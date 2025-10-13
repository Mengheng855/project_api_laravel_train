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
    <div className="font-sans">
      {/* 🏠 Hero Section */}
      <section
        className="h-screen flex flex-col justify-center items-center text-center px-4 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/originals/5f/f4/58/5ff45883d083027e28142ce6fc48659d.gif')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Learn From the Best Online
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Access hundreds of courses, learn new skills, and achieve your
            career goals from the comfort of your home.
          </p>
          <button className="bg-white text-blue-600 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* 🌟 Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center px-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l6.16-3.422a12.083 12.083 0 01.84 6.845L12 14z"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p>
              Learn from industry experts with real-world experience and
              guidance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 20.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
            <p>
              Learn at your own pace with courses available anytime, anywhere.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Certification</h3>
            <p>
              Get certified and showcase your skills to advance your career.
            </p>
          </div>
        </div>
      </section>

      {/* 📚 Courses Section */}
      <section >
        <Course/>
      </section>

      {/* 🧭 About Section */}
      <section >
        <About/>
      </section>

      {/* 📞 Contact Section */}
      <section >
        <Contact/>
      </section>
    </div>
  );
}

export default Home;
