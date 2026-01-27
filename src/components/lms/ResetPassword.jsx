import React, { useEffect, useState } from 'react'
import Header from './Header'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from './Notification';
import LmsFooter from './LMSFooter';
const ResetPassword = () => {
  const [msg,setMsg]=useState("");
  const [type,setType]=useState("");
  const [hide,setHide]=useState(false);
  const [hide1,setHide1]=useState(false);
  const{state}=useLocation();
  const [password1,setPassword1]=useState("")
  const [password2,setPassword2]=useState("")
  const navigate =useNavigate()

useEffect(()=>{
   if(type==="success"){
  const setTime= setTimeout(() => {
      navigate("/training/authentication/login")
  }, 1500);
  return ()=>clearTimeout(setTime)
   }
},[type,navigate])
const API_URL="https://darshantechinnvations.shop";
const handleResetPassword=async()=>{
    try {
      if(!(password1===password2)){
           return (setType("info"),setMsg("Please Confirm the password"))
         }
const data = await axios.post(`${API_URL}/user/reset_password`,{email:state.email,otp:state.otp,password:password1})   
     
          setType(data.data.type)
          setMsg(data.data.msg)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div>
    <Header/>
    <div className="flex justify-center items-center  min-h-[80vh]">
      <div className="bg-white p-4  rounded-xl ">
 <h1 className='text-black font-semibold text-center text-xl'>
Reset Password
 </h1>
 <div className="flex flex-col max-w-[300px] gap-10" >
  <div>
 <label className="m-1" htmlFor="password1"> New Password</label>
 <div className="w-[300px] border rounded-xl flex items-center ">
 <input value={password1}  onChange={(e)=>setPassword1(e.target.value)} className="w-full p-2 rounded-l-xl text-xl  focus:outline-none  border-r-none "  type={!hide?"password":"text"}  placeholder="XXXXXXXXXXX" />
 <span onClick={hide?()=>setHide(false):()=>setHide(true)} className=" px-2 border-l-[1px] py-3 cursor-pointer">{!hide?<IoEyeOff/>:<IoEye/>}</span>
 </div>
 </div>
 <div>
 <label className="m-1" htmlFor="password1">Confirm Password</label>
 <div className="w-[300px] border rounded-xl flex items-center ">
 <input className="w-full p-2 rounded-l-xl text-xl  focus:outline-none  border-r-none "type={!hide1?"password":"text"}  onChange={(e)=>setPassword2(e.target.value)}   value={password2}  placeholder="XXXXXXXXXXX" />
 <span onClick={hide1?()=>setHide1(false):()=>setHide1(true)} className=" px-2   border-l-[1px] py-3">{!hide1?<IoEyeOff/>:<IoEye/>}</span>
 </div>
<div className="flex justify-center "> 
  <button onClick={handleResetPassword} className="w-full py-2 rounded-xl text-white font-bold bg-gradient-to-r from-blue-500 to-indigo-500 mx-4 mt-5 " >
          Reset
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
    <LmsFooter/>
    </>
  )
}

export default ResetPassword
