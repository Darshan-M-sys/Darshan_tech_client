import axios from "axios";
import { useEffect, useState } from "react";

const MyStudents = ({ courses }) => {
  const [courseList, setCourseList] = useState([]);

  // 1️⃣ Sync props → state
  useEffect(() => {
    if (courses && courses.length > 0) {
      setCourseList(courses);
    }
  }, [courses]);

  // 2️⃣ Fetch students AFTER courses are set
  useEffect(() => {
    if (courseList.length === 0) return;

    const fetchStudents = async () => {
      try {
        const updated = await Promise.all(
          courseList.map(async (course) => {
            const res = await axios.get(
              `http://localhost:5000/teacher/dashboard/courses/students/${course._id}`,
              { withCredentials: true }
            );

            const students = res.data?.data || [];

            return {
              ...course,
              students,
              studentsCount: students.length,
            };
          })
        );

        setCourseList(updated);
      } catch (err) {
        console.error("STUDENT FETCH ERROR:", err);
      }
    };

    fetchStudents();
  }, [courseList.length]); // ← runs ONCE after courses arrive


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courseList.map((course) => (
        <div key={course._id} className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold">{course.title}</h2>

          <p className="text-sm text-gray-600">
            👨‍🎓 {course.studentsCount || 0} Students
          </p>

          {/* STUDENTS */}
          {course.students?.length > 0 ? (
            <div className="mt-3 space-y-1">
              {course.students.map((s, i) => (
                <div key={i} className="text-sm">
                  {s.studentId?.username} —{" "}  
                  <span className="text-gray-500">
                    {s.studentId?.email}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 mt-2">
              No students enrolled
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyStudents;
