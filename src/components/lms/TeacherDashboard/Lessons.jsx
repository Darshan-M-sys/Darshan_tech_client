import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const Lessons = ({ id }) => {
  const [lessonList, setLessonList] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [formShow, setFormShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [formData, setFormData] = useState({
    lessonTitle: "",
    lessonUrl: "",
    lessonDuration: "",
    lessonDescription: "",
  });

  /* ================= FETCH ALL LESSONS ================= */
  const fetchLessons = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lesson/teacher/${id}`,
        { withCredentials: true }
      );
      setLessonList(res.data.data || []);
      if (res.data.data?.length) {
        setSelectedLessonId(res.data.data[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FETCH SINGLE LESSON ================= */
  const fetchSingleLesson = async (lessonId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/lesson/teacher/lesson/${lessonId}`,
        { withCredentials: true }
      );
      setSelectedLesson(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) fetchLessons();
  }, [id]);

  useEffect(() => {
    if (selectedLessonId) fetchSingleLesson(selectedLessonId);
  }, [selectedLessonId,isUpdate]);

  /* ================= CREATE LESSON ================= */
  const handleCreate = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/lesson/create/${id}`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        fetchLessons();
        resetForm();
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= UPDATE LESSON ================= */
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/lesson/update/${selectedLessonId}`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        fetchLessons();
        resetForm();
        setSelectedLessonId(res.data.data._id)
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= DELETE LESSON ================= */
  const handleDelete = async (lessonId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/lesson/delete/${lessonId}`,
        { withCredentials: true }
      );
      fetchLessons();
      setSelectedLesson(null);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FORM HELPERS ================= */
  const resetForm = () => {
    setFormShow(false);
    setIsUpdate(false);
    setFormData({
      lessonTitle: "",
      lessonUrl: "",
      lessonDuration: "",
      lessonDescription: "",
      lessonPercentage:""
    });
  };

  const openUpdateForm = (lesson) => {
    setIsUpdate(true);
    setFormShow(true);
    setSelectedLessonId(lesson._id);
    setFormData({
      lessonTitle: lesson.lessonTitle,
      lessonUrl: lesson.lessonUrl,
      lessonDuration: lesson.lessonDuration,
      lessonDescription: lesson.lessonDescription,
      lessonPercentage:lesson.lessonPercentage,
    });
  };

  /* ================= UI ================= */
  return (
    <div className="relative flex">
      {/* LEFT SIDEBAR */}
      <div className="w-[300px] h-screen border-r p-2">
        <button
          onClick={() => {
            resetForm();
            setFormShow(true);
          }}
          className="w-full mb-3 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <FaPlus /> Create Lesson
        </button>

        {lessonList.map((lesson) => (
          <div
            key={lesson._id}
            className={`p-2 border-b cursor-pointer flex justify-between items-center ${
              selectedLessonId === lesson._id ? "bg-blue-100" : ""
            }`}
            onClick={() => setSelectedLessonId(lesson._id)}
          >
            <span className="font-semibold text-sm">
              {lesson.lessonTitle.slice(0, 30)}
            </span>
            <div className="flex gap-2">
              <FaEdit
                className="text-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  openUpdateForm(lesson);
                }}
              />
              <MdDelete
                className="text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(lesson._id);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-5">
        {selectedLesson && !formShow && (
          <div className="bg-white rounded-xl shadow">
            <div className="aspect-video bg-black">
              <iframe
                src={selectedLesson.lessonUrl}
                className="w-full h-full"
                allowFullScreen
                title="lesson-video"
              />
            </div>
            <div className="p-5">
              <h1 className="text-2xl font-bold">
                {selectedLesson.lessonTitle}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Duration: {selectedLesson.lessonDuration}
              </p>
                 <div
              className="text-gray-700 text-sm mt-4"
              dangerouslySetInnerHTML={{
                __html: selectedLesson.lessonDescription
              }}
            />

            </div>
          </div>
        )}
      </div>

      {/* FORM MODAL */}
      {formShow && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl relative">
            <IoClose
              className="absolute right-4 top-4 text-2xl cursor-pointer"
              onClick={resetForm}
            />

            {["lessonTitle", "lessonUrl", "lessonDuration",].map((field) => (
              <input
                key={field}
                placeholder={field.replace("lesson", "")}
                className="w-full border p-2 rounded mb-3"
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
              />
            ))}
            <input type="number" min={1} max={20} key={"lessonPercentage"}
                placeholder={"2"}
                className="w-full border p-2 rounded mb-3"
              value={formData.lessonPercentage}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  lessonPercentage: e.target.value,
                })
              }
                 />


            <textarea
              className="w-full border p-2 rounded mb-4"
              rows="4"
              placeholder="Lesson Description"
              value={formData.lessonDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lessonDescription: e.target.value,
                })
              }
            />

            <button
              onClick={isUpdate ? handleUpdate : handleCreate}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg"
            >
              {isUpdate ? "Update Lesson" : "Create Lesson"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons;
