import React, { useEffect, useState } from "react";
import Header from "./Header";
import logo from "../assets/images/darshantech.jpeg";
import { FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import Notification from "./Notification";
import { Helmet } from "react-helmet";
import LmsFooter from "./LMSFooter";
 
const Register = () => {
  const[msg,setMsg]=useState("")
  const[type,setType]=useState("")
  const [isHide, setHide] = useState(true);
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password1,setPassword1]=useState("")
const navigate = useNavigate();


 useEffect(()=>{

   if (type==="success") {
      const setTime= setTimeout(()=>{
  navigate("/training/authentication/login");
      },1500)
      return()=>clearTimeout(setTime)
    
   }
},[type])

const handleRegister = async () => {

  if(username==="" || email==="" || password1===""){
    return (setMsg("Please fill all the fields"),setType("info"))
  }
  try {
    const res = await axios.post(
      "http://localhost:5000/user/register",
      {
        username,
        email,
        password: password1,
      },
      {
        withCredentials: true,
      }
    );
  
    setMsg(res.data.msg)
    setType(res.data.type)
  } catch (err) {
    console.log(err);
    setMsg("Registration failed. Try again.");
  }
};
  return (
    <>
  <Helmet>
    <title>Register| DarshanTech Innovations</title>

    <meta
      name="description"
      content="Register to your DarshanTech Innovations account to access courses, dashboard, and learning resources."
    />

    {/* Prevent Google indexing */}
    <meta name="robots" content="noindex, nofollow" />

    {/* Mobile */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/* Security */}
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  </Helmet>

      <Header />
      <div className="bg-white min-h-screen">
      <div className="block md:hidden min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600 flex items-center justify-center px-4">

        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="DarshanTech" className="w-16 rounded-full mb-2" />
            <h1 className="text-2xl font-bold text-blue-600">DarshanTech</h1>
            <p className="text-sm text-gray-500">Innovations</p>
          </div>

          <h2 className="text-xl font-bold text-center mb-4">
            Create Account
          </h2>

          {/* Full Name */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Full Name</label>
            <input
              type="text" value={username}
 onChange={(e)=>setUsername(e.target.value)}              placeholder="John Doe"
              className="w-full mt-1 p-2 border rounded-xl focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full mt-1 p-2 border rounded-xl focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Password</label>
            <div className="flex border rounded-xl mt-1">
              <input value={password1} 
              onChange={(e)=>setPassword1(e.target.value)}
                type={isHide ? "password" : "text"}
                className="w-full p-2 rounded-l-xl focus:outline-none" placeholder="xxxxxxxxxx"
              />
              <span
                onClick={() => setHide(!isHide)}
                className="p-3 border-l cursor-pointer flex items-center"
              >
                {isHide ? <BiSolidHide /> : <IoEye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          {/* <div className="mb-4">
            <label className="text-sm font-semibold">Confirm Password</label>
            <div  className={`flex border-2 ${passwordValid?"border-2":"border-red-500"} rounded-xl mt-1`}>
              <input value={password2} 
              onChange={(e)=>setPassword2(e.target.value)}
                type={isHide2 ? "password" : "text"}
                className="w-full p-2 rounded-l-xl focus:outline-none" placeholder="xxxxxxxxxx"
              />
              <span
                onClick={() => setHide2(!isHide2)}
                className="p-3 border-l cursor-pointer flex items-center"
              >
                {isHide2 ? <BiSolidHide /> : <IoEye />}
              </span>
            </div>
          </div> */}

          <Notification
  message={msg}
  type={type}
  onClose={() => setMsg("")}
/>
            {/* Button */}
          <button className="w-full py-2 rounded-xl text-white font-bold bg-gradient-to-r from-blue-500 to-indigo-500" onClick={handleRegister}>
            Register 
          </button>
        
          {/* Login link */}
          <p className="text-center text-sm mt-4">
            Already have an account?
            <Link
              to="/training/authentication/login"
              className="text-blue-500 ml-1"
            >
              Login
            </Link>
          </p>

          {/* Disclaimer */}
          <p className="text-xs text-center mt-4 text-gray-500">
            By registering, you agree to our Terms of Service and Privacy Policy.
          </p>

        </div>
      </div>

      {/* ================================================== */}
      {/* ================= DESKTOP REGISTER ================ */}
      {/* ================================================== */}
      <div className="hidden md:block">

        {/* Logo */}
        <div className="flex justify-center items-center gap-20  ">
          <img className="w-20 rounded-full" src={logo} alt="DarshanTech" />
          <div className="flex flex-col items-center text-blue-500">
            <h1 className="text-4xl font-bold text-blue-600">DarshanTech</h1>
            <h2 className="text-2xl font-bold text-blue-200">Innovations</h2>
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-row  border shadow
        rounded-2xl 
          h-[450px] m-auto max-w-[1000px] w-full 
          justify-center items-center mt-3 overflow-hidden">

          {/* Left Panel */}
          <div className="w-1/2 bg-gradient-to-b from-blue-300 to-blue-500 
            h-full flex flex-col items-center justify-center gap-5 rounded-l-2xl relative">

            <h1 className="text-4xl text-black font-semibold">
              Create Your Account
            </h1>

            <div className="flex flex-col items-center">
              <h2 className="text-black text-xl">
                Already have an account?
              </h2>

              <Link
                to="/training/authentication/login"
                className="max-w-[150px] w-full p-2 mt-4 rounded-3xl 
                text-white font-bold text-lg text-center
                bg-gradient-to-r from-blue-500 to-indigo-500
                hover:from-blue-900 hover:to-indigo-400 transition-all"
              >
                Login
              </Link>
            </div>

            <footer className="absolute bottom-6 text-center text-sm px-4">
              By registering, you confirm that the information provided is accurate
              and you agree to our Terms of Service and Privacy Policy.
            </footer>
          </div>

          {/* Right Panel */}
          <div className="w-1/2 bg-white h-full flex flex-col items-center justify-center gap-3 p-6">

            {/* Full Name */}
            <div className="w-full">
              <label className="font-semibold">Full Name</label>
              <div className="flex border-2 rounded-xl mt-1">
                <input
                  type="text" value={username} onChange={(e)=>setUsername(e.target.value)}
                  className="w-full p-2 rounded-l-xl focus:outline-none"
                  placeholder="John Doe"
                />
                <span className="p-3 border-l flex items-center">
                  <FaUser />
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="font-semibold">Active Email</label>
              <div className="flex border-2 rounded-xl mt-1">
                <input
                  type="email" value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="w-full p-2 rounded-l-xl focus:outline-none"
                  placeholder="example@gmail.com"
                />
                <span className="p-3 border-l flex items-center">
                  <MdMail />
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="font-semibold">Password</label>
              <div className="flex border-2 rounded-xl mt-1">
                <input value={password1} onChange={(e)=>setPassword1(e.target.value)}
                  type={isHide ? "password" : "text"}
                  className="w-full p-2 rounded-l-xl focus:outline-none" placeholder="xxxxxxxxxx"
                />
                <span
                  onClick={() => setHide(!isHide)}
                  className="p-3 border-l cursor-pointer flex items-center"
                >
                  {isHide ? <BiSolidHide /> : <IoEye />}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            {/* <div className="w-full">
              <label className="font-semibold">Confirm Password</label>
              <div className={`flex border-2 ${passwordValid?"border-2":"border-red-500"} rounded-xl mt-1`}>
                <input
                  type={isHide2 ? "password" : "text"}
                  className="w-full p-2 rounded-l-xl focus:outline-none"  value={password2}
                  onChange={(e)=>setPassword2(e.target.value)} placeholder="xxxxxxxxxx"
                />
                <span
                  onClick={() => setHide2(!isHide2)}
                  className="p-3 border-l cursor-pointer flex items-center"
                >
                  {isHide2 ? <BiSolidHide /> : <IoEye />}
                </span>
              </div>
            </div> */}
  <Notification
  message={msg}
  type={type}
  onClose={() => setMsg("")}
/>
            {/* Button */}
            <button onClick={handleRegister} className="mt-4 px-10 py-2 rounded-3xl 
              text-white font-bold text-lg 
              bg-gradient-to-r from-blue-500 to-indigo-500
              hover:from-blue-900 hover:to-indigo-400 transition-all">
              Register
            </button>
          
          </div>
        </div>
      </div>
      </div>
      <LmsFooter/>
    </>
  );
};

export default Register;
