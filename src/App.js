import React, { useEffect } from 'react'
import Home from './components/home/Home'
import {Route,Routes} from "react-router-dom"
import AOS from "aos";
import LMS from './components/lms/LMS';
import Courses from './components/lms/Courses';
import Login from './components/lms/Login';
import Register from './components/lms/Register';
import OtpInput from './components/lms/OtpInput';
import ResetPassword from './components/lms/ResetPassword';
import ProfileCreate from './components/lms/ProfileCreate';
import ProfileUpdate from './components/lms/ProfileUpdate';
import Profile from './components/lms/Profile';
import CreateCourse from './components/lms/CreateCourse';

import LearnCourse from './components/lms/Sdashboard/LearnCourse';
import AboutUs from './components/home/AboutUs';
import Services from './components/home/Services';
import ContactUs from './components/home/ContactUs';
import Solutions from './components/home/Solutions';
import Projects from './components/lms/Projects';
import Compiler from './components/lms/Compiler';
import Live from './components/lms/Live';

import LiveRegister from './components/lms/SttudentLiveRegistration';
import WaitingRoom from './components/lms/StudentWaitingLive';
import LiveCreate from './components/lms/LiveCreate';
import TeacherLive from './components/lms/TeacherLiveStart';
import MyProfile from './components/lms/TeacherDashboard/MyProfile';
import Dashboard from './components/lms/Dashboard';
const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      easing: "ease-out-cubic",
      once: false,        
      offset: 120,        
    });
  }, []);
  return (
    <div>
      <Routes >
      <Route path="/" element={<Home/>}/>
      <Route path="/training" element={ <LMS/>}/>
      <Route path="/training/courses" element={ <Courses/>}/>
      <Route path="/training/profile/create" element={ <ProfileCreate/>}/>
      <Route path="/training/dashboard" element={ <Dashboard/>}/>
      <Route path="/training/founder/" element={ <MyProfile/>}/>
      <Route path="/training/profile" element={<Profile/>}/>
      <Route path="/training/course/create" element={<CreateCourse/>}/>
      <Route path="/training/course/:id" element={<LearnCourse/>}/>
      <Route path="/training/profile/Update" element={ <ProfileUpdate/>}/>
    <Route path="/training/projects/" element={ <Projects/>}/>
    <Route path="/teacher/live" element={ <LiveCreate/>}/>
    <Route path="/training/compiler/" element={ <Compiler/>}/>
      <Route path="/training/authentication/login" element={<Login/>}/>
      <Route path="/about/" element={<AboutUs/>}/>
      <Route path="/service/" element={<Services/>}/>
      <Route path="/contactUs/" element={<ContactUs/>}/>
      <Route path="/live/" element={<Live/>}/>
      <Route path="/hosting/teacher/live/" element={<TeacherLive/>}/>
      <Route path="/register" element={<LiveRegister/>}/>
      <Route path="/waiting" element={<WaitingRoom/>}/>
      <Route path="/solutions/" element={<Solutions/>}/>
      <Route path="/training/authentication/register" element={<Register/>}/>
      <Route path="/training/authentication/password-reset" element={<OtpInput/>}/>
      <Route path="/training/authentication/reset-password" element={<ResetPassword/>}/>
     </Routes>
    </div>
  )
}

export default App
