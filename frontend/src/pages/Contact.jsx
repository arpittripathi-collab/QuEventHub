// import React from 'react'

// const Contact = () => {
//   return (
//     <h1 className="text-3xl font-bold">Contact Page</h1>
//   )
// }

// export default Contact



// src/pages/Contact.jsx
import React from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-slate-800 mb-4">Get In Touch</h1>
        <p className="text-center text-gray-600 mb-10">We're here to help! Reach out to us for any event or club-related inquiries.</p>

        <div className="grid md:grid-cols-3 gap-8 text-center mb-10">
          <div className="p-4 rounded-lg bg-blue-50">
            <Mail size={36} className="text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Email Us</h3>
            <p className="text-sm text-gray-600">info@campuseventhub.com</p>
          </div>
          <div className="p-4 rounded-lg bg-green-50">
            <Phone size={36} className="text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Call Us</h3>
            <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="p-4 rounded-lg bg-red-50">
            <MapPin size={36} className="text-red-600 mx-auto mb-3" />
            <h3 className="font-bold text-lg">Visit Us</h3>
            <p className="text-sm text-gray-600">Campus Central, Building A</p>
          </div>
        </div>

        <form className="space-y-6">
          <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
          <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
          <textarea rows="4" placeholder="Your Message" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition">
            <Send size={20} className="mr-2"/> Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact