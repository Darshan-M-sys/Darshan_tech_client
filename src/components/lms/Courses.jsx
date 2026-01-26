import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import RegistrationWaiting from "./RegistrationWaiting";
import { Helmet } from "react-helmet";
import LmsFooter from "./LMSFooter";


const Courses = () => {
const[show,setShow]=useState(false);
const [courseData,setCourseData]=useState([])
     const API_URL="https://darshantechinnvations.shop";
const handleCourseData=async()=>{
  
  try {
    const data=await axios.get(`${API_URL}/course`);
    setCourseData(data.data.data || [])
  } catch (error) {
    console.log(error)
  }
}
const [singleCourse,setSingleCourse]=useState({})
const handleSingleCourseData=async(id)=>{
  try {
    if(id){
     const data= await axios.get(`${API_URL}/course/${id}`);
     setSingleCourse(data.data.data || {})
     setShow(true)
    }
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
handleSingleCourseData()
},[])

useEffect(()=>{
handleCourseData()
},[])
const[message,setMessage]=useState('')
const handleEnrollment=async(courseId)=>{
try {

   const enrollmentData=await axios.post(`${API_URL}/enrollment/student/${courseId}`,{},{withCredentials:true});
  //  alert( enrollmentData.data.msg)
  if(enrollmentData.data.success){
   return (setMessage(enrollmentData.data.msg),setOpen(true))
  }else{
    alert(enrollmentData.data.msg)
  }
} catch (error) {
  console.log(error)
}
 }
 const [open,setOpen]=useState(false)
const[search,setSearch]=useState("")
  return (
    <>
    <div>

      <Helmet>
  <title>Courses | DarshanTech Innovations – Learn Industry-Ready Skills</title>

  <meta
    name="description"
    content="Explore industry-ready courses at DarshanTech Innovations including Full Stack Web Development, React.js, Backend, LMS Development, and Freelancing. Learn with real projects and mentor support."
  />

  <meta
    name="keywords"
    content="Full Stack Course, React Course, Web Development Training, LMS Courses, Programming Courses, DarshanTech Innovations"
  />

  {/* Open Graph */}
  <meta property="og:title" content="Courses | DarshanTech Innovations" />
  <meta
    property="og:description"
    content="Learn job-ready tech skills with project-based courses at DarshanTech Innovations."
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content="https://www.darshantechinnovations.com/training/courses"
  />

  {/* Canonical */}
  <link
    rel="canonical"
    href="https://www.darshantechinnovations.com/training/courses"
  />
</Helmet>
<Helmet>
  <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Courses by DarshanTech Innovations",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Full Stack Web Development",
          "description": "Learn MERN stack with real-world projects.",
          "provider": {
            "@type": "Organization",
            "name": "DarshanTech Innovations",
            "url": "https://www.darshantechinnovations.com"
          }
        },
        {
          "@type": "Course",
          "name": "React.js Mastery",
          "description": "Advanced frontend development using React.js.",
          "provider": {
            "@type": "Organization",
            "name": "DarshanTech Innovations"
          }
        },
        {
          "@type": "Course",
          "name": "Backend Development",
          "description": "Build secure APIs using Node.js and MongoDB."
        },
        {
          "@type": "Course",
          "name": "LMS & EdTech Development",
          "description": "Build a full LMS platform from scratch."
        }
      ]
    }
    `}
  </script>
</Helmet>

      <Header/>
    <div className=" p-1 lg:p-6 bg-white">
      <div className="bg-white shadow border p-5 rounded-sm">
    <div className=" flex flex-col lg:flex-row  justify-between">
         <div className="relative w-full md:w-[300px]">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text" onChange={(e)=>setSearch(e.target.value)} value={search}
                      placeholder="Search user..."
                      className="pl-10 pr-3 py-2 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
      <h1  className="text-3xl flex-1 text-gray-900 font-extrabold text-center font-['arial'] mb-8">
        Our Courses
      </h1>
       <div className="relative w-full  hidden lg:block md:w-[300px]">
                   <select  className="pl-10 pr-3 py-2 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400">
<option>Web development</option>
<option>Full Stack </option>
<option>Python Programming</option>
<option>MongoDB</option>
<option>Frontend</option>
<option>Backend</option>
<option>AL ML</option>
                   </select>
                   
                  </div>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {courseData.filter((cor)=>{
       return   cor.title.toLowerCase().includes(search.toLowerCase()) ||   cor?.description.toLowerCase().includes(search.toLowerCase())
        }).map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:scale-105 transition duration-300"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {course.title}
              </h2>

             <p
  className="text-gray-600 text-sm mt-2 line-clamp-2"
 
>
  
   {course?.shortDescription}</p>
              <p className="mt-3 text-sm">
                <Link to="/training/founder/" className="flex items-center gap-2 ">               
                 <img className="w-[40px] h-[40px] bg-blue-500 rounded-[50%] border" src={course.teacherProfileId?.profile_Imag} alt="profile" />
             <span className="font-medium text-blue-400">{course.teacherId?.username}</span></Link>
              </p>


              <div className="flex  flex-col justify-between mt-4">
                <div className="flex justify-between ">
                <p className="text-lg font-bold text-blue-600">
                  {course.price}
                </p>
                 <p className="text-lg font-bold text-blue-600">
                 <span className="text-black">Duration</span> {course.totalDuration}
                </p>
                </div>
                <br/>
                <button onClick={()=>handleSingleCourseData(course._id)} className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
                  View Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {show && (
     <div className="fixed top-[80px] z-[999]  overflow-y-auto w-full h-[100vh]  left-0 lg:left-none  bg-white/50 backdrop-blur-[10px]">
    
        <div className="max-w-4xl relative  border mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-[10px] mb-[100px]">
          <div className="relative">
<button onClick={()=>setShow(false)} className="absolute  shadow shadow-xl top-0 right-0  text-lg p-2 px-4 rounded-full bg-gray-100">X</button>
          <img
            src={singleCourse.thumbnail}
            alt={singleCourse.title}
            className="h-64 w-full object-cover"
          />

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {singleCourse.title}
            </h2>

            {/* Short Description */}
            <p className="text-gray-600 mt-2">
              {singleCourse.shortDescription}
            </p>

            {/* Full Description */}
            <div
              className="text-gray-700 text-sm mt-4"
              dangerouslySetInnerHTML={{
                __html: singleCourse.description
              }}
            />

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <p>👨‍🏫Instructor <strong>{singleCourse.teacherId?.username}</strong></p>
              <p>⏱ Duration <strong>{singleCourse.totalDuration}</strong></p>
              <p>📘 Level: <strong>Beginner to Advance</strong></p>
              <p>💰 Price: <strong>{singleCourse.price}</strong></p>
            </div>

            <button onClick={()=>handleEnrollment(singleCourse._id)} className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Register / Enroll
            </button>
              <RegistrationWaiting  isOpen={open}
  onClose={() => setOpen(false)} message={message}/>
          </div>
          </div>
          </div>
        
        </div>
      
      )
}
  <section className="bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto lg:px-6 px-1 py-16">

        {/* HERO */}
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our Courses
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-4xl mx-auto">
            Learn industry-relevant technical skills with{" "}
            <span className="font-semibold text-indigo-600">
              DarshanTech Innovations
            </span>
            . Our courses are designed to be practical, beginner-friendly, and
            focused on real-world projects that prepare you for jobs and
            freelancing.
          </p>
        </header>

        {/* WHY OUR COURSES */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Why Learn With Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Project-Based Learning
              </h3>
              <p className="text-gray-600">
                Learn by building real-world applications instead of just
                watching theory-based lectures.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Beginner to Advanced
              </h3>
              <p className="text-gray-600">
                Courses are structured step-by-step so even beginners can
                confidently master advanced concepts.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Industry-Oriented Skills
              </h3>
              <p className="text-gray-600">
                Learn the exact skills companies and clients expect from
                professional developers.
              </p>
            </div>
          </div>
        </section>

        {/* COURSES LIST */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Available Courses
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* COURSE CARD */}
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
                Full-Stack Web Development {"(MERN)"}
              </h3>
              <p className="text-gray-600 mb-4">
                Master frontend and backend development by building complete
                real-world applications using MongoDB, Express, React, and
                Node.js.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>HTML, CSS, JavaScript</li>
                <li>React.js & State Management</li>
                <li>Node.js & Express</li>
                <li>MongoDB & Authentication</li>
                <li>Real Projects & Deployment</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
                Frontend Development
              </h3>
              <p className="text-gray-600 mb-4">
                Learn how to create responsive, modern, and user-friendly
                interfaces using the latest frontend technologies.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>HTML5, CSS3, JavaScript</li>
                <li>Tailwind CSS</li>
                <li>React.js</li>
                <li>UI/UX Best Practices</li>
                <li>Performance Optimization</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
                Backend Development
              </h3>
              <p className="text-gray-600 mb-4">
                Build powerful and secure backend systems with Node.js,
                databases, and authentication.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Node.js & Express</li>
                <li>REST APIs</li>
                <li>MongoDB</li>
                <li>Authentication & Security</li>
                <li>API Integration</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
                React.js Mastery
              </h3>
              <p className="text-gray-600 mb-4">
                Deep dive into React.js and learn how to build scalable frontend
                applications.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Hooks & Components</li>
                <li>State & Props</li>
                <li>API Integration</li>
                <li>Performance Optimization</li>
                <li>Real Projects</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
                LMS & EdTech Development
              </h3>
              <p className="text-gray-600 mb-4">
                Learn how to build a complete Learning Management System from
                scratch.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Course Management</li>
                <li>User Roles & Permissions</li>
                <li>Video & Content Delivery</li>
                <li>Quizzes & Progress Tracking</li>
                <li>Admin Dashboard</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-3">
                Freelancing for Developers
              </h3>
              <p className="text-gray-600 mb-4">
                Learn how to get clients, price your work, and build a successful
                freelancing career as a developer.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Client Communication</li>
                <li>Project Planning</li>
                <li>Pricing Strategies</li>
                <li>Portfolio Building</li>
                <li>Real Freelance Guidance</li>
              </ul>
            </div>

          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Trusted Learning Experience
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Real-World Projects
              </h3>
              <p className="text-gray-700">
                Every course includes practical projects that simulate real
                industry scenarios.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Mentor Support
              </h3>
              <p className="text-gray-700">
                Get guidance, feedback, and doubt-clearing support throughout
                your learning journey.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <footer className="bg-indigo-600 rounded-3xl text-center text-white p-12">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Learning Journey Today
          </h2>
          <p className="max-w-3xl mx-auto text-indigo-100 mb-6">
            Join DarshanTech Innovations and gain the skills needed to succeed
            in software development, freelancing, and tech careers.
          </p>
          <Link to="/training/courses"  className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
            View Courses
          </Link>
        </footer>

      </div>
    </section>
</div>
</div>
    </div>
    <LmsFooter/>
    </>
  );
};

export default Courses;
