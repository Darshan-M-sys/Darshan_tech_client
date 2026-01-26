import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiFileText, FiDownload } from "react-icons/fi";

const NotesContent = ({ id}) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
     const API_URL="https://darshantechinnvations.shop";
    try {
      const res = await axios.get(
        `${API_URL}/notes/${id}`,
        { withCredentials: true }
      );
      setNotes(res.data.data || []);
    } catch (err) {
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        📘 Course Notes
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">Loading notes...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {/* Empty */}
      {!loading && notes.length === 0 && (
        <p className="text-gray-500">No notes available</p>
      )}

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="border rounded-xl p-4 shadow-sm hover:shadow transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <FiFileText className="text-indigo-600 text-2xl" />
              <h2 className="font-semibold text-lg">
                {note.notesTitle}
              </h2>
            </div>

            <div className="flex gap-4">
              {/* View */}
              <a
                href={note.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline text-sm"
              >
                View PDF
              </a>

              {/* Download */}
              <a
                href={note.pdfUrl}
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

export default NotesContent;
