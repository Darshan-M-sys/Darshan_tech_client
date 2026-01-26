import React, {  useEffect, useState } from 'react'
import { BiMenu } from 'react-icons/bi';
import { FaArrowLeft} from 'react-icons/fa'
import Overview from './TeacherDashboard/Overview';
import axios from 'axios';
import Courses from './TeacherDashboard/Courses';
import { Link } from 'react-router-dom';
import MyCourses from './TeacherDashboard/MyCourses';
import MyStudents from './TeacherDashboard/MyStudents';
import EnrollmentCancellation from './TeacherDashboard/EnrollmentCancellation';
import LiveCreate from "./LiveCreate"
import StudentProgress from './TeacherDashboard/StudentProgress';
const TeacherDashboard = () => {
  const[menu,setMenu]=useState(false)

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

const [myStudents,setMyStudents]=useState([])
 const handleMyStudents=async()=>{
  try {
    const res= await axios.get(`${API_URL}/teacher/dashboard/students`,{withCredentials:true});
    setMyStudents(res.data.data || [])
  } catch (error) {
    console.log(error)
  }
 }
  const [myCourses,setMyCourses]=useState([])
  const handleCoursesLength=async()=>{
const res= await axios.get(`${API_URL}/teacher/dashboard/courses`,{withCredentials:true});
    setMyCourses(res.data.data || [])
  }
  useEffect(()=>{
   handleCoursesLength()
   handleMyStudents()
  },[])



   const [activeTab,setActiveTab]=useState("overview")
  return (
    <>
    <div className="min-h-screen w-full bg-white">
      <div className="flex items-center p-2 lg:p-4 justify-between   bg-white   gap-2 lg:gap-20 border border-b fixed top-0 w-full ">
       <Link to='/training/'> <FaArrowLeft className="p-1 bg-gray-100 shadow border rounded-full text-2xl hover:text-blue-500 transition-all duration-300  hover:scale-150 cursor-pointer" /> </Link>
        <h1 className=" text-xl text-blue-500 font-bold  lg:text-4xl ">Teacher</h1>
   <BiMenu   onClick={menu?()=>setMenu(false):()=>setMenu(true)} className="p-1 bg-gray-100 shadow border rounded-full text-3xl hover:text-blue-500 transition-all duration-300  hover:scale-100 cursor-pointer lg:hidden"/>
  <Link to="/training/profile"> <img src={profileData.profile_Imag} alt={profileData.username} className="p-1 bg-gray-100 w-[30px] h-[30px] shadow border rounded-full text-2xl hover:text-blue-500 transition-all duration-300  hover:scale-150 cursor-pointer"/></Link>
      </div>

      <div  className={`lg:flex flex-col fixed hidden  bg-white top-0   min-h-screen mt-[73px] w-[150px] overflow-y-auto  transition-all duration-300 ease-in border border-l lg:w-[250px]`}>
<p className="text-xl font-bold bg-blue-900 px-4 py-2  text-white ">Dashboard</p>
<p onClick={()=>setActiveTab("overview")}  className={`text-lg ${activeTab==="overview"?"bg-blue-300":""}  font-bold transition-all duration-300  hover:bg-blue-400 px-4 py-2  text-black`}>Overview</p>
<p onClick={()=>setActiveTab("course")} className={`text-lg ${activeTab==="course"?"bg-blue-300":""}  font-bold transition-all duration-300  hover:bg-blue-400 px-4 py-2  text-black`}>Course Management</p>

<p  onClick={()=>setActiveTab("myCourses")}  className={`text-lg ${activeTab==="myCourses"?"bg-blue-300":""}  font-bold transition-all duration-300  hover:bg-blue-400 px-4 py-2  text-black`}>My Courses</p>
<p  onClick={()=>setActiveTab("myStudents")}  className={`text-lg ${activeTab==="myStudents"?"bg-blue-300":""}  font-bold transition-all duration-300  hover:bg-blue-400 px-4 py-2  text-black`}>My Students</p>

<p onClick={()=>setActiveTab("enrollmentCancellation")} className={`text-lg ${activeTab==="enrollmentCancellation"?"bg-blue-300":""}  font-bold transition-all duration-300  hover:bg-blue-400 px-4 py-2  text-black`}>Enrollment Cancellation</p>
<p onClick={()=>setActiveTab("studentProgress")} className={`text-lg ${activeTab==="studentProgress"?"bg-blue-300":""}  font-bold transition-all duration-300  hover:bg-blue-400 px-4 py-2  text-black`}>student Progress</p>
<p onClick={()=>setActiveTab("live")} className={`text-lg ${activeTab==="enrollmentCancellation"?"bg-blue-300":""}  font-bold transition-all duration-300  hover:bg-blue-400 px-4 py-2  text-black`}>Live Register</p>
      </div>

     <div className="lg:ml-[250px]  mt-[40px] lg:mt-[72px]">
      <br/>
      {activeTab==="overview"  && (
        <Overview myCoursesLength={myCourses.length} myStudents={myStudents.length}/>
      )}
      {activeTab==="course"  && (
        <Courses/>
      )}
      {activeTab==="myCourses"  && (
        <MyCourses courses={myCourses}/>
      )}
      {activeTab==="myStudents"  && (
        <MyStudents courses={myCourses}/>
      )}
       {activeTab==="enrollmentCancellation"  && (
        <EnrollmentCancellation students={myStudents}/>
      )}
       {activeTab==="live"  && (
        <LiveCreate />
      )}
       {activeTab==="studentProgress"  && (
        <StudentProgress students={myStudents} />
      )}
   </div>
    </div>
    </>
  )
}


export default TeacherDashboard
