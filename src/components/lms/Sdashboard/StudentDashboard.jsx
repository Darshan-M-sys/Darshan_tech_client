import { useEffect, useState } from "react";
import Header from "../Header";
import CourseCard from "./CourseCard";
import DashboardHeader from "./DarshboardHeader";
import Sidebar from "./SlideBar";
import StatsCard from "./StatsCard";
import axios from "axios";
import profile from "../../assets/images/profile.png"

const StudentDashboard = () => {

  const [profileData, setProfileData] = useState({});
  const [myCourses, setMyCourses] = useState([]);


  const handleMyCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/enrollment/student",
        { withCredentials: true }
      );
      setMyCourses(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } 
  };

useEffect(() => {
    handleMyCourses();
  }, []);

  
    const handleProfileData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/user/profile",
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
    <>
    <Header/>
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-6">
        <DashboardHeader name={profileData.username} image={profileData.profile_Imag || profile} />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <StatsCard title="Enrolled Courses" value={myCourses.length} />
          <StatsCard title="Certificates" value="0" />
        </div>

        {/* Courses */}
        <h2 className="text-xl font-semibold mt-8 mb-4">My Courses</h2>
       
          <CourseCard/>
    
      </div>
    </div>
    </>
  );
};

export default StudentDashboard;
