import axios from "axios";
import { useEffect, useState } from "react";

const MyCourses = ({ courses }) => {

 const [course,setCourse]=useState(courses)
      const API_URL="https://darshantechinnvations.shop";
const handleMyCourseStudent = async () => {
  try {
    const updatedCourses = await Promise.all(
      course.map(async (item) => {
        const res = await axios.get(
          `${API_URL}/teacher/dashboard/courses/students/${item._id}`,
          { withCredentials: true }
      
        );

        return {
          ...item,
          studentsCount: res.data.data?.length
        };
      })
    );

    setCourse(updatedCourses); 

  } catch (error) {
    console.error(error);
  }
};

  useEffect(()=>{
handleMyCourseStudent()
  },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {course.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
        >
          {/* Thumbnail */}
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-40 w-full object-cover"
          />
          {/* Content */}
          <div className="p-5 space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">
              {course.title}
            
            </h2>

            {/* Short Description (TEXT ONLY) */}
            <p className="text-sm text-gray-600 line-clamp-2">
              {course.shortDescription}
            </p>

            {/* Full Description (HTML RENDER) */}
            <div
              className="text-sm text-gray-700 prose prose-sm max-w-none line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: course.description,
              }}
            />

            {/* Footer */}
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="text-xs text-gray-500">
                👨‍🎓 {course.studentsCount} Students
              </span>

              <button className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Manage
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
