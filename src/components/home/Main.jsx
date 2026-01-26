import React, { useEffect, useState } from 'react'
import  darshantech from "../assets/images/darshantech.png"
import  Home from "../assets/images/Home.jpeg"
import  python from "../assets/images/python.png"
import  js from "../assets/images/js.png"
import  nextjs from "../assets/images/nextjs.png"
import  react from "../assets/images/react.png"
import  mongodb from "../assets/images/mongodb.png"
import  node from "../assets/images/nodejs.webp"
import  express from "../assets/images/express.png"
import  html from "../assets/images/html.png"
import  css from "../assets/images/css-3.png"
import  github from "../assets/images/github.png"
import  tailwind  from "../assets/images/tailwind.png"
import restAPI from "../assets/images/restAPI.png"
import git from "../assets/images/git.png"
import PythonProgramming from "../assets/images/pythonProgramming.png"
import BackendDevelopment from "../assets/images/Backend.webp"
import MernStack from "../assets/images/MERN.png"
import FrontEndDevelopment from "../assets/images/front.jpg"
import PythonFullStack from "../assets/images/python full stack.jpg"
import FullStackWebDev from "../assets/images/fullStackWebDevelopment.png"
import NodeFullCourse from "../assets/images/NodejsfullCourse.webp"
import JavaScriptFullCourse from "../assets/images/JavaScript.png"
import mongodbFullCourse from "../assets/images/mongodbFullCourse.webp"
import software from "../assets/images/software-for-business.png"
import freelance from "../assets/images/freelance.png"
import Helmet from "react-helmet"

import  coding_image from "../assets/images/coding image.png"
import { SiBmcsoftware } from "react-icons/si";
import { SiFreelancermap } from "react-icons/si";
import { FaCode } from "react-icons/fa6";
import { Link } from 'react-router-dom'


