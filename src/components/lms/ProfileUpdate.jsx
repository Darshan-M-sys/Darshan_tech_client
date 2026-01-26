import React, { useEffect, useRef, useState } from 'react'
import profileLogo from "../assets/images/profile.png"
import { MdCameraAlt } from "react-icons/md";
import Header from './Header';
import axios from 'axios';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const ProfileUpdate = () => {
  const[success,setSuccess]=useState(false);
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
  useEffect(()=>{
   if(success){
    return navigate("/training/profile")
   }
  },[success])

  const handleProfileData=async()=>{
    try {
       const data=await axios.get("http://localhost:5000/user/profile",{withCredentials:true})
      
       setUsername(data.data.data.username  || "")
       setBio(data.data.data.bio || "")
       setPreviewImg(data.data.data.profile_Imag)
       setSkills(data.data.data.skills)
    } catch (error) {
       console.log(error)
    }
  }

  useEffect(()=>{
    handleProfileData()
  },[])
  useEffect(() => {
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);
  setPreviewImg(objectUrl);

  return () => URL.revokeObjectURL(objectUrl);
}, [file]);

const handleUpdate=async()=>{
 try {
  setType("info")
  setMsg("Data Is Processing Please wait..")
  const formData= new FormData()
  formData.append("username",username)
  formData.append("image",file)
  formData.append("skills",skills);
  formData.append('bio',bio)
  const responseData= await axios.put("http://localhost:5000/user/profile/update",formData,{withCredentials:true});
  setType(responseData.data.type)
  setMsg(responseData.data.msg)
   setSuccess(responseData.data.success)
 } catch (error) {
  console.log(error)
 }
}


  return (
    <div>
       <Helmet>
        <title>Update Profile | DarshanTech LMS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header/>
      <div className="bg-white">
    
    <div className="flex max-w-[300px]   lg:max-w-[1000px] justify-center min-h-screen  flex-col lg:flex-row m-auto items-center">
      <div className="flex max-w-[300px]   lg:max-w-[1000px] justify-center border rounded-sm shadow   flex-col lg:flex-row m-auto items-center">
   <div className="lg:h-[450px] h-auto lg:rounded-l-xl   lg:max-w-[1000px] lg:w-[50%] w-[350px]  flex justify-center p-2 lg:p-10 items-center flex-col bg-white ">
    <h1 className="text-center font-bold text-black font-['arial'] mb-5  text-xl lg:text-3xl">Update Your Profile</h1>
    <h2 className="font-semibold text-black  text-sm lg:text-xl text-center ">You can update your personal details anytime. Changes will be reflected immediately.</h2>
 <h3 className="font-semibold text-blue-900 text-center lg:text-sm text-sm">By updating your profile, you confirm that the information provided is accurate and appropriate.
Misuse or false information may result in account restrictions.</h3>
   </div>   
    <div className="flex flex-col lg:rounded-r-xl    justify-center max-w-[1000px] lg:w-[50%] w-[350px] h-[450px]  items-center gap-2 lg:border-l-[1px]">
      <div className="flex flex-col relative  justify-center items-center">
        <label  className="text-black text-center font-semibold " htmlFor="profile Image">Upload a clear photo.</label>
        <img className="text-center w-[100px]  h-[100px] rounded-[50%]" src={previewImg || profileLogo} alt={"profile"} />
        <span onClick={handleChange} className="text-3xl absolute right-5  p-2 bg-white/50 rounded-full top-[60px]"><MdCameraAlt/></span>
        <input  type="file"  onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} className="hidden" />
      </div>
<div className="flex flex-col items-center" >
  <label className="text-black font-semibold" htmlFor="fullname"> FullName </label>
<input
  name="username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="w-[300px] p-2 bg-white/90 border text-md rounded-lg text-black font-semibold focus:outline-none focus:border-blue-900 border"
  type="text"
  placeholder="John Dee"
/>

</div>
<div className="flex flex-col items-center" >
  <label className="text-black font-semibold" htmlFor="fullname"> Bio / About Us</label>
  <input value={bio} onChange={(e)=>setBio(e.target.value)} className="w-[300px] p-2 bg-white/90 border text-md rounded-lg text-black font-semibold focus:outline-none  focus:border-blue-900 border-[1px]" type="text" placeholder='Best Tech resources provides the   best experience' />
</div>
<div className="flex flex-col items-center" >
  <label className="text-black font-semibold" htmlFor="fullname"> Skills </label>
  <input value={skills} onChange={(e)=>setSkills(e.target.value)} className="w-[300px] p-2 bg-white/90 border text-md rounded-lg text-black font-semibold focus:outline-none  focus:border-blue-900 border-[1px]" type="text" placeholder='HTML CSS Python Java  React JavaScript SQL' />
</div>
<div>
 <button  onClick={handleUpdate}
                className="mt-5 px-3 lg:px-6 py-2 rounded-full text-white font-semibold 
                bg-gradient-to-r from-blue-600 to-indigo-600 
                hover:from-indigo-600 hover:to-blue-600 
                transition-all duration-300"
              >
           Update Profile
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

export default ProfileUpdate
