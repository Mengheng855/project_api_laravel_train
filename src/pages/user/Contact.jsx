import React from "react";

function Contact() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-gray-900 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="font-sans relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/3 rounded-full blur-2xl"></div>

        {/* Contact Form & Info */}
        <section className="py-20 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 relative z-10">
          {/* Enhanced Contact Form */}
          <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Get In Touch
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-3">
                Let's Start a Conversation
              </h2>
              <p className="text-gray-300 text-lg">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <form className="flex flex-col gap-6">
              <div className="group">
                <label className="block text-white/80 font-semibold mb-2 text-sm uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         transition-all duration-300 group-hover:border-white/20 backdrop-blur-sm"
                />
              </div>

              <div className="group">
                <label className="block text-white/80 font-semibold mb-2 text-sm uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         transition-all duration-300 group-hover:border-white/20 backdrop-blur-sm"
                />
              </div>

              <div className="group">
                <label className="block text-white/80 font-semibold mb-2 text-sm uppercase tracking-wide">
                  Your Message
                </label>
                <textarea
                  placeholder="Tell us about your project or inquiry..."
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         transition-all duration-300 group-hover:border-white/20 resize-none backdrop-blur-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 
                       rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 
                       transform hover:scale-105 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40
                       overflow-hidden mt-4"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>

          {/* Enhanced Contact Info */}
          <div className="flex flex-col justify-center gap-8">
            {/* Header */}
            <div className="text-center lg:text-left mb-4">
              <h3 className="text-3xl font-bold text-white mb-3">
                Contact Information
              </h3>
              <p className="text-gray-300 text-lg">
                Choose your preferred method to reach out to us
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="group bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 
                          hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10
                          transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center 
                              shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                    <p className="text-gray-300 mb-1">Send us an email anytime</p>
                    <a href="mailto:it2_100@gmail.com" className="text-cyan-400 font-semibold text-lg hover:text-cyan-300 transition-colors">
                      it2_100@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 
                          hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10
                          transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center 
                              shadow-lg shadow-green-500/25 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                    <p className="text-gray-300 mb-1">Mon-Fri from 8am to 6pm</p>
                    <a href="tel:+85577381221" className="text-green-400 font-semibold text-lg hover:text-green-300 transition-colors">
                      +855 77 381 221
                    </a>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="group bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 
                          hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10
                          transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center 
                              shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                    <p className="text-gray-300 mb-1">Come say hello at our office</p>
                    <p className="text-purple-400 font-semibold text-lg">
                      2002 Tuek Thla, USA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4 mt-6">
              {['twitter', 'facebook', 'linkedin', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center 
                         text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-110"
                >
                  <span className="font-semibold text-sm">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Contact;