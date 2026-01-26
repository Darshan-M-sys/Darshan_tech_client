import React, { useState } from 'react'
import logo from "../assets/images/darshantech.jpeg"

import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
const Header = () => {
const [isMenu,setIsMenu]=useState(false)


const handleMenu=()=>{
  if(isMenu){
    setIsMenu(false)
  }else{
setIsMenu(true)
  }
}

return (
  <header className="sticky top-0 z-50 w-full shadow bg-white/5 backdrop-blur-xl">
  <div className="flex justify-between sd:justify-center lg:justify-center gap-10  sm:gap-60   items-center p-3" >
    <div className="w-100 flex gap-2 lg:gap-5 items-center sd:ml-20">
<img src={logo} alt="darshantech innovations" className="w-12 sm:w-100  h-12 rounded-xl " />
<div className="flex  flex-col items-center">
<h1 className="text-blue-500  md:text-xl  ms:text-sm font-bold">DarshanTech</h1><span className="text-blue-500 text-sm font-bold" >Innovations</span>
</div>
    </div>
    <nav className="relative border bg-white hidden sd:flex lg:flex gap-10 justify-center p-2 pb-3 px-5 rounded-3xl bg-white/10">
    <a className="font-semibold text-sm  text-black font-medium hover:text-blue-500 transition duration-300 border-animation" href="/">Home</a>
    <Link to="/service" className="font-semibold text-sm  text-black font-medium hover:text-blue-500 transition duration-300 border-animation" >Service
  </Link>
    <Link to="/about" className="font-semibold text-sm  text-black font-medium hover:text-blue-500 transition duration-300 border-animation" >
   AboutUs </Link>
    <Link to="/training" className="font-semibold text-sm  text-black font-medium hover:text-blue-500 transition duration-300 border-animation" >
   Training </Link>
    <Link to="/solutions" className="font-semibold text-sm  text-black font-medium hover:text-blue-500 transition duration-300 border-animation" >
   Solutions </Link>
   <Link to="/contactUs" className="font-semibold text-sm  text-black font-medium hover:text-blue-500 transition duration-300 border-animation">
   ContactUs </Link>
    </nav>
    <div className="flex  gap-5 sd:hidden items-center">
      <p  onClick={handleMenu}  className="text-gray-900  lg:hidden font-bold text-3xl transition duration-900">{!isMenu?< HiMenu/> :<IoClose />}</p>
         <Link to="/training" className="p-2  lg:pl-5  lg:pr-5  text-sm  lg:flex  rounded-3xl font-medium text-white bg-blue-700 hover:bg-blue-600  transition duration-300"> Get Started</Link>
      
    </div>
       
  
  
  </div>   
{isMenu && 
      <div className="absolute top-15 w-screen">
    
    <nav className="relative flex flex-col items-center shadow bg-white text-black backdrop-blur-xl lg:hidden gap-5 justify-center p-2 pb-3 px-5 z-40">

   
    <Link  to="/" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation " >Home</Link>
    <Link  to="/service" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation " >Service</Link>
    <Link to="/about" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation ">About Us</Link>
    <Link to="/training" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation ">Training</Link>
        <Link to="/solutions" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation ">Solutions</Link>
      
    <Link to="/contactUs" className="font-semibold text-sm text-black hover:text-blue-500 transition duration-300 border-animation ">Contact Us</Link>
    
 </nav>
  </div>
  
  }
  </header>
)
}

export default Header
