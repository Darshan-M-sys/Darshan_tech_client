import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const LmsFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-20">
      
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
        
        {/* ABOUT LMS */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">
            DarshanTech LMS
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            DarshanTech LMS is a modern learning management system designed to
            help students and professionals master programming, full-stack
            development, and real-world software skills through structured
            courses, live classes, and hands-on projects.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/training" className="hover:text-white transition">
                LMS Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/solutions" className="hover:text-white transition">
                Solutions
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contactUs" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT & TRUST */}
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">
            Contact & Trust
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              📧 Email: 
              <a
                href="mailto:support@darshantechinnovations.com"
                className="hover:text-white ml-1"
              >
              darshantechinnovations.official@gmail.com
              </a>
            </li>
            <li>📞 Phone: +91 72042 21936</li>
            <li className="flex items-center gap-2"><FaLocationPin className="text-yellow-100"/> India</li>
          </ul>

          {/* SOCIAL LINKS */}
          <div className="flex space-x-4 mt-4 text-sm">
            <a
              href="https://www.linkedin.com/company/darshantech"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition p-2 rounded-full bg-gray-500 text-xl"
            >
             <FaLinkedin className=" transition-all duration-300 hover:text-blue-500"/>
            </a>
            <a
              href="https://www.linkedin.com/company/darshantech"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition p-2 rounded-full bg-gray-500 text-xl"
            >
           <FaInstagram className=" transition-all duration-300 hover:text-pink-800"/>
            </a>
            <a
              href="https://www.linkedin.com/company/darshantech"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition p-2 rounded-full bg-gray-500 text-xl"
            >
             <FaYoutube className=" transition-all duration-300 hover:text-pink-500"/>
            </a>
            <a
              href="https://www.facebook.com/darshantechinnovations"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition  p-2 rounded-full bg-gray-500 text-xl"
            >
             <FaFacebook className=" transition-all duration-300 hover:text-blue-700"/>
            </a>
            
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-gray-300 font-medium">
          DarshanTech Innovations
        </span>
        . All rights reserved.
        <br />
        <span className="text-xs">
          Founder: Darshan M | LMS & Software Solutions
        </span>
      </div>

    </footer>
  );
};

export default LmsFooter;
