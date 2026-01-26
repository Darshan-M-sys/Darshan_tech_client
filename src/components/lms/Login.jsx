import React, { useEffect, useState } from "react";
import Header from "./Header";
import logo from "../assets/images/darshantech.jpeg";
import { MdMail } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "./Notification";
import { Helmet } from "react-helmet";
import LmsFooter from "./LMSFooter";

const Login = () => {
 const API_URL="https://darshantechinnvations.shop";
    const [msg,setMsg]=useState("")
const [profileData, setProfileData] = useState({});
 

  const handleProfileData = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/user/profile `,
        { withCredentials: true }
      );
      setProfileData(res.data.data || {});
      
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    handleProfileData();
  }, [msg]);


  const [type,setType]=useState("")
  const [isHide, setHide] = useState(true);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [success,setSuccess]=useState(false)
const navigate= useNavigate()

    const handleForgetPassword=async()=>{
      try {
        if(!email){
        return(  
          setMsg("Email is require"),setType("info"))
        }
        setMsg("Please wait  otp is sent to email")
        setType("info")
       const data= await axios.post(`${API_URL}/user/forget_password`,{email});
        setMsg(data.data.msg)
        setType(data.data.type)
         setSuccess(data.data.success)
      } catch (error) {
        console.log(error)
        setType("error")
      }
    }

   useEffect(()=>{
    const setTime= setTimeout(()=>{
      if(success){
        return navigate("/training/authentication/password-reset",{state:email});
      }
    },100)
 return()=>clearTimeout(setTime)
   },[type,navigate])  

 const handleRedirect=()=>{
   if(msg==="Login Successfully!"){
    const setTime=setTimeout(()=>{
      if(profileData?.username || profileData?._id){
       return navigate("/training/dashboard")
      }else{
       return navigate("/training/profile/create")
      }
    },1500)
  
  return ()=>clearTimeout(setTime)
  }
 }
useEffect(()=>{
 handleRedirect()
},[msg,profileData,navigate])

  const handleLogin=async()=>{
    try{
     const login= await axios.post(`${API_URL}/user/login`,{email,password},{withCredentials:true});
     
    setMsg(login.data.msg)
    setType(login.data.type)
    }
    catch(err){
      console.log(err)
    }
  }
  
  return (
    <>
  
  <Helmet>
    <title>Login | DarshanTech Innovations</title>

    <meta
      name="description"
      content="Login to your DarshanTech Innovations account to access courses, dashboard, and learning resources."
    />

    {/* Prevent Google indexing */}
    <meta name="robots" content="noindex, nofollow" />

    {/* Mobile */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/* Security */}
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  </Helmet>

      <Header />
      <div className="bg-white min-h-screen">      <div className="block md:hidden min-h-screen bg-gradient-to-b from-blue-200 to-indigo-200 flex items-center justify-center px-4 ">

        <div className="bg-white w-max max-w-md rounded-2xl shadow-xl p-3">

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="DarshanTech" className="w-16 border rounded-full mb-2" />
            <h1 className="text-2xl font-bold text-blue-600">DarshanTech</h1>
            <p className="text-sm text-gray-500">Innovations</p>
          </div>

          <h2 className="text-xl font-bold text-center mb-4">
            Login to your account
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Email</label>
           <div className="flex border rounded-xl mt-1">
            <input
              type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
              
              placeholder="example@gmail.com"
              className="w-full  p-2 border rounded-l-xl focus:outline-none"
            />
            <span
             className="p-3 border-l cursor-pointer flex items-center"
              ><MdMail/></span>
          </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Password</label>
            <div className="flex border rounded-xl mt-1">
              <input value={password} 
              onChange={(e)=>setPassword(e.target.value)}
                
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

          {/* Options */}
          <div className="flex justify-between items-center text-sm mb-4">
            <label>
              <input type="checkbox" /> Remember
            </label>
            <span onClick={handleForgetPassword} className="text-blue-500 cursor-pointer">Forgot?</span>
          </div>
    <Notification
  message={msg}
  type={type}
  onClose={() => setMsg("")}
/>
          {/* Button */}
          <button onClick={handleLogin} className="w-full py-2 rounded-xl text-white font-bold 
            bg-gradient-to-r from-blue-500 to-indigo-500">
            Login
          </button>

          {/* Register */}
          <p className="text-center text-sm mt-4">
            Don’t have an account?
            <Link
              to="/training/authentication/register"
              className="text-blue-500 ml-1"
            >
              Register
            </Link>
          </p>

          {/* Disclaimer */}
          <p className="text-xs text-center mt-4 text-gray-500">
            By logging in, you agree to our Terms & Conditions and Privacy Policy.
          </p>

        </div>
      </div>

      {/* ================= DESKTOP LOGIN ================= */}
      <div className="hidden md:block">

        {/* Logo Section */}
        <div className="flex justify-center items-center gap-5   ">
          <img
            className="w-20 border rounded-full"
            src={logo}
            alt="Darshan Tech Innovations"
          />
          <div className="flex flex-col items-center text-blue-500">
            <h1 className="text-4xl font-bold text-blue-600">DarshanTech</h1>
            <h2 className="text-2xl font-bold text-blue-300">Innovations</h2>
          </div>
        </div>

        {/* Main Card */}
        <div className="flex flex-row-reverse  border shadow
           rounded-2xl 
          max-w-[1000px] w-full h-[400px] justify-center  mx-auto mt-6 overflow-hidden">

          {/* Right Panel */}
          <div className="w-1/2 bg-cyan-500 
            flex flex-col justify-center items-center gap-4 p-6 relative">

            <h1 className="text-4xl font-semibold text-black">Welcome Back</h1>
            <h2 className="text-3xl font-semibold text-white text-center">
              Sign in to access your account
            </h2>

            <div className="text-center">
              <p className="text-black text-lg">Don’t have an account?</p>
              <Link
                to="/training/authentication/register"
                className="inline-block mt-4 px-6 py-2 rounded-3xl 
                text-white font-bold text-lg 
                bg-gradient-to-r from-blue-500 to-indigo-500
                hover:from-blue-900 hover:to-indigo-400 transition-all"
              >
                Register
              </Link>
            </div>

            <footer className="absolute bottom-6 text-sm text-center px-6">
              By logging in, you agree to our Terms & Conditions and Privacy Policy.
              Please keep your login credentials confidential.
            </footer>
          </div>

          {/* Left Panel */}
          <div className="w-1/2 bg-white flex justify-center flex-col items-center gap-4 p-6">

            {/* Email */}
            <div className="w-full">
              <label className="font-semibold">Registered Email</label>
              <div className="flex border-2 rounded-xl mt-1">
                <input value={email} onChange={(e)=>setEmail(e.target.value)}
                
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full p-2 rounded-l-xl font-semibold focus:outline-none"
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
                <input
                  type={isHide ? "password" : "text"}
                  className="w-full p-2 rounded-l-xl font-semibold focus:outline-none" placeholder="xxxxxxxxxx" value={password} onChange={(e)=>setPassword(e.target.value)}
                />
                <span
                  onClick={() => setHide(!isHide)}
                  className="p-3 border-l cursor-pointer flex items-center"
                >
                  {isHide ? <BiSolidHide /> : <IoEye />}
                </span>
              </div>
            </div>

           

            {/* Options */}
            <div className="flex justify-between w-full font-semibold">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <span  onClick={handleForgetPassword}  className="text-blue-500 cursor-pointer">
                Forgot Password?
              </span>
            </div>
    <Notification
  message={msg}
  type={type}
  onClose={() => setMsg("")}
/>

            {/* Login Button */}
            <button  onClick={handleLogin} className="mt-4 px-10 py-2 rounded-3xl 
              text-white font-bold text-lg 
              bg-gradient-to-r from-blue-500 to-indigo-500
              hover:from-blue-900 hover:to-indigo-400 transition-all">
              Login
            </button>

          </div>
        </div>
        </div>

      </div>
      <LmsFooter/>
    </>
  );
};

export default Login;
