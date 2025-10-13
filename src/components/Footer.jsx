import React from 'react'

function Footer() {
    return (
        <footer className=" bg-gray-900 text-gray-300 py-12 ">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
                <div>
                    <h3 className="text-xl font-bold text-white mb-3">Code2 100</h3>
                    <p className="text-sm text-gray-400">
                        Empowering learners to reach their full potential through accessible and quality education.
                    </p>
                </div>


                <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Platform</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition">Courses</a></li>
                        <li><a href="#" className="hover:text-white transition">Instructors</a></li>
                        <li><a href="#" className="hover:text-white transition">Certifications</a></li>
                    </ul>
                </div>


                <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>


                <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
                    <div className="flex gap-4 text-lg">
                        <a href="#" className="hover:text-indigo-400 transition">🌐</a>
                        <a href="#" className="hover:text-indigo-400 transition">🐦</a>
                        <a href="#" className="hover:text-indigo-400 transition">📘</a>
                        <a href="#" className="hover:text-indigo-400 transition">📸</a>
                    </div>
                </div>
            </div>


            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
                © 2025 Code2 100. All Rights Reserved.
            </div>
        </footer>
    )
}

export default Footer