import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiFileText, FiDownload } from "react-icons/fi";

const InterviewContent = ({id}) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 const API_URL="https://darshantechinnvations.shop";
  const fetchInterviews = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/interview/${id}`,
        { withCredentials: true }
      );
      setInterviews(res.data.data || []);
    } catch (err) {
      setError("Failed to load interview PDFs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        🎯 Interview Questions (PDF)
      </h1>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Empty */}
      {!loading && interviews.length === 0 && (
        <p className="text-gray-500">No interview PDFs available</p>
      )}

      {/* List */}
      <div className="space-y-4">
        {interviews.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border rounded-xl p-4 shadow-sm hover:shadow"
          >
            <div className="flex items-center gap-3">
              <FiFileText className="text-indigo-600 text-2xl" />
              <p className="font-medium text-lg">
                {item.interviewTitle}
              </p>
            </div>

            <div className="flex gap-4">
              {/* View */}
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline text-sm"
              >
                View
              </a>

              {/* Download */}
              <a
                href={item.pdfUrl}
                download
                className="flex items-center gap-1 text-green-600 hover:underline text-sm"
              >
                <FiDownload />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewContent;