const Main = () => {

  const programmingSkills=[
    {
      image:python,names:"Python" 
    },
     {
      image:react,names:"React JS" 
    },
     {
      image:express,names:"Express JS" 
    },
     {
      image:js,names:"JavaScript" 
    },
     {
      image:css,names:"CSS3" 
    },
    {
      image:nextjs,names:"Next JS" 
    },
     {
      image:python,names:"Flask" 
    },
     {
      image:html,names:"HTML" 
    },
     {
      image:tailwind,names:"Tailwind CSS" 
    },
     {
      image:node,names:"Node JS" 
    },
     {
      image:git,names:"Git" 
    },
     {
      image:mongodb,names:"MongoDB" 
    },
     {
      image:restAPI,names:"RestAPI" 
    },
     {
      image:github,names:"Github" 
    },
    
  ] 

  const onDemandCourses=[
   {
  img: PythonFullStack,
  title: "Python Full Stack Development",
  description: "Learn frontend, backend, databases, and deployment using Python with real-world full stack projects."
},
{
  img: MernStack,
  title: "MERN Stack Development",
  description: "Master MongoDB, Express, React, and Node.js to build scalable, modern full stack web applications."
},
{
  img: PythonProgramming,
  title: "Python Programming",
  description: "Understand Python from basics to advanced concepts with hands-on coding and practical examples."
},
{
  img: FullStackWebDev,
  title: "Full Stack Web Development",
  description: "Build complete web applications using HTML, CSS, JavaScript, backend APIs, and databases."
},
{
  img: mongodbFullCourse,
  title: "MongoDB Full Course",
  description: "Learn MongoDB from fundamentals to advanced queries, schema design, and real project usage."
},
{
  img: JavaScriptFullCourse,
  title: "JavaScript Full Course",
  description: "Master JavaScript concepts including ES6+, DOM, events, async programming, and real projects."
},
{
  img: NodeFullCourse,
  title: "Node JS Full Course",
  description: "Build fast and secure backend applications using Node.js, Express, REST APIs, and databases."
},
{
  img: BackendDevelopment,
  title: "Backend Development",
  description: "Learn server-side development, authentication, APIs, databases, and backend best practices."
},
{
  img:FrontEndDevelopment,
  title: "Frontend Development",
  description: "Learn client development, User Interface , User Experience, and API Integration."
},


  ]

  const [activeIndex,setActiveIndex]=useState(0);

  useEffect(()=>{
    const interval=setInterval(()=>{
  setActiveIndex((prov)=>prov===onDemandCourses.length-1?0:prov+1)
    },3000)
      return()=>clearInterval(interval)
  },[onDemandCourses.length])

  const cardData=[
    {
      title:" Talk to an Expert",description:"Get guidance on software, websites, LMS, or training programs.",btnText:"Book Free Consultation"
    },
       {
      title:"Start a Project",description:"Tell us your business requirement and get a custom solution.",btnText:"Submit Your Project"
    },
       {
      title:"Join Training & LMS",description:"Learn coding and technologies with mentors & real projects.",btnText:"Explore Training"
    },
  ]   

  return (

    
    <main className="min-h-screen z-50"> 
    <Helmet>
  {/* Page Title */}
  <title>DarshanTech Innovations | Smart Software, LMS & Tech Training</title>

  {/* Meta Description */}
  <meta 
    name="description" 
    content="DarshanTech Innovations offers industry-ready coding courses, LMS solutions, and custom software development for businesses and learners. Learn with expert mentors." 
  />

  {/* Keywords */}
  <meta 
    name="keywords" 
    content="Software Development, LMS Solutions, Coding Courses, Python, JavaScript, React JS, Node JS, MERN Stack, Freelance Services,websites, free courses,fullstack development,python full stack development, React, SQL,Real world projects Tech Training, Business Software" 
  />

  {/* Author */}
  <meta name="author" content="Darshan M| DarshanTech Innovations" />

  {/* Viewport (Mobile-Friendly) */}
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* Open Graph / Social Media */}
  <meta property="og:title" content="DarshanTech Innovations | Smart Software & Tech Learning" />
  <meta property="og:description" content="Professional tech training, LMS solutions, and custom software development for growing businesses." />
  <meta property="og:image" content={darshantech} />
  <meta property="og:url" content="https://www.darshantechinnovations.com" />
  <meta property="og:type" content="website" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="DarshanTech Innovations | Smart Software & Tech Learning" />
  <meta name="twitter:description" content="Professional tech training, LMS solutions, and custom software development for growing businesses." />
  <meta name="twitter:image" content={darshantech} />
</Helmet>
   
      <div className="w-full  overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className=" min-h-[90vh] from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20
          flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

          {/* TEXT CONTENT */}
          <div className="w-full text-center lg:text-left">
            <span className=" mb-3 px-4 py-1 text-xs sm:text-sm font-semibold
              rounded-full bg-blue-100 hidden sm:inline-block text-blue-600">
              Smart Tech Solutions 🚀
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold
              text-gray-900 leading-tight">
              Smart Software for{" "}
              <span className="text-blue-600">Smart Business</span> &{" "}
              <span className="text-indigo-600">Smart Learning</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Professional tech training with mentors, powerful LMS platforms,
              and custom software & website development for growing businesses.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/training"
                className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg font-semibold
                text-white rounded-full bg-gradient-to-r from-blue-500 to-indigo-600
                shadow-lg hover:scale-105 transition active:scale-95">
                Get Free Consultation
              </Link>

              <Link to="/solutions"
                className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg font-semibold
                text-blue-600 rounded-full border border-blue-500
                hover:bg-blue-50 transition active:scale-95">
                View Our Solutions
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="w-full hidden sm:flex justify-center">
            <img
              src={Home}
              alt="Smart Business & Learning"
              className="w-full   max-w-sm sm:max-w-md lg:max-w-xl
                hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-gray-900 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-10">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">

            {/* CARD 1 */}
            <div className="group bg-gradient-to-br from-blue-500 to-indigo-600
              p-6 sm:p-8 rounded-xl text-white shadow-xl
              hover:-translate-y-2 transition">
              <div className="text-3xl sm:text-4xl mb-3 text-cyan-200
                group-hover:scale-110 transition">
                <FaCode />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                Code Training
              </h3>
              <p className="text-sm sm:text-base text-blue-100">
                Industry-ready coding courses with mentors, projects,
                and LMS support.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="group bg-gradient-to-br from-blue-500 to-indigo-600
              p-6 sm:p-8 rounded-xl text-white shadow-xl
              hover:-translate-y-2 transition">
              <div className="text-3xl sm:text-4xl mb-3 text-cyan-200
                group-hover:scale-110 transition">
                <SiBmcsoftware />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                Software Solutions
              </h3>
              <p className="text-sm sm:text-base text-blue-100">
                Custom software, LMS platforms, dashboards
                and business automation.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="group bg-gradient-to-br from-blue-500 to-indigo-600
              p-6 sm:p-8 rounded-xl text-white shadow-xl
              hover:-translate-y-2 transition">
              <div className="text-3xl sm:text-4xl mb-3 text-cyan-200
                group-hover:scale-110 transition">
                <SiFreelancermap />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                Freelance Services
              </h3>
              <p className="text-sm sm:text-base text-blue-100">
                Website development, UI/UX design,
                backend systems & long-term support.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>

    
 <div  data-aos="zoom-in" className="flex  flex-col lg:flex-row min-h-[70vh] items-center mt-2 lg:justify-center">
<div className="flex  gap-10 flex-col">
  <div className="flex items-center m-5 justify-center flex-col  gap-4 lg:gap-10 max-w-[100%] lg:max-w-[70%]">
<h1 className="bg-home   ml-[5px] lg:ml-20  text-blue-500 text-[25px] lg:text-[35px] z-0 font-bold font-arial">Learn Industry-Ready Skills with Expert Mentors</h1>
<h2 className="ml-1 leading-[20px] lg:ml-20 text-[15px]   lg:text-[20px] text-black  font-semibold">We offer practical, mentor-led coding and technology training designed for students, job seekers, and aspiring freelancers.</h2>
<h3 className="text-[15px]    lg:text-[20px] text-black  font-semibold">Learn real skills. Build real projects. Get career-ready.</h3>
</div>
<div className=" flex items-center justify-center ml-1 lg:ml-20 gap-5 lg:gap-10 w-full">
                <Link to="/training/courses" data-aos="zoom-in" className="relative lg:px-2 px-1 lg:max-w-[270px]  max-w-[150px] w-full lg:px-8 pb-2 py-2  text-[12px] lg:text-lg font-semibold text-white rounded-full 
    bg-gradient-to-r from-blue-500 to-indigo-600  
    shadow-sm shadow-blue-500/30
    transition-all duration-300 ease-out
    hover:scale-105 hover:shadow-sm lg:hover:shadow-xl hover:shadow-blue-500/50
    active:scale-95 overflow-hidden group"> Join Training Programs</Link>
                <Link to="/training/contact"  data-aos="zoom-in-up" className="relative  lg:px-2 px-1 lg:max-w-[270px] max-w-[150px] w-full lg:px-8 pb-2 py-2  text-[12px] lg:text-lg font-semibold text-white rounded-full 
    bg-gradient-to-r from-blue-500 to-indigo-600  
    shadow-sm shadow-blue-500/30
    transition-all duration-300 ease-out
    hover:scale-105 hover:shadow-sm lg:hover:shadow-xl hover:shadow-blue-500/50
    active:scale-95 overflow-hidden group"> Talk to a Mentor</Link>
            </div>
</div>

  <div>
        <img  className="w-[800px] hover:scale-105 transition-all ease-out duration-300 lg:image-shack-animation" src={coding_image} alt="Coding main" />
        </div>

 </div>

 <div  data-aos="zoom-in" className='bg-white/50 py-5 mt-10'>
  <h1 className="ml-1 lg:ml-20  text-[20px] lg:text-[20px] py-4    lg:text-[30px] text-blue-400  font-bold">We offer programming skills training.</h1>
 
       
       
<div ata-aos="zoom-in" className="w-full max-w-xl relative  mx-auto lg:max-w-6xl  overflow-hidden rounded-xl">
   <div className="pointer-events-none z-30 absolute left-0 top-0 h-full w-[30px] lg:w-[100px] 
                  bg-gradient-to-r from-white/20 via-white/30 to-transparent 
                  backdrop-blur-sm" />
   
   <div className="pointer-events-none z-30 absolute right-0 top-0 h-full  w-[30px] lg:w-[100px]  
                  bg-gradient-to-r from-white/20 via-white/30 to-transparent 
                  backdrop-blur-sm" />
   
 
  <div className="flex w-max mx-10 animate-marquee gap-20">
  

    {/* First set */}
    {programmingSkills.map((item, index) => (
      <div
        key={`first-${index}`}
        className="flex items-center border gap-5 justify-center p-2 min-w-[260px] bg-white/30 rounded-lg backdrop-blur-xl"
      >
       
        <img
          className="w-[30px] lg:w-[60px] h-[30px] lg:h-[60px]  rounded-full p-0 bg-white/30"
          src={item.image}
          alt={item.names}
        />
        <span className="text-black font-bold text-2xl">
          {item.names}
        </span>
      </div>
    ))}

    {/* Duplicate set for seamless loop */}
    {programmingSkills.map((item, index) => (
      <div
        key={`second-${index}`}
        className="flex items-center gap-5 border justify-center p-2 min-w-[260px] bg-white/30 rounded-lg backdrop-blur-md"
      >
        <img
          className=" w-[30px] lg:w-[60px] h-[30px] lg:h-[60px] rounded-full p-0 bg-white/30"
          src={item.image}
          alt={item.names}
        />
        <span className="text-black font-bold text-2xl">
          {item.names}
        </span>
      </div>
    ))}

  </div>




  <div className="flex w-max animate-marqueeReverse gap-20 mt-10">

  
    {programmingSkills.map((item, index) => (
      <div
        key={`first-${index}`}
        className="flex items-center gap-5 border justify-center p-2 min-w-[160px] lg:min-w-[260px] bg-white/30 rounded-lg backdrop-blur-md"
      >
        <img
          className=" w-[30px] lg:w-[60px] h-[30px] lg:h-[60px] rounded-full p-0 bg-white/30"
          src={item.image}
          alt={item.names}
        />
        <span className="text-black font-bold text-xl lg:text-2xl">
          {item.names}
        </span>
      </div>
    ))}

    {programmingSkills.map((item, index) => (
      <div
        key={`second-${index}`}
        className="flex items-center gap-5  border  justify-center p-2 min-w-[260px] bg-white/30 rounded-xl backdrop-blur-md"
      >
        <img
          className="w-[30px] lg:w-[60px] h-[30px] lg:h-[60px]  rounded-full p-0 bg-white/30"
          src={item.image}
          alt={item.names}
        />
        <span className="text-black font-bold text-2xl">
          {item.names}
        </span>
      </div>
    ))}
</div>
  </div>
</div>
<div  data-aos="zoom-in" className="w-full overflow-hidden flex justify-center">
  <div className="relative w-full max-w-6xl overflow-hidden">

   

   <h1  className="ml-1 lg:ml-20  text-[20px] lg:text-[20px] py-4  text-center  lg:text-[30px] text-blue-400  font-bold">Explore Our On-Demand Courses</h1>
    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${activeIndex * 100}%)` }}
    >
      {onDemandCourses.map((item, index) => (
        <div
          key={index}
          className="min-w-full flex justify-center items-center"
        >
          <div className="w-[350px] rounded-2xl bg-white/30 backdrop-blur-md shadow-xl">
            <div className="p-5 flex justify-center">
              <img
                src={item.img}
                alt={item.title}
                className="w-[200px] lg:w-[300px] rounded-xl h-[200px] lg:h-[300px]"
              />
            </div>

            {/* Content */}
            <div className="bg-white rounded-b-2xl lg:px-5 px-3 py-2 lg:py-4 text-center">
              <h1 className="text-blue-900 font-bold text-xl mb-2">
                {item.title}
              </h1>
              <p className="text-gray-700 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>

    <div  className="flex justify-center gap-2 mt-4 mb-20 items-center">
    {onDemandCourses.map((item,index)=>{
    return(
      <div key={index} className="flex justify-center gap-1 items-center">
<div onClick={()=>setActiveIndex(index)} className={`w-3 h-3 rounded-full cursor-pointer ${activeIndex===index?"bg-blue-500 scale-125":"bg-black backdrop-blur-[10px]"}`} />
      </div>
    )
    })}
    </div>

  </div>
</div>
<div ata-aos="zoom-in">
<div  className="flex justify-center flex-col lg:flex-row items-center gap-10 ml-4">
  <div className="flex justify-center flex-col items-center gap-10">
    <div >
  <h1 className="bg-home ml-[5px] lg:ml-20  text-gray-900 text-[30px] lg:text-[35px] z-0 font-bold font-arial">Business Solutions</h1>
  <h1 className="bg-home ml-[5px] lg:ml-20  text-blue-500 text-[20px] lg:text-[35px] z-0 font-bold font-arial">Custom Software & Digital Solutions for Growing Businesses</h1>
  <h2 className="bg-home ml-[5px] lg:ml-20  text-black text-[10px] lg:text-[25px] z-0 font-semibold font-arial">We design, develop, and scale smart software, websites, and systems that help businesses grow faster, work smarter, and stay ahead of competitors.</h2>
</div>
  <div className=" flex items-center  justify-center ml-1 lg:ml-20 gap-5 lg:gap-10 w-full">
                <Link to="/contactUs" data-aos="zoom-in" className="relative lg:px-2 px-1 lg:max-w-[270px]  max-w-[150px] w-full lg:px-8 pb-2 py-2  text-[12px] lg:text-lg font-semibold text-white rounded-full 
    bg-gradient-to-r from-blue-500 to-indigo-600  
    shadow-sm shadow-blue-500/30
    transition-all duration-300 ease-out
    hover:scale-105 hover:shadow-sm lg:hover:shadow-xl hover:shadow-blue-500/50
    active:scale-95 overflow-hidden group"> Get Business Solutions</Link>
                <Link to="/solutions"  data-aos="zoom-in-up" className="relative  lg:px-2 px-1 lg:max-w-[270px] max-w-[150px] w-full lg:px-8 pb-2 py-2  text-[12px] lg:text-lg font-semibold text-white rounded-full 
    bg-gradient-to-r from-blue-500 to-indigo-600  
    shadow-sm shadow-blue-500/30
    transition-all duration-300 ease-out
    hover:scale-105 hover:shadow-sm lg:hover:shadow-xl hover:shadow-blue-500/50
    active:scale-95 overflow-hidden group">View Our Solutions</Link>
            </div>

  </div>
  <div>
  <img  className="w-[800px] hover:scale-105 transition-all ease-out duration-300 image-shack-animation" src={software} alt="home main" />
  </div>
</div>
<br/>
<br/>
 <h2 className="bg-home ml-[7px] lg:ml-20  text-black text-[15px] lg:text-[25px] z-0 font-semibold font-arial">Built for Businesses That Want Results</h2>

<ul className="list-disc marker:text-blue-500 ml-10 lg:ml-[200px]">
  <li className="text-black font-semibold lg:text-lg text-sm">Startups & Entrepreneurs</li>
  <li className="text-black font-semibold lg:text-lg text-sm">lgall & Medium Businesses</li>
  <li className="text-black font-semibold lg:text-lg text-sm">Enterprises & Institutions</li>
  <li className="text-black font-semibold lg:text-lg text-sm">Coaches, Institutes & Agencies</li>
</ul>
</div>
<br/>
<br/>
<div>
<div data-aos="zoom-in"  className="flex justify-center flex-col lg:flex-row items-center gap-10 ml-4">
  <div className="flex justify-center flex-col items-center gap-10">
    <div >
  <h1 className="bg-home ml-[5px] lg:ml-20  text-gray-900 text-[30px] lg:text-[35px] z-0 font-bold font-arial">Freelance Services</h1>
  <h1 className="bg-home ml-[5px] lg:ml-20  text-blue-500 text-[20px] lg:text-[35px] z-0 font-bold font-arial">Hire Expert Freelancers for Smart Digital Solutions</h1>
  <h2 className="bg-home ml-[5px] lg:ml-20  text-black text-[10px] lg:text-[25px] z-0 font-semibold font-arial">Get high-quality websites, software, and custom digital solutions built by experienced developers, designers, and tech mentors — on time and tailored to your business goals.</h2>
</div>
  <div className=" flex items-center  justify-center ml-1 lg:ml-20 gap-5 lg:gap-10 w-full">
                <button data-aos="zoom-in" className="relative lg:px-2 px-1 lg:max-w-[270px]  max-w-[150px] w-full lg:px-8 pb-2 py-2  text-[12px] lg:text-lg font-semibold text-white rounded-full 
    bg-gradient-to-r from-blue-500 to-indigo-600  
    shadow-sm shadow-blue-500/30
    transition-all duration-300 ease-out
    hover:scale-105 hover:shadow-sm lg:hover:shadow-xl hover:shadow-blue-500/50
    active:scale-95 overflow-hidden group"> Hire a Freelancer</button>
                <button  data-aos="zoom-in-up" className="relative  lg:px-2 px-1 lg:max-w-[270px] max-w-[150px] w-full lg:px-8 pb-2 py-2  text-[12px] lg:text-lg font-semibold text-white rounded-full 
    bg-gradient-to-r from-blue-500 to-indigo-600  
    shadow-sm shadow-blue-500/30
    transition-all duration-300 ease-out
    hover:scale-105 hover:shadow-sm lg:hover:shadow-xl hover:shadow-blue-500/50
    active:scale-95 overflow-hidden group">Post Your Project</button>
            </div>

  </div>
  <div>
  <img  className="w-[800px] hover:scale-105 transition-all ease-out duration-300 image-shack-animation" src={freelance} alt="home main" />
  </div>
</div>
<br/>
<br/>
 <h2 className="bg-home ml-[7px] lg:ml-20  text-black text-[15px] lg:text-[25px] z-0 font-semibold font-arial">Built for Businesses That Want Results</h2>

<ul className="list-disc marker:text-blue-500 ml-10 lg:ml-[200px]">
  <li className="text-black font-semibold lg:text-lg text-sm">Startups & Entrepreneurs</li>
  <li className="text-black font-semibold lg:text-lg text-sm">small & Medium Businesses</li>
  <li className="text-black font-semibold lg:text-lg text-sm">Small & Medium Businesses</li>
  <li className="text-black font-semibold lg:text-lg text-sm">Coaches, Institutes & Agencies</li>
</ul>
<br/>
<h2 className="bg-home ml-[7px] lg:ml-20  text-black text-[10px] lg:text-[25px] z-0 font-semibold font-arial">We work as your extended tech team, not just freelancers.</h2>
</div>
<div className="mt-5">
  <h1 className="bg-home ml-[5px] lg:ml-20  text-blue-500 text-[20px] lg:text-[35px] z-0 font-bold font-arial">Build Something Smart Together</h1>
  <h2  className="bg-home ml-[7px] lg:ml-20  text-black text-[15px] lg:text-[25px] z-0 font-semibold font-arial">Have a project, business idea, or want to start learning with expert mentors?</h2>
  <h2  className="bg-home ml-[7px] lg:ml-20  text-black text-[15px] lg:text-[25px] z-0 font-semibold font-arial">Talk to our team and get a clear roadmap — free.</h2>

</div>
<div className='flex  flex-col lg:flex-row justify-center mt-5 items-center relative gap-10 lg:gap-20 '>
  <br/>
  {cardData.map((item,index)=>{
    return(
      <div key={index}  data-aos={`${index===0?"zoom-in-left":"zoom-in-right" }`} className="p-5 flex flex-col bg-blue-400 relative card-show  min-h-[200px] cursor-pointer h-full items-center max-w-[300px] justify-center  rounded-xl">
        <h1 className="text-white font-bold font-arial text-2xl ">{item.title}</h1>
        <h2 className="leading-[25px] font-semibold text-black">{item.description}</h2>
        <button  className="mt-2 relative  lg:px-2 px-1 lg:max-w-[270px] max-w-[150px] w-full lg:px-8 pb-2 py-2  text-[12px] lg:text-lg font-semibold text-white rounded-full 
    bg-gradient-to-r from-blue-500 to-indigo-600  
    shadow-sm shadow-blue-500/30
    transition-all duration-300 ease-out
    hover:scale-105 hover:shadow-sm lg:hover:shadow-xl hover:shadow-blue-500/50
    active:scale-95 overflow-hidden group">{item.btnText}</button>
      </div>
    )
  })}
</div>

</main>

  )
}

export default Main
