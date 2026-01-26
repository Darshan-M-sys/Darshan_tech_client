import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiFileText, FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Notes = ({ id }) => {
  const [notesTitle, setNotesTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [notes, setNotes] = useState([]);

  // ✅ Fetch notes
  const handleGetNotes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/notes/${id}`,
        { withCredentials: true }
      );
      setNotes(res.data.data || []);
  
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetNotes();
  }, [id]);

  // ✅ Upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!notesTitle || !pdfFile) {
      setError("Notes title and PDF are required");
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
      formData.append("notesTitle", notesTitle);
      formData.append("pdf", pdfFile);

      await axios.post(
        `http://localhost:5000/notes/upload/notes/${id}`,
        formData,
        { withCredentials: true }
      );

      setSuccess("Notes uploaded successfully ✅");
      setNotesTitle("");
      setPdfFile(null);
      handleGetNotes();

    } catch (err) {
      setError(err.response?.data?.msg || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotes= async(notesId)=>{
    try {
      if(!window.confirm("Are you sure to delete this Item")) return;
       await axios.delete(`http://localhost:5000/notes/delete/${notesId}`,{withCredentials:true})
      handleGetNotes()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FiUpload /> Upload Notes
      </h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Notes Title"
          value={notesTitle}
          onChange={(e) => setNotesTitle(e.target.value)}
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
          {loading ? "Uploading..." : "Upload Notes"}
        </button>
      </form>

      {/* Notes List */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Uploaded Notes</h3>

        {notes.length === 0 && (
          <p className="text-gray-500 text-sm">No notes uploaded yet</p>
        )}

        <div className="space-y-3">
          {notes.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-3 rounded hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <FiFileText className="text-indigo-600 text-xl" />
                <p className="font-medium">{item.notesTitle}</p>
              </div>
<div className="flex items-center gap-2">
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 cursor-pointer text-sm hover:underline"
              >
                View PDF
              </a>
              <MdDelete onClick={()=>handleDeleteNotes(item._id)} className="text-[30px] text-red-500 cursor-pointer p-2 border rounded-full "/>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
