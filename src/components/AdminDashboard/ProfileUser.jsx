import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaSearch, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

  
const ProfileUser = () => {
   const API_URL="https://darshantechinnvations.shop";
  const [profile,setProfile]=useState({})
  const [search,setSearch]=useState("")
  const [show,setShow]=useState(false)
  const [students,setStudents]=useState([])
  const[teachers,setTeachers]=useState([])
  const [is,setIS]=useState("student")
const handleUsers=async()=>{
 const user= await axios.get(`${API_URL}/admin/users/profiles`,{withCredentials:true});
try {
   setStudents(user.data.data.filter((i)=>i.role==="student")|| [])
 setTeachers(user.data.data.filter((i)=>i.role==="teacher"))
} catch (error) {
  console.log(error)
}
}

const handleProfile=async(id)=>{
   const user= await axios.get(`${API_URL}/admin/users/profiles/${id}`,{withCredentials:true});
try {
setProfile(user.data.data || {})
if(user){
  setShow(true)
}
} catch (error) {
  console.log(error)
}
}
const handleDelete=async(id)=>{
  try{
  const deleteProfile= await axios.delete(`${API_URL}/admin/users/profiles/${id}`,{withCredentials:true});
  if(deleteProfile.data.msg==="Deleted SuccessFully"){
    window.location.reload()
  }
}catch(err){
  console.log(err)
}
}


useEffect(()=>{
handleProfile()
},[])

useEffect(()=>{
handleUsers()
},[])

  return (
  
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">

      {/* Card */}
      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Search */}
          <div className="relative w-full md:w-[300px]">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text" onChange={(e)=>setSearch(e.target.value)} value={search}
              placeholder="Search user..."
              className="pl-10 pr-3 py-2 w-full rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
 
          {/* Tabs */}
          <div className="flex gap-4">
            <button onClick={()=>setIS("student")} className={`flex items-center gap-2 px-5 py-2 rounded-xl ${is==="student"?"bg-blue-500 text-white":"bg-gray-900 text-black" } text-white shadow`}>
              <FaUserGraduate /> Students
            </button>

            <button onClick={()=>setIS("teacher")} className={`flex items-center gap-2 px-5 py-2 rounded-xl ${is==="teacher"?"bg-blue-500 text-white":"bg-gray-900 text-white"} hover:bg-gray-300`}>
              <FaChalkboardTeacher /> Teachers
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-5 mt-8 px-4 py-2 text-gray-600 font-semibold border-b">
          <p>Image</p>
          <p>Name</p>
          <p>Email</p>
          <p className="ml-10">Role</p>
          <p className="text-center">Action</p>
        </div>


        {/* User List */}
        <div className="max-h-[450px] overflow-y-auto mt-2 space-y-3">

          {(is==="student"?students:teachers).filter((user)=>{
            return(
            user.username.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) ||  user.role.toLowerCase().includes(search.toLowerCase())
            )
          }).map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-5 items-center px-4 py-3 rounded-xl bg-white shadow hover:shadow-md transition"
            ><img   onClick={()=>handleProfile(item._id)} className="w-[50px] h-[50px]  rounded-full" src={item.profile_Imag} alt={item.username} />
              <p   onClick={()=>handleProfile(item._id)} className="font-semibold">{item.username}</p>
              <p   onClick={()=>handleProfile(item._id)} className="text-gray-600">{item.email}</p>
              <span   onClick={()=>handleProfile(item._id)} className="text-blue-500 font-semibold ml-10">{item.role}</span>
               
              <button onClick={()=>handleDelete(item._id)} className="flex justify-center ">
                <MdDelete className="text-red-500 text-xl hover:scale-110 transition" />

              </button>
              {show &&
              <div className="fixed top-[1px] right-[1px] w-full min-h-[100vh] backdrop-blur-[10px] bg-white/30">
                <div className="fixed top-[10px] right-[300px] ">
  <button className="absolute right-2 text-lg" onClick={()=>setShow(false)}>X</button>
    <div className="bg-white shadow shadow-2xl py-10 p-5 flex flex-col justify-center">
   <div className="text-center flex justify-center  flex-col">
    <img className="w-[100px] h-[100px] rounded-full bg-yellow-300 text-center" src={profile.profile_Imag} alt="profile" />
    <p className="font-bold text-xl">{profile.username}</p>
    <p>{profile.email}</p>
    <p className="text-sm font-['arial'] bg-yellow-300 ">{profile.role}</p>
    <p className="font-semibold"> <span className="text-blue-500">SkillS:</span>{profile.skills}</p>
  
    
    </div>
              
    </div>
    </div>
    </div>
}
            </div>

          ))}

        </div>
      </div>
    </div> 
  )} 


export default ProfileUser
