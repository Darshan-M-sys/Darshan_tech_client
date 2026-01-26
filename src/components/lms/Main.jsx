import React from 'react'
import learnImage from "../assets/images/learning.png"
import { FaBookOpen, FaCode, FaVideo, FaBrain, FaAward, FaUsers } from "react-icons/fa";
import { SiMongodb,SiDjango,SiMysql,SiExpress} from "react-icons/si";



import { FaPython, FaJs, FaNodeJs, FaReact, FaHtml5,FaCss3 } from "react-icons/fa";
import LmsFooter from './LMSFooter';
import { Link } from 'react-router-dom';

const Main = () => {
const platForm_For=[{
name:"Students",description:"Build strong foundations and gain real-world skills beyond college syllabus."
},
{
name:"Developers",description:"Upgrade your skills with advanced technologies and hands-on projects."
},
{
name:"Working Professionals",description:"Learn at your own pace and grow your career without quitting your job."
},
{
name:"Career Switchers",description:"Move into tech with structured learning paths and mentor support."
},
]

const features = [
    {
      icon: <FaBookOpen className="w-8 h-8 text-blue-600" />,
      title: "Structured Learning Paths",
      desc: "Step-by-step courses from Beginner to Advanced, designed for smooth skill growth."
    },
    {
      icon: <FaCode className="w-8 h-8 text-purple-600" />,
      title: "Hands-on Projects",
      desc: "Build real-world projects and case studies to strengthen practical knowledge."
    },
    {
      icon: <FaVideo className="w-8 h-8 text-pink-600" />,
      title: "Live & Recorded Classes",
      desc: "Learn anytime with recorded lessons or interact live with expert mentors."
    },
    {
      icon: <FaBrain className="w-8 h-8 text-green-600" />,
      title: "AI-Based Recommendations",
      desc: "Smart course suggestions based on your skills, goals, and progress."
    },
    {
      icon: <FaAward className="w-8 h-8 text-yellow-500" />,
      title: "Certificates & Internships",
      desc: "Earn certificates and get internship opportunities to boost your career."
    },
    {
      icon: <FaUsers className="w-8 h-8 text-red-500" />,
      title: "Mentor & Community Support",
      desc: "Get guidance from mentors and learn together with a supportive community."
    }
  ];


 const iconStyle = "text-6xl p-2 rounded-lg bg-white/50";

const ourCourses = [
  {
    name: "Python Full Stack Development",
    icons: [
      <FaPython className={`text-yellow-400 ${iconStyle}`} />,
      <FaHtml5 className={`text-orange-400 ${iconStyle}`} />,
      <FaCss3 className={`text-blue-400 ${iconStyle}`} />,
      <FaJs className={`text-yellow-300 ${iconStyle}`} />,
      <SiMysql className={`text-sky-400 ${iconStyle}`} />,
      <SiDjango className={`text-green-500 ${iconStyle}`} />
    ],
    description:
      "Become a complete Python Full Stack Developer by mastering frontend, backend, and database technologies with real-world projects.",
    duration: "1 Year"
  },

  {
    name: "Full Stack Web Development",
    icons: [
      <FaHtml5 className={`text-orange-400 ${iconStyle}`} />,
      <FaCss3 className={`text-blue-400 ${iconStyle}`} />,
      <FaJs className={`text-yellow-300 ${iconStyle}`} />,
      <FaReact className={`text-cyan-400 ${iconStyle}`} />,
      <FaNodeJs className={`text-green-500 ${iconStyle}`} />,
      <SiMysql className={`text-sky-400 ${iconStyle}`} />
    ],
    description:
      "Learn end-to-end web development from scratch and build modern, responsive, production-ready websites and applications.",
    duration: "1 Year"
  },

  {
    name: "MERN Stack Development",
    icons: [
      <SiMongodb className={`text-green-500 ${iconStyle}`} />,
      <SiExpress className={`text-gray-700 ${iconStyle}`} />,
      <FaReact className={`text-cyan-400 ${iconStyle}`} />,
      <FaNodeJs className={`text-green-500 ${iconStyle}`} />
    ],
    description:
      "Master the MERN stack and build scalable, high-performance web applications using modern JavaScript technologies.",
    duration: "1 Year"
  },

  {
    name: "Frontend Development",
    icons: [
      <FaHtml5 className={`text-orange-400 ${iconStyle}`} />,
      <FaCss3 className={`text-blue-400 ${iconStyle}`} />,
      <FaJs className={`text-yellow-300 ${iconStyle}`} />,
      <FaReact className={`text-cyan-400 ${iconStyle}`} />
    ],
    description:
      "Design beautiful, responsive, and user-friendly interfaces using modern frontend tools and frameworks.",
    duration: "6 Months"
  },

  {
    name: "Backend Development",
    icons: [
      <FaNodeJs className={`text-green-500 ${iconStyle}`} />,
      <SiExpress className={`text-gray-700 ${iconStyle}`} />,
      <FaJs className={`text-yellow-300 ${iconStyle}`} />,
      <SiMysql className={`text-sky-400 ${iconStyle}`} />,
      <SiMongodb className={`text-green-500 ${iconStyle}`} />
    ],
    description:
      "Learn how servers, databases, and APIs work behind the scenes to power modern applications.",
    duration: "6 Months"
  },

  {
    name: "Node JS Full Course",
    icons: [
      <FaNodeJs className={`text-green-500 ${iconStyle}`} />
    ],
    description:
      "Build fast, scalable backend applications using Node.js with industry-standard architecture and security practices.",
    duration: "6 Months"
  },

  {
    name: "JavaScript Full Course",
    icons: [
      <FaJs className={`text-yellow-300 ${iconStyle}`} />
    ],
    description:
      "JavaScript is the core language of modern web development. Learn fundamentals to advanced concepts with real-world projects.",
    duration: "6 Months"
  },

  {
    name: "MongoDB Full Course",
    icons: [
      <SiMongodb className={`text-green-500 ${iconStyle}`} />
    ],
    description:
      "Learn NoSQL database design, data modeling, aggregation, and performance optimization using MongoDB.",
    duration: "3 Months"
  },

  {
    name: "Python Programming",
    icons: [
      <FaPython className={`text-yellow-400 ${iconStyle}`} />
    ],
    description:
      "Start from zero and master Python programming with hands-on examples and mini projects.",
    duration: "6 Months"
  }
];
  return (

    <main >
    
     <section className=" min-h-[90vh] from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20
          flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

          {/* TEXT CONTENT */}
          <div className="w-full text-center lg:text-left">
            <span className=" mb-3 px-4 py-1 text-xs sm:text-sm font-semibold
              rounded-full bg-blue-100 hidden sm:inline-block text-blue-600">
              Smart Tech Skills 🚀
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold
              text-gray-900 leading-tight">
              Learn Industry-Ready Skills.{" "}
              <span className="text-blue-600">Build Real Projects</span> &{" "}
              <span className="text-indigo-600">Get Job-Ready</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
             Learn Industry-Ready Skills. Build Real Projects. Get Job-Ready.
              and custom software & website development for growing businesses.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/training/courses"
                className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg font-semibold
                text-white rounded-full bg-gradient-to-r from-blue-500 to-indigo-600
                shadow-lg hover:scale-105 transition active:scale-95">
               Start Learning Free
              </Link>

              <Link to="/training"
                className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg font-semibold
                text-blue-600 rounded-full border border-blue-500
                hover:bg-blue-50 transition active:scale-95">
               Watch Demo
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="w-full hidden sm:flex justify-center">
            <img
              src={learnImage}
              alt="Smart Business & Learning"
              className="w-full   max-w-sm sm:max-w-md lg:max-w-xl
                hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </section>

    <div>
      <h1 className="text-3xl text-center md:text-4xl font-bold text-blue-400 mb-5">
        Who Is This Platform For?
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center  gap-10  mx-5 lg:mx-2">
        {platForm_For.map((item,index)=>{
          return(
            <div data-aos="flip-left"  key={index} className="bg-white border platform-for-card shadow max-w-auto w-full border-[1px] border rounded-xl p-2 py-6 flex flex-col justify-center items-center  ">
              <h1 className="text-black text-2xl font-bold">{item.name}</h1>
              <p className="text-black/50  text-center text-sd font-semibold">{item.description}</p>
            </div>
          )
        })}



      </div>
    </div>
     <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400">
            🌟 Why Choose Our LMS?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Everything you need to learn faster, smarter, and build a successful career.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 max-w-auto w-full lg:grid-cols-3 mt-10 ">
          {features.map((item, index) => (
            <div data-aos="fade-up"
     data-aos-duration="3000" className="choose-card relative overflow-hidden   max-h-auto h-full">
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-slate-100 mb-4 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {item.title}
              </h3>
              <p className="text-black-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
            </div>
          ))}
        </div>

      </div>
    </section>

 <h2 className="text-3xl md:text-4xl text-center font-bold text-blue-400">
            Our Popular Courses
          </h2>   
      <section className="w-full py-16">
  <div className="max-w-7xl mx-auto px-4">
    
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {ourCourses.map((item, index) => (
        <div
          key={index}  data-aos="zoom-in"
          className="bg-white rounded-2xl p-6  course-cards overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative"
        >
          
          <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            {item.name}
          </h1>

          {/* Icons */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {item.icons.map((icon, idx) => (
              <div key={idx} className="flex">
                {icon}
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
            {item.description}
          </p>

          {/* Duration */}
          <p className="text-center text-sm font-medium text-blue-600">
            ⏱ {item.duration}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>
<LmsFooter/>
    </main>
  )
}

export default Main
