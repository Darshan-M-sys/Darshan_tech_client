import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'


const Enrollments = () => {
  const [enrollments,setEnrollments]=useState([])
  const handleEnrollment= async()=>{
    try {
      const res= await axios.get("http://localhost:5000/admin/enrollment",{withCredentials:true})
      setEnrollments(res.data.data|| []);
    } catch (error) {
      console.log(error)
    }
  }
useEffect(()=>{
handleEnrollment()
},[])
  const handleDeleteEnrollment= async(enrollmentId)=>{
    try {
      if(!window.confirm("Are You Sure to Delete")) return 
       await axios.delete(`http://localhost:5000/admin/enrollment/delete/${enrollmentId}`,{withCredentials:true});
       alert("Deleted")
       handleEnrollment()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enrollments.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 relative"
        >
          {/* Course Title */}
          <h2 className="text-lg font-semibold text-indigo-600 mb-2">
            {item.courseId?.title}
          </h2>

          {/* Student Info */}
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium text-gray-700">Student:</span>{" "}
              {item.studentId?.username}
            </p>
            <p>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {item.studentId?.email}
            </p>
          </div>

          {/* Delete Button */}
          <button
        onClick={()=>handleDeleteEnrollment(item._id)} 
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
            title="Remove Enrollment"
          >
            <MdDelete size={22} />
          </button>
        </div>
      ))}
    </div>


  )
}

export default Enrollments
