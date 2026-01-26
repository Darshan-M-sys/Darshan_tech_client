import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Lessons from "./Lessons";
import Chat from "./Chat";
import Notes from "./Notes";
import Interview from "./Interview";
import TeacherQuiz from "./TeacherQuiz";
import { MdDelete } from "react-icons/md";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [menu, setMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Course");
  const [formShow, setShowForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setCourseId] = useState("");

  const [courseDetails, setCourseDetails] = useState({
    title: "",
    shortDescription: "",
    description: "",
    totalDuration: "",
    price: "",
    category: "",
    thumbnail: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  /* ================= FETCH COURSES ================= */
  const handleCourseData = async () => {
    const res = await axios.get(
      "http://localhost:5000/course/teacher/courses",
      { withCredentials: true }
    );
    setCourses(res.data.data || []);
  };

  /* ================= FETCH SINGLE COURSE ================= */
  const handleSingleCourse = async (courseId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/course/${courseId}`
      );
      setCourseDetails(res.data.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCourseData();
  }, []);

  /* ================= IMAGE HANDLER ================= */
  const handleImage = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  /* ================= CREATE COURSE ================= */
  const handleCourseCreation = async () => {
    try {
      const formData = new FormData();

      Object.keys(courseDetails).forEach((key) => {
        if (key !== "thumbnail") {
          formData.append(key, courseDetails[key]);
        }
      });

      if (file) formData.append("image", file);

      const res = await axios.post(
        "http://localhost:5000/course/create",
        formData,
        { withCredentials: true }
      );

      alert(res.data.msg);
      handleCourseData();
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const formData = new FormData();

      Object.keys(courseDetails).forEach((key) => {
        if (key !== "thumbnail") {
          formData.append(key, courseDetails[key]);
        }
      });

      if (file) formData.append("image", file);

      const res = await axios.put(
        `http://localhost:5000/course/update/${id}`,
        formData,
        { withCredentials: true }
      );

      alert(res.data.msg);
      handleCourseData();
      setShowForm(false);
      setMenu(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (courseId) => {
    setMenu(true);
    setCourseId(courseId);
    handleSingleCourse(courseId);
  };

  const handleCreateBtn = () => {
    setCourseDetails({
      title: "",
      shortDescription: "",
      description: "",
      totalDuration: "",
      price: "",
      category: "",
      thumbnail: "",
    });
    setFile(null);
    setPreview(null);
    setMenu(false)
    setUpdate(false);
    setShowForm(true);
  };


   const handleCourseDelete=async()=>{
    try {
      if(!window.confirm("Are You Sure to delete this item")) return;
      await axios.delete(`http://localhost:5000/course/delete/${id}`,{withCredentials:true})
      window.location.reload()
    } catch (error) {
      console.log(error)
    }}


  return (
    <div className="mt-5">
      {/* CREATE BUTTON */}
      <br/>
      <button
        onClick={handleCreateBtn}
        className="p-2  mt-5 flex bg-blue-500 text-white gap-2 rounded-lg font-semibold m-10"
      >
        <FaPlus /> Create Course
      </button>

      {/* COURSE LIST */}
      <div className="flex gap-2 ml-2">
        {courses.map((item, index) => (
          <div
            key={item._id}
            onClick={() => handleClick(item._id)}
            className="border p-2 rounded cursor-pointer"
          >
            Course {index + 1}
          </div>
        ))}
      </div>

      {/* COURSE DETAILS */}

      {menu && (
        <>
          <div className="flex justify-center gap-20 font-medium border-b mt-6">
            {["Course", "Lessons", "Chat", "Quiz", "Notes", "Interview"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab ? "text-blue-500" : "text-black"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {activeTab === "Course" && (
            <div className="flex justify-center gap-6 py-10">
              <div className="flex gap-3">
                <button  
                  onClick={() => {
                    setUpdate(true);
                    setShowForm(true);
                    setMenu(false);
                  }}
                  className="flex gap-2 h-[40px] items-center  justify-center w-[100px] p-1 bg-blue-500 text-white rounded"
                >
                  <FaEdit /> Edit
                </button>
                <button onClick={handleCourseDelete} className="flex gap-2 h-[40px] items-center  justify-center w-[100px] p-1 bg-blue-500 text-white rounded">
                  <MdDelete /> Delete
                </button>
              </div>

              <div className="max-w-[450px] w-full bg-white shadow rounded-xl">
                <img
                  src={courseDetails.thumbnail}
                  className="w-full h-[220px] object-cover"
                  alt=""
                />
                <div className="p-5 space-y-2">
                  <h2 className="text-xl font-semibold">
                    {courseDetails.title}
                  </h2>
                  <p className="text-gray-600">
                    {courseDetails.shortDescription}
                  </p>
                  <div
              className="text-gray-700 text-sm mt-4"
              dangerouslySetInnerHTML={{
                __html: courseDetails.description
              }}
            />

                  <div className="flex justify-between text-sm mt-3">
                    <span>{courseDetails.category}</span>
                    <span>⏱ {courseDetails.totalDuration}</span>
                  </div>
                  <p className="font-bold text-green-600 mt-2">
                    ₹ {courseDetails.price}
                  </p>
                </div>
              </div>
            </div>
          

          )}
           {activeTab==="Lessons" && 
           (
            <Lessons id={id}/>
           )}
               {activeTab==="Chat" && 
           (
            <Chat id={id}/>
           )}

  {activeTab==="Notes" && 
           (
            <Notes id={id}/>
           )}
            {activeTab==="Interview" && 
           (
            <Interview id={id}/>
           )}
            {activeTab==="Quiz" && 
           (
            <TeacherQuiz courseId={id}/>
           )}

        </>
      )}

      {/* CREATE / UPDATE FORM */}
      {formShow && (
        <div className="max-w-[500px] m-auto relative border p-4 rounded-xl">
          <button
            onClick={() => setShowForm(false)}
            className="absolute right-2 top-2 text-xl"
          >
            <IoClose />
          </button>

          {[
            "title",
            "shortDescription",
            "description",
            "price",
            "totalDuration",
          ].map((field) => (
            <input
              key={field}
              value={courseDetails[field] || ""}
              onChange={(e) =>
                setCourseDetails({
                  ...courseDetails,
                  [field]: e.target.value,
                })
              }
              placeholder={field}
              className="w-full p-2 border rounded mb-2"
            />
          ))}

          <select
            value={courseDetails.category || ""}
            onChange={(e) =>
              setCourseDetails({
                ...courseDetails,
                category: e.target.value,
              })
            }
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Python Programming">Python Programming</option>
            <option value="AI / ML">AI / ML</option>
          </select>

          <input
            type="file"
            ref={fileRef}
            onChange={handleImage}
            className="mb-3"
          />

          {(preview || courseDetails.thumbnail) && (
            <img
              src={preview || courseDetails.thumbnail}
              className="w-full h-32 object-cover rounded mb-3"
              alt=""
            />
          )}

          <button
            onClick={update ? handleUpdateCourse : handleCourseCreation}
            className="w-full bg-blue-500 text-white py-2 rounded font-semibold"
          >
            {update ? "Update Course" : "Publish Course"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Courses;
