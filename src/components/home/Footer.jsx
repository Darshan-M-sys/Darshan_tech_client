
import React from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt 
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Notification from '../lms/Notification';

const Footer = () => {

  return (
 
    <div className="bg-white/10 mt-10">
         <footer className="bg-gray-900 text-gray-300">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">DarshanTech</h2>
          <p className="mt-4 text-sm leading-relaxed">
            Building modern web solutions, LMS platforms, and scalable
            applications with cutting-edge technologies.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {["Home", "About", "Courses", "Internship", "Contact"].map(
              (item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-white transition"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Resources
          </h3>
          <ul className="space-y-3 text-sm">
            {["Blog", "Documentation", "Privacy Policy", "Terms & Conditions"].map(
              (item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-white transition"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <FaEnvelope /> support@darshantech.com
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt /> +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt /> India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} DarshanTech. All rights reserved.
      </div>

    </footer>

<div/>
     
    </div>
  )
}

export default Footer
