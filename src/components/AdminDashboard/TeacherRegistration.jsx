import React, { useState } from 'react'
import Notification from '../lms/Notification'
import { HiEyeSlash, HiMiniEye } from "react-icons/hi2";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from 'axios';

const TeacherRegistration = () => {
  const [type, setType] = useState("")
  const [msg, setMsg] = useState("")
  const [hide, setHide] = useState(true)
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")

  const handleTeacher=async()=>{
    try {
      if(email==="" || username==="" || password===""){
        return (setType("info") , setMsg("all files require"))
      }
      const teacherRegistration= await axios.post(`${API_URL}/user/teacher_registration`,{username,email,password},{withCredentials:true})
       setMsg(teacherRegistration.data.msg);
       setType(teacherRegistration.data.type)
       if(type==="success"){
        window.location.reload()
       }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100">

      <div className="bg-white w-[380px] p-6 rounded-2xl shadow-xl relative">

        {/* Title */}
        <h1 className="font-bold text-2xl text-center text-gray-800 mb-6">
          Teacher Registration
        </h1>

        {/* Name */}
        <div className="relative mb-4">
          <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
          <input onChange={(e)=>setUsername(e.target.value)}
            type="text"
            placeholder="Teacher Name"
            className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <MdEmail className="absolute left-3 top-3 text-gray-400" />
          <input onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="Teacher Email"
            className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <input onChange={(e)=>setPassword(e.target.value)}
            type={hide ? "password" : "text"}
            placeholder="Password"
            className="w-full pl-4 pr-10 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span
            onClick={() => setHide(!hide)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
          >
            {hide ? <HiEyeSlash /> : <HiMiniEye />}
          </span>
        </div>

        {/* Button */}
        <button onClick={handleTeacher}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition"
        >
          Register Teacher
        </button>

        {/* Notification */}
       
       
            <Notification
              message={msg}
              type={type}
              onClose={() => setMsg("")}
            />
     
       

      </div>
    </div>
  )
}

export default TeacherRegistration
