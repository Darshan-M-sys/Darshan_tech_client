import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBars, FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const CourseContent = ({ id }) => {
   const API_URL="https://darshantechinnvations.shop";
  const [course, setCourse] = useState({});
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [completedLessons, setCompletedLessons] = useState({}); // object for easy lookup

  /* ---------------- FETCH COMPLETED LESSONS ---------------- */
  const fetchCompletedLessons = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/course/view/completed/lessons/${id}`,
        { withCredentials: true }
      );
      const completed = {};
      (res.data.data || []).forEach((lessonId) => {
        completed[lessonId] = true;
      });
      setCompletedLessons(completed);
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- FETCH COURSE ---------------- */
  const fetchCourse = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/course/view/${id}`,
        { withCredentials: true }
      );
      setCourse(res.data.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- FETCH LESSONS ---------------- */
  const fetchLessons = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/course/view/lesson/${id}`,
        { withCredentials: true }
      );
      setLessons(res.data.data || []);
      setActiveLesson(res.data.data?.[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchLessons();
    fetchCompletedLessons();
  }, [id]);

  /* ---------------- MARK LESSON COMPLETED ---------------- */
  const markLessonCompleted = async () => {
    if (!activeLesson) return;
    try {
      await axios.post(
        `${API_URL}/course/view/lessons/${id}/completed/${activeLesson._id}`,
        {},
        { withCredentials: true }
      );

      // ✅ Update UI instantly
      setCompletedLessons((prev) => ({
        ...prev,
        [activeLesson._id]: true,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="min-h-screen  bg-gray-100 w-full ">
          {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white shadow lg:hidden">
        <button onClick={() => setOpenSidebar(true)}>
          <FaBars className="text-xl" />
        </button>
        <h1 className="text-lg font-bold truncate">{course.title}</h1>
      </div>

      {/* Desktop Title */}
      <h1 className="hidden lg:block text-3xl font-bold text-center py-6">
        {course.title}
      </h1>

      <div className="flex max-w-7xl lg:mx-auto gap-4 lg:px-4">
        {/* Sidebar */}
        <div
          className={`fixed lg:static top-0 left-0 z-50 w-[300px] lg:w-[350px]
          h-full lg:h-[80vh] bg-white shadow transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <h2 className="font-semibold">Course Content</h2>
            <IoClose
              className="text-2xl cursor-pointer"
              onClick={() => setOpenSidebar(false)}
            />
          </div>

          <div className="overflow-y-auto h-full">
            {lessons.map((item, index) => {
              const isCompleted = completedLessons[item._id];

              return (
                <div
                  key={item._id}
                  onClick={() => {
                    setActiveLesson(item);
                    setOpenSidebar(false);
                  }}
                  className={`lg:p-4 cursor-pointer border-b hover:bg-indigo-50
                  ${activeLesson?._id === item._id ? "bg-indigo-100 font-semibold" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Lesson {index + 1}
                    </p>
                    {isCompleted && (
                      <FaCheckCircle className="text-green-500 text-sm" />
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <p>{item.lessonTitle}</p>
                    <span className="text-xs text-gray-500">
                      ⏱ {item.lessonDuration || "—"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lesson View */}
        <div className="flex-1 bg-white   lg:rounded-lg shadow p-6 h-[80vh] overflow-y-auto">
          {activeLesson ? (
            <>
              <div className="flex  justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{activeLesson.lessonTitle}</h2>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                  ⏱ {activeLesson.lessonDuration || "0 min"}
                </span>
              </div>

              {activeLesson.lessonUrl && (
                <div className="mb-6 aspect-video">
                  <iframe
                    src={activeLesson.lessonUrl}
                    className="w-full h-full  rounded"
                    allowFullScreen
                  />
                </div>
              )}

              <div
                className="prose max-w-none mb-6 text-gray-700"
                dangerouslySetInnerHTML={{ __html: activeLesson.lessonDescription }}
              />

              <button
                onClick={markLessonCompleted}
                disabled={completedLessons[activeLesson._id]}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white
                ${
                  completedLessons[activeLesson._id]
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                <FaCheckCircle />
                {completedLessons[activeLesson._id] ? "Completed" : "Mark as Completed"}
              </button>
            </>
          ) : (
            <p className="text-gray-500">Select a lesson to start learning.</p>
          )}
        </div>
      </div>
      </div>
  );
};

export default CourseContent;
