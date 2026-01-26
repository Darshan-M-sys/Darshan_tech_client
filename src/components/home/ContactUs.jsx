import React, { useState } from "react";
import Header from "./Header";
import {  FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import axios from "axios";
import Notification from "../lms/Notification";
import Footer from "./Footer";

const ContactUs = () => {
    const [msg,setMsg]=useState("")
  const [type,setType]=useState("success")
   const [fullname,setFullname]=useState("") 
   const [email,setEmail]=useState("") 
   const [subject,setSubject]=useState("") 
   const [message,setMessage]=useState("") 

   const handleSendMessage=async()=>{
    
    if(!fullname==="" || !email==="" ||!subject==="" || !message===""){
      return(setMsg("Please Fill All The Fields!"),setType("info"))
    }
    setMsg("Your Message is Sending....")
    setType("info")
    try {
    const res =await axios.post("http://localhost:5000/web/data/data",{fullname,email,subject,message});
    if(res.data.success){
     setType("success")
     setMsg(res.data.msg)
      setFullname("")
      setEmail("")
      setSubject("")
      setMessage("")
    }
     
    } catch (error) {
       console.log(error.message)
    }
   }
  return (
    <>
    <Header/>
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

            <p className="text-gray-600 mb-6 leading-relaxed">
              We are always happy to discuss your ideas, business requirements,
              or learning goals. Reach out to us and we’ll respond as soon as
              possible.
            </p>

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
              <li>
                <span className="font-semibold text-gray-900">Services:</span>{" "}
                Technical Training, Software Development, Freelance Services
              </li>
            </ul>

            {/* SOCIALS */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Connect With Us
              </h3>
              <div className="flex gap-4 justify-center">
                <a
                  href=""
                  className="text-indigo-600 font-bold text-2xl hover:underline"
                >
                 <FaLinkedin/>
                </a>
                <a
                  href="#"
                  className="text-gray-600 font-bold text-2xl hover:underline"
                >
               <FaGithub/>
                </a>
                <a
                  href="#"
                  className="text-pink-600 font-bold text-2xl hover:underline"
                >
                <FaYoutube/>
                </a>
                <a
                  href="#"
                  className="text-pink-600 font-bold text-2xl hover:underline"
                >
                <FaInstagram/>
                </a>
                <a
                  href="tel://91+ 7204221936"
                  className="text-green-600 font-bold text-2xl hover:underline"
                >
                <FaWhatsapp/>
                </a>
                <a
                  href="mail://darshantechinnovations.official@gmail.com"
                  className="text-black-600 font-bold text-2xl hover:underline"
                >
                <CiMail/>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"  value={fullname } onChange={(e)=>setFullname(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input value={subject}  onChange={(e)=>setSubject(e.target.value)}
                  type="text"
                  placeholder="Subject"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea value={message} onChange={(e)=>setMessage(e.target.value)}
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <button onClick={handleSendMessage}
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
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

        {/* CTA */}
        <footer className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Let’s Start Something Great
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Whether you are a student, entrepreneur, or business owner,
            DarshanTech Innovations is ready to support your journey with
            technology and expertise.
          </p>
        </footer>

      </div>
    </section>
    <Footer/>
    </>
  );
};

export default ContactUs;
