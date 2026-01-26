import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherQuizQuestions = ({ quizId }) => {
  /* ================= STATE ================= */
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    marks: 1
  });

  /* ================= FETCH QUESTIONS ================= */
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/quiz/${quizId}/question`,
        { withCredentials: true }
      );
      setQuestions(res.data.data || []);
    } catch (err) {
      console.error(err);
      setQuestions([]);
    }
  };

  useEffect(() => {
    if (quizId) fetchQuestions();
  }, [quizId]);

  /* ================= FORM HANDLING ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  const resetForm = () => {
    setForm({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      marks: 1
    });
    setEditId(null);
    setMsg("");
  };

  /* ================= CREATE QUESTION ================= */
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.questionText || form.options.some(o => !o)) {
      setMsg("❌ Question and all options are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:5000/quiz/${quizId}/question/add`,
        form,
        { withCredentials: true }
      );

      setMsg("✅ Question added successfully");
      resetForm();
      fetchQuestions();
    } catch (error) {
      setMsg("❌ Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT QUESTION ================= */
  const handleEdit = (q) => {
    setForm({
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      marks: q.marks
    });
    setEditId(q._id);
  };

  /* ================= UPDATE QUESTION ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:5000/quiz/question/update/${editId}`,
        form,
        { withCredentials: true }
      );

      setMsg("✅ Question updated");
      resetForm();
      fetchQuestions();
    } catch (error) {
      setMsg("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE QUESTION ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/quiz/question/delete/${id}`,
        { withCredentials: true }
      );
      fetchQuestions();
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>

      {/* ADD / UPDATE FORM */}
      <form
        onSubmit={editId ? handleUpdate : handleCreate}
        className="space-y-3 mb-6"
      >
        <textarea
          name="questionText"
          placeholder="Enter question"
          className="w-full border p-2 rounded"
          value={form.questionText}
          onChange={handleChange}
        />

        {form.options.map((opt, idx) => (
          <input
            key={idx}
            placeholder={`Option ${idx + 1}`}
            className="w-full border p-2 rounded"
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
          />
        ))}

        <div className="flex gap-3">
          <select
            name="correctAnswer"
            className="border p-2 rounded w-full"
            value={form.correctAnswer}
            onChange={handleChange}
          >
            <option value={0}>Correct Option 1</option>
            <option value={1}>Correct Option 2</option>
            <option value={2}>Correct Option 3</option>
            <option value={3}>Correct Option 4</option>
          </select>

          <input
            type="number"
            name="marks"
            min="1"
            className="border p-2 rounded w-32"
            placeholder="Marks"
            value={form.marks}
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {loading
            ? "Saving..."
            : editId
            ? "Update Question"
            : "Add Question"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={resetForm}
            className="w-full bg-gray-300 py-2 rounded"
          >
            Cancel Edit
          </button>
        )}

        {msg && <p className="text-sm">{msg}</p>}
      </form>

      {/* QUESTION LIST */}
      <h2 className="text-lg font-semibold mb-3">Added Questions</h2>

      {questions.length === 0 && (
        <p className="text-gray-500 text-sm">No questions added yet</p>
      )}

      <div className="space-y-3">
        {questions.map((q, index) => (
          <div key={q._id} className="border p-3 rounded">
            <p className="font-medium">
              {index + 1}. {q.questionText}
            </p>

            <ul className="ml-4 text-sm list-disc">
              {q.options.map((opt, i) => (
                <li
                  key={i}
                  className={
                    i === q.correctAnswer
                      ? "text-green-600 font-semibold"
                      : ""
                  }
                >
                  {opt}
                </li>
              ))}
            </ul>

            <p className="text-sm mt-1">Marks: {q.marks}</p>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => handleEdit(q)}
                className="bg-yellow-400 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(q._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherQuizQuestions;
