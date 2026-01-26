import React, { useEffect, useRef, useState } from 'react'
import profileLogo from "../assets/images/profile.png"
import { MdCameraAlt } from "react-icons/md";
import Header from './Header';
import axios from 'axios';
import Notification from './Notification';
import { Helmet } from "react-helmet";

import { useNavigate } from 'react-router-dom';
const ProfileCreate = () => {
   const [type,setType]=useState("")
   const [msg,setMsg]=useState("")
  const [username,setUsername]=useState("");
  const [skills,setSkills]=useState("")
  const [bio,setBio]=useState("")
  const fileRef=useRef(null)
  const [file,setFile]=useState(null)
  const [previewImg,setPreviewImg]=useState("")
  const handleChange=()=>{
    fileRef.current.click()
  }
const navigate= useNavigate()
useEffect(() => {
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);
  setPreviewImg(objectUrl);

  return () => URL.revokeObjectURL(objectUrl);
}, [file]);



const API_URL="https://darshantechinnvations.shop";
const handleProfile=async()=>{
 try {
  setMsg("Data Is Processing Please wait..")
  setType("info")
  const formData= new FormData()
  formData.append("username",username)
  formData.append("image",file)
  formData.append("skills",skills);
  formData.append('bio',bio)
  const responseData= await axios.post(`${API_URL}/user/profile/create`,formData,{withCredentials:true});
  setType(responseData.data.type)
  setMsg(responseData.data.msg)
  if(responseData.data.success){
    return navigate("/training/profile")
  }
 } catch (error) {
  console.log(error)
 }
}


const [profileData, setProfileData] = useState({});
 

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


  useEffect(()=>{
   const timeOut=setTimeout(()=>{
   if(profileData?.userName || profileData?._id){
    return navigate("/training/profile")
   }
   },100)
   return()=>{
    clearTimeout(timeOut)
   }
  
  },[profileData])

  return (
    <div>
      <Helmet>
  <title>Create Profile | DarshanTech Innovations LMS</title>

  <meta
    name="description"
    content="Create your learning profile at DarshanTech Innovations LMS. Add your bio, skills, and profile photo to personalize your learning journey."
  />

  <meta
    name="keywords"
    content="LMS Profile, Student Profile, Online Learning Profile, DarshanTech Innovations"
  />

  {/* Open Graph */}
  <meta property="og:title" content="Create Profile | DarshanTech Innovations" />
  <meta
    property="og:description"
    content="Create and manage your learning profile on DarshanTech Innovations LMS."
  />
  <meta property="og:type" content="website" />

  {/* Canonical */}
  <link
    rel="canonical"
    href="https://www.darshantechinnovations.tech/training/profile/create"
  />
</Helmet>
<script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "${username || "Student"}",
  "affiliation": {
    "@type": "Organization",
    "name": "DarshanTech Innovations"
  }
}
`}
</script>

      <Header/>
       <div className="bg-white">
    <div className="flex max-w-[300px] bg-white lg:max-w-[1000px] justify-center min-h-screen  flex-col lg:flex-row m-auto items-center">
      <div className="flex max-w-[300px] bg-white border lg:max-w-[1000px] justify-center  rounded-xl shadow flex-col lg:flex-row m-auto items-center">
   <div className="lg:h-[450px] h-auto lg:rounded-l-xl   lg:max-w-[1000px] lg:w-[50%] w-[350px]  flex justify-center p-2 lg:p-10 items-center flex-col bg-white ">
    <h1 className="text-center font-bold text-black font-['arial']  text-top mb-5  text-xl lg:text-3xl">Create Your Profile</h1>
    <h2 className="font-semibold text-black  text-sm lg:text-xl text-center ">Complete your profile to personalize your learning experience and connect with others.</h2>
 <h3 className="font-semibold text-blue-900 mt-1 text-center lg:text-sm text-sm">By creating a profile, you confirm that the information you provide is accurate and up to date.
You are responsible for maintaining the confidentiality of your account.
We do not share your personal information with third parties without your consent.</h3>
   </div>   
    <div className="flex flex-col lg:rounded-r-xl   justify-center max-w-[1000px] lg:w-[50%] w-[350px] h-[450px]  items-center gap-2 bg-white  lg:border-l-[1px]">
      <div className="flex flex-col relative  justify-center items-center">
        <label  className="text-white text-center font-semibold " htmlFor="profile Image">Upload a clear photo.</label>
        <img className="text-center w-[100px]  h-[100px] rounded-[50%]" src={previewImg || profileLogo} alt={"user profile  photo"} loading='lazy' />
        <span onClick={handleChange} className="text-3xl absolute right-5  p-2 bg-white/50 rounded-full top-[60px]"><MdCameraAlt/></span>
        <input  type="file" onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} className="hidden" />
      </div>
<div className="flex flex-col items-center" >
  <label className="text-white font-semibold" htmlFor="fullname"> FullName </label>
  <input onChange={(e)=>setUsername(e.target.value)} className="w-[300px] p-2 bg-white/90  border text-md rounded-lg text-black font-semibold focus:outline-none  focus:border-blue-900 border-[1px]" type="text" placeholder='John Dee' />
</div>
<div className="flex flex-col items-center" >
  <label className="text-white font-semibold" htmlFor="fullname"> Bio / About Us</label>
  <input onChange={(e)=>setBio(e.target.value)} className="w-[300px] p-2 bg-white/90 border text-md rounded-lg text-black font-semibold focus:outline-none  focus:border-blue-900 border-[1px]" type="text" placeholder='Best Tech resources provides the   best experience' />
</div>
<div className="flex flex-col items-center" >
  <label className="text-white font-semibold" htmlFor="fullname"> Skills </label>
  <input onChange={(e)=>setSkills(e.target.value)} className="w-[300px] p-2 bg-white/90 border text-md rounded-lg text-black font-semibold focus:outline-none  focus:border-blue-900 border-[1px]" type="text" placeholder='HTML CSS Python Java  React JavaScript SQL' />
</div>
<div>
  <button  onClick={handleProfile}
                className="mt-5 px-3 lg:px-6 py-2 rounded-full text-white font-semibold 
                bg-gradient-to-r from-blue-600 to-indigo-600 
                hover:from-indigo-600 hover:to-blue-600 
                transition-all duration-300"
              >
            Create Profile
              </button>
</div>
 <Notification
  message={msg}
  type={type}
  onClose={() => setMsg("")}
/>
</div>
</div>  
    </div>
    </div>
    </div>
  )
}

export default ProfileCreate
