import React, { useEffect, useState } from 'react'

import Users from '../AdminDashboard/Users'
import { FaChevronLeft } from "react-icons/fa";
import TeacherRegistration from '../AdminDashboard/TeacherRegistration';
import Course from '../AdminDashboard/Course';
import { Link } from 'react-router-dom';
import Overview from '../AdminDashboard/Overview';
import Enrollments from '../AdminDashboard/Enrollments';
import axios from 'axios';
const AdminDashboard = () => {

  const [activeTab,setActiveTab]=useState("overview");
  
const [profileData, setProfileData] = useState({});
      const API_URL="https://darshantechinnvations.shop";

  const handleProfileData = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/user/profile`,
        { withCredentials: true }
      );
      setProfileData(res.data.data || {});
      
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    handleProfileData();
  }, []);


  return (
    <div >
     
 <div className="bg-white flex items-center gap-20 h-[80px] shadow" >
   <div className="flex justify-between items-center w-full shadow py-1">
  <Link to="/training/" className="font-semibold  p-2 bg-gray-200 rounded-full ml-2  mt-2  text-[20px] text-blue-500 "><FaChevronLeft/></Link>
  <h1 className="font-semibold text-center text-5xl text-blue-400 ">
Admin Dashboard
  </h1>
  <Link to="/training/profile/">
   <img src={profileData.profile_Imag} className="w-[50px] mr-5 h-[50px] border-[1px] border-blue-500 bg-yellow-500 rounded-[50%] text-end" alt="profile" /></Link>
   </div>
 </div>
 
    <div className="bg-white min-h-[100vh] fixed top-[70px] w-[100%]">
    <div className="flex flex-col gap-1   w-[250px]   bg-white h-full fixed left-0   min-h-[100vh] shadow shadow-xl">
      <h1 className="font-[600] text-xl px-5 py-2   rounded-sm bg-blue-600" >Dashboard</h1>
        <h1 onClick={()=>setActiveTab("overview")} className={`${activeTab==="overview"?"bg-blue-200":""} font-[600] hover:bg-blue-400 transition-all  rounded-xl duration-300 cursor-pointer  px-5 py-2  text-xl`}>Overview</h1>
        <h1 onClick={()=>setActiveTab("users")} className={`${activeTab==="users"?"bg-blue-200":""} font-[600]  hover:bg-blue-400 transition-all  rounded-xl duration-300 cursor-pointer px-5 py-2   text-x`}>Users</h1>
        <h1 onClick={()=>setActiveTab("courses")} className={`${activeTab==="courses"?"bg-blue-200":""} font-[600] hover:bg-blue-400 transition-all  rounded-xl duration-300 cursor-pointer px-5  py-2  text-xl`}>Courses</h1>
        <h1 onClick={()=>setActiveTab("teacherRegister")} className={`${activeTab==="teacherRegister"?"bg-blue-200":""} font-[600] hover:bg-blue-400 transition-all  rounded-xl duration-300 cursor-pointer px-5  py-2  text-xl`}>Teacher Register</h1>
        <h1 onClick={()=>setActiveTab("enrollment")} className={`${activeTab==="enrollment"?"bg-blue-200":""} font-[600] hover:bg-blue-400 transition-all  rounded-xl duration-300 cursor-pointer px-5  py-2  text-xl`}>Enrollments</h1>
    </div>
      <div className="ml-[250px]">
{activeTab==="overview" && 
<Overview/>}
{activeTab==="users" && 
<Users/>}
{activeTab==="teacherRegister" && 
<TeacherRegistration/>}
{activeTab==="courses" && 
<Course/>}
{activeTab==="enrollment" && 
<Enrollments/>}

      </div>
      </div>
    </div>
 
  )
}

export default AdminDashboard
