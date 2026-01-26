import React, { useEffect, useState } from "react";
import axios from "axios";

const QuizContent = ({ courseId }) => {
  const [view, setView] = useState("list");
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
     const API_URL="https://darshantechinnvations.shop";
  /* ================= FETCH QUIZZES ================= */
  const fetchQuizzes = async () => {

    try {
      const res = await axios.get(
        `${API_URL}/quiz/${courseId}`,
        { withCredentials: true }
      );

      let data = res.data.data || [];

      // Get attempted quizzes from localStorage
      const attemptedQuizzes = JSON.parse(localStorage.getItem("attemptedQuizzes")) || [];

      // Mark quizzes as attempted if in localStorage
      data = data.map(q => ({
        ...q,
        attempted: attemptedQuizzes.includes(q._id)
      }));

      setQuizzes(data);
    } catch {
      setQuizzes([]);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [courseId]);

  /* ================= START QUIZ ================= */
  const startQuiz = async (quiz) => {
    if (quiz.attempted) return; // Prevent starting already attempted quizzes

    try {
      setLoading(true);

      const qRes = await axios.get(
        `${API_URL}/quiz/${quiz._id}/question`,
        { withCredentials: true }
      );

      await axios.post(
        `${API_URL}/quiz/attempt/start`,
        { quizId: quiz._id },
        { withCredentials: true }
      );

      setActiveQuiz(quiz);
      setQuestions(qRes.data.data || []);
      setAnswers([]);
      setCurrentIndex(0);
      setView("quiz");
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SELECT OPTION ================= */
  const selectOption = (questionId, selectedOption) => {
    setAnswers(prev => {
      const found = prev.find(a => a.questionId === questionId);
      if (found) {
        return prev.map(a =>
          a.questionId === questionId ? { ...a, selectedOption } : a
        );
      }
      return [...prev, { questionId, selectedOption }];
    });
  };

  /* ================= SUBMIT QUIZ ================= */
  const submitQuiz = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/quiz/submit/${activeQuiz._id}`,
        { answers },
        { withCredentials: true }
      );

      setResult(res.data);
      setView("result");

      // Save attempted quiz ID in localStorage
      const attemptedQuizzes = JSON.parse(localStorage.getItem("attemptedQuizzes")) || [];
      if (!attemptedQuizzes.includes(activeQuiz._id)) {
        attemptedQuizzes.push(activeQuiz._id);
        localStorage.setItem("attemptedQuizzes", JSON.stringify(attemptedQuizzes));
      }

      // Update local state
      setQuizzes(prev =>
        prev.map(q =>
          q._id === activeQuiz._id ? { ...q, attempted: true } : q
        )
      );
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Quiz Panel</h1>

      {/* ====== Quiz List ====== */}
      {view === "list" &&
        quizzes.map(q => (
          <div
            key={q._id}
            className="border p-4 rounded flex justify-between items-center mb-4 hover:shadow-lg transition-shadow"
          >
            <div>
              <h2 className="font-semibold text-lg">{q.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Time: {q.timeLimit} min | Passing: {q.passingMarks}
              </p>
            </div>
            {q.attempted ? (
              <button
                disabled
                className="bg-gray-400 text-white px-5 py-2 rounded cursor-not-allowed"
              >
                Already Attempted
              </button>
            ) : (
              <button
                onClick={() => startQuiz(q)}
                className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Start
              </button>
            )}
          </div>
        ))}

      {/* ====== Quiz Questions ====== */}
      {view === "quiz" && questions.length > 0 && (
        <>
          <div className="mb-4">
            <h2 className="font-semibold text-xl">{activeQuiz.title}</h2>
            <p className="text-gray-600 mt-1">
              Question {currentIndex + 1} / {questions.length}
            </p>
          </div>

          <div className="border p-5 rounded bg-gray-50">
            <p className="mb-4 text-gray-800 font-medium">
              {questions[currentIndex].questionText}
            </p>

            {questions[currentIndex].options.map((opt, idx) => {
              const selected = answers.find(a => a.questionId === questions[currentIndex]._id)?.selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() =>
                    selectOption(questions[currentIndex]._id, idx)
                  }
                  className={`block w-full text-left border p-3 rounded mb-2 transition-colors
                    ${selected ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-800 hover:bg-gray-100"}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-6">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(i => i - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Prev
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={submitQuiz}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex(i => i + 1)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}

      {/* ====== Quiz Result ====== */}
      {view === "result" && result && (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold mb-2">Result</h2>
          <p className="text-lg mb-1">
            Score: <span className="font-semibold">{result.score}</span>
          </p>
          <p className="text-lg mb-4">
            Status: <span className="font-semibold">{result.status}</span>
          </p>
          <button
            onClick={() => setView("list")}
            className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Back to Quizzes
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizContent;
