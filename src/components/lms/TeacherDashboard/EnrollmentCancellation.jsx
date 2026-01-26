import axios from "axios";
import React from "react";
import { MdDelete } from "react-icons/md";

const EnrollmentCancellation = ({ students = [] }) => {
 const API_URL="https://darshantechinnvations.shop";

  if (!students.length) {
    return (
      <p className="text-gray-500 text-sm">
        No enrollments found
      </p>
    );
  }


  const handleDeleteEnrollment= async(enrollmentId)=>{
try {
  if(!window.confirm("Are you sure to cancel this enrollment?")) return;
   await axios.delete(`${API_URL}/teacher/dashboard/enrollment/delete/${enrollmentId}`,{withCredentials:true});
   alert("!Enrollment Is Canceled")
} catch (error) {
  console.log(error)
}

  }
  return (
    <div className="space-y-3">
      {students.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 border rounded-md"
        >
          <div>
            <h1 className="font-medium">
              {item.courseId?.title || "No course"}
            </h1>
        <p className="text-xl font-medium text-gray-600">
              {item.studentId?.username || "No email"}
            </p>
            <p className="text-sm text-gray-600">
              {item.studentId?.email || "No email"}
            </p>
          </div>

          <MdDelete
          onClick={()=>handleDeleteEnrollment(item._id)}
            className="text-red-600 cursor-pointer hover:scale-110 transition"
            title="Cancel Enrollment"
          />
        </div>
      ))}
    </div>
  );
};

export default EnrollmentCancellation;
