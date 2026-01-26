import React, { useState } from "react";
import Header from "./Header";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import axios from "axios";
import Notification from "../lms/Notification";
import Footer from "./Footer";

// ✅ Backend URL (use .env in production)
const API_URL = "http://localhost:5000";

const ContactUs = () => {
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("success");

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    // ✅ Correct validation
    if (!fullname || !email || !subject || !message) {
      setMsg("Please fill all the fields!");
      setType("info");
      return;
    }

    setMsg("Your message is sending...");
    setType("info");

    try {
      const res = await axios.post(`${API_URL}/web/data/data`, {
        fullname,
        email,
        subject,
        message,
      });

      if (res.data.success) {
        setType("success");
        setMsg(res.data.msg || "Message sent successfully!");

        // Clear form
        setFullname("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setType("error");
        setMsg("Failed to send message. Try again.");
      }
    } catch (error) {
      console.error(error);
      setType("error");
      setMsg("Server error. Please try later.");
    }
  };

  return (
    <>
      <Header />

      <section className="bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* HERO */}
          <header className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Contact Us
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Have a project idea, need technical training, or looking for a
              reliable development partner? Get in touch with{" "}
              <span className="font-semibold text-indigo-600">
                DarshanTech Innovations
              </span>
              .
            </p>
          </header>

          {/* CONTENT */}
          <section className="grid md:grid-cols-2 gap-12 items-start">
            {/* CONTACT INFO */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>

              <ul className="space-y-4 text-gray-600">
                <li>
                  <span className="font-semibold text-gray-900">Email:</span>{" "}
                  darshantechinnovations.official@gmail.com
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Phone:</span>{" "}
                  +91 72042 21936
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Location:</span>{" "}
                  India
                </li>
              </ul>

              {/* SOCIALS */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Connect With Us
                </h3>
                <div className="flex gap-4 justify-center">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    className="text-indigo-600 text-2xl"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    className="text-gray-700 text-2xl"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    className="text-red-600 text-2xl"
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    className="text-pink-600 text-2xl"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="tel:+917204221936"
                    className="text-green-600 text-2xl"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="mailto:darshantechinnovations.official@gmail.com"
                    className="text-gray-800 text-2xl"
                  >
                    <CiMail />
                  </a>
                </div>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>

              <div className="space-y-6">
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Full Name"
                  className="w-full border rounded-lg px-4 py-3"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border rounded-lg px-4 py-3"
                />

                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full border rounded-lg px-4 py-3"
                />

                <textarea
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  className="w-full border rounded-lg px-4 py-3"
                />

                <button
                  onClick={handleSendMessage}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
                >
                  Send Message
                </button>

                <Notification
                  message={msg}
                  type={type}
                  onClose={() => setMsg("")}
                />
              </div>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactUs;
