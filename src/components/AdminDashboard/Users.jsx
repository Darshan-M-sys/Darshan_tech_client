import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaSearch, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const Users = () => {
   const API_URL="https://darshantechinnvations.shop";
  const [search,setSearch]=useState("")
  const [students,setStudents]=useState([])
  const[teachers,setTeachers]=useState([])
  const [is,setIS]=useState("student")
const handleUsers=async()=>{
 const user= await axios.get(`${API_URL}/admin/users`,{withCredentials:true});
try {
   setStudents(user.data.data.filter((i)=>i.role==="student")|| [])
 setTeachers(user.data.data.filter((i)=>i.role==="teacher"))
} catch (error) {
  console.log(error)
}
}


useEffect(()=>{
handleUsers()
},[])


const handleDelete=async(id)=>{
  try {
    if(!window.confirm("Are you sure to delete this user?")) return;
    const deleted= await axios.delete(`${API_URL}/admin/users/${id}`,{withCredentials:true});
    if(deleted.data.success){
    handleUsers()
    }
  } catch (err) {
    console.log(err)
  }
}
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
        <div className="grid grid-cols-4 mt-8 px-4 py-2 text-gray-600 font-semibold border-b">
          <p>Name</p>
          <p>Email</p>
          <p>Role</p>
          <p className="text-center">Action</p>
        </div>

        {/* User List */}
        <div className="max-h-[350px] overflow-y-auto mt-2 space-y-3 ">

          {(is==="student"?students:teachers).filter((user)=>{
            return(
            user.username.toLowerCase().includes(search.toLowerCase()) ||     user.email.toLowerCase().includes(search.toLowerCase()) ||  user.role.toLowerCase().includes(search.toLowerCase())
            )
          }).map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-4 items-center px-4 py-3 rounded-xl bg-white shadow hover:shadow-md transition"
            >
              <p className="font-semibold">{item.username}</p>
              <p className="text-gray-600">{item.email}</p>
              <span className="text-blue-500 font-semibold">{item.role}</span>

              <button onClick={()=>handleDelete(item._id)} className="flex justify-center ">
                <MdDelete className="text-red-500 text-xl hover:scale-110 transition" />
              </button>
            </div>
          ))}

        </div>
      </div>
    </div> 
  )} 


export default Users
