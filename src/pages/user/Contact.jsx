import React from "react";

function Contact() {
  return (
    <div className="font-sans">
      

      {/* Contact Form & Info */}
      <section className="py-20 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-700 transition mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center gap-6">
          <div className="bg-gray-50 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-700">it2_100@gmail.com</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-700">+855 77 381 221</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-gray-700">2002 Tuek Thla, USA</p>
          </div>
        </div>
      </section>

     
    </div>
  );
}

export default Contact;
