import React, { useEffect, useState } from 'react'
import logo from "../assets/images/darshantech.jpeg"
import { HiMenu } from "react-icons/hi";
import { FaCircleUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const Header = () => {
  const [type,setType]=useState("")
  const navigate=useNavigate()
const [isMenu,setIsMenu]=useState(false)
const handleMenu=()=>{
  if(isMenu){
    setIsMenu(false)
  }else{
setIsMenu(true)
  }
}


useEffect(()=>{

if(type==="success"){
  navigate("/training")
}
},[type,navigate])

const [authData,setAuthData]=useState({})

const handleAuth=async()=>{
  try{
  const login= await axios.get("http://localhost:5000/user/login",{withCredentials:true});
  setAuthData(login.data.data|| {})
  }catch(err){
    console.log(err)
  }
}
useEffect(()=>{
  handleAuth()
},[])


const [profileMenu,setProfileMenu]=useState(false)

const [profileData, setProfileData] = useState({});
 

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
const[logout,setLogout]=useState(false)
const handleLogout=async()=>{
  try{
 const data=await axios.post("http://localhost:5000/user/logout",{},{withCredentials:true});
 setType(data.data.type)
 setLogout(true)
  }catch(err){
    console.log(err)
  }
}
useEffect(()=>{
  const timeout= setTimeout(()=>{
   if(logout){
 return navigate("/training")
   }
  },1500)

  return ()=>{
    clearTimeout(timeout)
  }
},[logout])


return (
  <header className="sticky top-0 z-50 w-full shadow bg-white/40  bg-black backdrop-blur-xl">
  <div className="flex justify-between sd:justify-center lg:justify-center gap-10  sm:gap-60   items-center p-3" >
    <div className="w-100 flex gap-2 lg:gap-5 items-center sd:ml-20">
<img src={logo} alt="darshantech innovations" className="w-12 sm:w-100  border h-12 rounded-xl " />
<div className="flex  flex-col items-center">
<h1 className="text-blue-500  md:text-xl  ms:text-sm font-bold">DarshanTech</h1><span className="text-blue-500 text-sm font-bold" >Innovations</span>
</div>
    </div>
    <nav className="relative hidden sd:flex lg:flex gap-10 justify-center p-2  px-5 rounded-3xl bg-white border">
     <Link  className="font-medium text-sm text-black hover:text-blue-500 transition duration-300 border-animation" to="/training">Home</Link>
   <Link to="/training/courses"  className="font-medium text-sm text-black hover:text-blue-500 transition duration-300   border-animation active:text-blue-500"> Courses</Link>
   
    
   
    <Link  className="font-medium text-sm text-black hover:text-blue-500 transition duration-300 border-animation" to="/training/projects">Projects </Link>
    
    <Link  className="font-medium text-sm text-black hover:text-blue-500 transition duration-300 border-animation" to="/training/compiler">Compilers</Link>
    <Link  className="font-medium text-sm text-black hover:text-blue-500 transition duration-300 border-animation" to="/about">About Us</Link>
    
    <Link  className="font-medium text-sm text-black hover:text-blue-500 transition duration-300 border-animation" to="/contactUs">Contact Us</Link>
    
   
    </nav>

    <div className="flex  gap-5 sd:hidden items-center">
      <p  onClick={handleMenu}  className="text-black  lg:hidden font-bold text-3xl transition duration-900">{!isMenu?< HiMenu/> :<IoClose />}</p>
       
      {  authData.username ?
    <div onClick={!profileMenu?()=>setProfileMenu(true):()=>setProfileMenu(false)} className="flex items-center gap-2 bg-white/20 px-2 py-2 rounded-full text-sm   border bg-white lg:text-[14px]">
  <div className="text-[16px] lg:text-[25px] text-blue-600">
    <FaCircleUser />
  </div>
  <span className="truncate max-w-[80px] text-black  font-medium">
    {String(authData.username).substring(0,10)}
  </span>
</div>
 : 
 <Link to="/training/authentication/login"><button className="p-2 pb-3 pl-5 pr-5  rounded-2xl text-bold text-white bg-blue-700 hover:bg-blue-600  transition duration-300 ">Login</button></Link> 
}
   
    </div>
  </div>

  {profileMenu &&
  <div className='p-5 bg-white absolute right-[10px]  md:right-[100px]  rounded choose-card   overflow-hidden flex flex-col gap-5'>
  <Link to={profileData.username?"/training/profile":"/training/profile/create"}> <div className="flex  items-center gap-3 font-semibold hover:text-blue-500 transition-all duration-300 cursor-pointer">
    <p><FaCircleUser/></p>
    <p>Profile</p>
   </div> </Link>

   <div className="flex justify-center items-center gap-3 font-semibold hover:text-blue-500 transition-all duration-300 cursor-pointer">
    <p><MdOutlineDashboardCustomize/></p>
    <p>Dashboard</p>
   </div>

   <div onClick={handleLogout} className="flex   items-center gap-3 font-semibold hover:text-blue-500 transition-all duration-300 cursor-pointer text-red-500">
    <p><AiOutlineLogout /></p>
    <p >Logout</p>
   </div>
   </div>
}
{isMenu && 
      <div className="absolute top-15 w-screen">
    
    <nav className="relative flex flex-col items-center shadow bg-white text-black backdrop-blur-xl lg:hidden gap-5 justify-center p-2 pb-3 px-5 z-40">

    <Link to="/training" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation " >Home</Link>
    <Link to="/training/courses" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation " >Courses</Link>
    <Link to="/training/projects" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation " >Projects</Link>
    <Link to="/training/compiler" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation " >Compilers</Link>
    <Link to="/about" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation " >About Us</Link>
    <Link to="/contactUs" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation " >Contact US</Link>
    <Link to="/training/profile" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation " >Profile</Link>
    <Link to="/training/dashboard" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation " >DashBoard</Link>

  
    </nav>
  </div>
  }

  </header>

)
}

export default Header
