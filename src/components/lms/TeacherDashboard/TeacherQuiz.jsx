import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherQuizQuestions from "./TeacherQuizQuestions";

const TeacherQuiz = ({ courseId }) => {
  /* ================= STATE ================= */
  const [quizzes, setQuizzes] = useState([]);
  const [quizId,setQuizId]=useState("")
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [editQuizId, setEditQuizId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    timeLimit: "",
    passingMarks: ""
  });

  /* ================= FETCH QUIZZES ================= */
  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/quiz/${courseId}`,
        { withCredentials: true }
      );
      setQuizzes(res.data.data || []);
    } catch (err) {
      console.error(err);
      setQuizzes([]);
    }
  };

  useEffect(() => {
    if (courseId) fetchQuizzes();
  }, [courseId]);

  /* ================= FORM HANDLING ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      timeLimit: "",
      passingMarks: ""
    });
    setEditQuizId(null);
  };

  /* ================= CREATE QUIZ ================= */
  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.title || !form.timeLimit || !form.passingMarks) {
      setMsg("❌ Required fields missing");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:5000/quiz/create/${courseId}`,
        form,
        { withCredentials: true }
      );

      setMsg("✅ Quiz created successfully");
      resetForm();
      fetchQuizzes();
    } catch (err) {
      setMsg("❌ Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD QUIZ FOR UPDATE ================= */
  const handleEdit = async (quizId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/quiz/single/${quizId}`,
        { withCredentials: true }
      );

      setForm({
        title: res.data.data.title,
        description: res.data.data.description || "",
        timeLimit: res.data.data.timeLimit,
        passingMarks: res.data.data.passingMarks
      });

      setEditQuizId(quizId);
      setMsg("✏️ Edit mode enabled");
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= UPDATE QUIZ ================= */
  const handleUpdateQuiz = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:5000/quiz/update/${editQuizId}`,
        form,
        { withCredentials: true }
      );

      setMsg("✅ Quiz updated successfully");
      resetForm();
      fetchQuizzes();
    } catch (error) {
      setMsg("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteQuiz=async( deleteId)=>{
    try {
      if(!window.confirm("Are you sure to delete this")) return;
       await axios.delete(`http://localhost:5000/quiz/delete/${deleteId}`,{withCredentials:true})
       fetchQuizzes()
    } catch (error) {
      console.log(error)
    }
  }
  /* ================= UI ================= */
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Teacher Quiz Panel</h1>

      {/* CREATE / UPDATE QUIZ */}
      <form
        onSubmit={editQuizId ? handleUpdateQuiz : handleCreateQuiz}
        className="space-y-3 mb-6"
      >
        <input
          name="title"
          placeholder="Quiz Title"
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="timeLimit"
          placeholder="Time Limit (minutes)"
          className="w-full border p-2 rounded"
          value={form.timeLimit}
          onChange={handleChange}
        />

        <input
          type="number"
          name="passingMarks"
          placeholder="Passing Marks"
          className="w-full border p-2 rounded"
          value={form.passingMarks}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {loading
            ? "Saving..."
            : editQuizId
            ? "Update Quiz"
            : "Create Quiz"}
        </button>

        {editQuizId && (
          <button
            type="button"
            onClick={resetForm}
            className="w-full bg-gray-300 py-2 rounded"
          >
            Cancel Edit
          </button>
        )}

        {msg && <p className="text-sm mt-2">{msg}</p>}
      </form>

      {/* QUIZ LIST */}
      <h2 className="text-lg font-semibold mb-3">Created Quizzes</h2>

      {quizzes.length === 0 && (
        <p className="text-gray-500 text-sm">No quizzes created yet</p>
      )}

      <div className="space-y-2">
        {quizzes.map((q) => (
          <div
            key={q._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div onClick={()=>setQuizId(q._id)}>
              <p className={`font-medium ${quizId===q._id?"text-blue-500":""} `}>{q.title}</p>
              <p className="text-sm text-gray-500">
                Time: {q.timeLimit} min | Passing: {q.passingMarks}
              </p>
            </div>

            <button
              onClick={() => handleEdit(q._id)}
              className="text-sm bg-yellow-400 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            
            <button
              onClick={() => handleDeleteQuiz(q._id)}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
            

          </div>
        ))}
      </div>
      <TeacherQuizQuestions quizId={quizId}/>
    </div>
  );
};

export default TeacherQuiz;
