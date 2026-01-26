import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiFileText, FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Interview = ({ id }) => {
  const [interviewTitle, setInterviewTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [interviews, setInterviews] = useState([]);
     const API_URL="https://darshantechinnvations.shop";
  // ✅ Fetch Interview PDFs
  const fetchInterviews = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/interview/${id}`,
        { withCredentials: true }
      );
      setInterviews(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, [id]);

  // ✅ Upload Interview PDF
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!interviewTitle || !pdfFile) {
      setError("Interview title and PDF are required");
      return;
    }

    if (pdfFile.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    if (pdfFile.size > 5 * 1024 * 1024) {
      setError("PDF size must be less than 5MB");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("interviewTitle", interviewTitle);
      formData.append("pdf", pdfFile);

      await axios.post(
        `${API_URL}/interview/upload/interview/${id}`, // ✅ FIXED
        formData,
        { withCredentials: true }
      );

      setSuccess("Interview PDF uploaded successfully ✅");
      setInterviewTitle("");
      setPdfFile(null);
      fetchInterviews();

    } catch (err) {
      setError(err.response?.data?.msg || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Interview PDF
  const handleDeleteInterview = async (interviewId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this interview PDF?")) return;

      await axios.delete(
        `${API_URL}/interview/delete/${interviewId}`,
        { withCredentials: true }
      );

      fetchInterviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FiUpload /> Upload Interview PDFs
      </h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Interview Title"
          value={interviewTitle}
          onChange={(e) => setInterviewTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
          className="w-full"
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Uploading..." : "Upload Interview PDF"}
        </button>
      </form>

      {/* Interview List */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Uploaded Interview PDFs</h3>

        {interviews.length === 0 && (
          <p className="text-gray-500 text-sm">No interview PDFs uploaded yet</p>
        )}

        <div className="space-y-3">
          {interviews.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-3 rounded hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <FiFileText className="text-indigo-600 text-xl" />
                <p className="font-medium">{item.interviewTitle}</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 text-sm hover:underline"
                >
                  View PDF
                </a>

                <MdDelete
                  onClick={() => handleDeleteInterview(item._id)}
                  className="text-[28px] text-red-500 cursor-pointer p-1 border rounded-full hover:bg-red-50"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interview;
