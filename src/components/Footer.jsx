import React from 'react'

function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-slate-900  to-slate-900 text-gray-300 py-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/3 rounded-full blur-2xl"></div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 md:grid-cols-2 gap-10 relative z-10">
                {/* Brand Section - Enhanced */}
                <div className="lg:col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                            Code2 100
                        </h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Empowering learners to reach their full potential through accessible and quality education. 
                        Join thousands of students transforming their careers with us.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-green-400 font-semibold">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Online Now • 2.4k+ Active Learners
                    </div>
                </div>

                {/* Platform Links - Enhanced */}
                <div>
                    <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                        Platform
                    </h4>
                    <ul className="space-y-3">
                        {['Courses', 'Instructors', 'Certifications', 'Learning Paths', 'Live Sessions'].map((item) => (
                            <li key={item}>
                                <a href="#" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1">
                                    <svg className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Company Links - Enhanced */}
                <div>
                    <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                        Company
                    </h4>
                    <ul className="space-y-3">
                        {['About Us', 'Careers', 'Contact', 'Success Stories', 'Press Kit'].map((item) => (
                            <li key={item}>
                                <a href="#" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1">
                                    <svg className="w-3 h-3 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social & Contact - Enhanced */}
                <div>
                    <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-cyan-500 rounded-full"></div>
                        Connect With Us
                    </h4>
                    
                    {/* Social Links */}
                    <div className="flex gap-3 mb-6">
                        {[
                            { icon: '🌐', label: 'Website', color: 'hover:text-blue-400' },
                            { icon: '🐦', label: 'Twitter', color: 'hover:text-sky-400' },
                            { icon: '📘', label: 'Facebook', color: 'hover:text-blue-500' },
                            { icon: '📸', label: 'Instagram', color: 'hover:text-pink-400' },
                            { icon: '💼', label: 'LinkedIn', color: 'hover:text-blue-600' }
                        ].map((social, index) => (
                            <a
                                key={index}
                                href="#"
                                className={`w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center 
                                         text-lg transition-all duration-300 transform hover:scale-110 hover:border-white/20 ${social.color}`}
                                title={social.label}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>it2_100@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>+855 77 381 221</span>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="mt-6">
                        <p className="text-sm text-gray-400 mb-3">Stay updated with our newsletter</p>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white 
                                         placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold 
                                            rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 
                                            transform hover:scale-105 shadow-lg">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Bottom Bar */}
            <div className="border-t border-white/10 mt-16 pt-8 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-gray-500 text-sm">
                            © 2025 <span className="text-white font-semibold">Code2 100</span>. All Rights Reserved.
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                            Empowering the next generation of developers and creators.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute bottom-10 left-10 w-4 h-4 bg-blue-400/20 rounded-full animate-ping"></div>
            <div className="absolute top-10 right-10 w-6 h-6 bg-purple-400/20 rounded-full animate-ping delay-1000"></div>
        </footer>
    )
}

export default Footer