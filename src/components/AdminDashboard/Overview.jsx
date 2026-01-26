import axios from "axios";
import React, { useEffect, useState } from "react";

const Overview = () => {
  const API_URL="https://darshantechinnvations.shop"
const [userCount,setUserCount]=useState(0);
const [enrollmentsCount,setEnrollmentsCount]=useState(0);
const [coursesCount,setCoursesCount]=useState(0);
const handleUserCount=async()=>{
  try {
   const res= await axios.get(`${API_URL}/admin/users`,{withCredentials:true}) ;
   setUserCount(res.data.length)
  } catch (error) {
    console.log(error)
  }
}
const handleCourseCount=async()=>{
  try {
   const res= await axios.get(`${API_URL}/admin/courses`,{withCredentials:true}) ;
   setCoursesCount(res.data.length)
  } catch (error) {
    console.log(error)
  }
}
const handleEnrollmentsCount=async()=>{
  try {
   const res= await axios.get(`${API_URL}/admin/enrollment`,{withCredentials:true}) ;
   setEnrollmentsCount(res.data.length)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
handleUserCount()
handleCourseCount()
handleEnrollmentsCount()
},[])
  const overviewData = [
    { name: "Users", count: userCount, color: "bg-blue-100 text-blue-700" },
    { name: "Enrollments", count: enrollmentsCount, color: "bg-green-100 text-green-700" },
    { name: "Courses", count: coursesCount, color: "bg-purple-100 text-purple-700" },
    { name: "Quizzes", count:coursesCount, color: "bg-orange-100 text-orange-700" },
  ];

  
  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {overviewData.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl ${item.color}`}
          >
            <h1 className="text-xl font-semibold">{item.name}</h1>
            <h2 className="text-3xl font-bold mt-2">{item.count}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
