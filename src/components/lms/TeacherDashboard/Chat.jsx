import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import { FaBars, FaPlus } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { io } from "socket.io-client";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket"],
});

const Chat = ({ id }) => {
  const [groupData, setGroupData] = useState(null);
  const [msg, setMsg] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [message, setMessage] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const bottomRef = useRef(null);

  /* ================= CREATE GROUP FORM ================= */
  const [formShow, setFormShow] = useState(false);
  const [formData, setFormData] = useState({ groupName: "", groupType: "private" });
  const [groupImage, setGroupImage] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= PROFILE ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/profile", { withCredentials: true })
      .then((res) => setProfileData(res.data.data || {}));
  }, []);

  /* ================= GROUP ================= */
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/group/chat/${id}`, { withCredentials: true })
      .then((res) => setGroupData(res.data.data));
  }, [id]);

  /* ================= LOAD MESSAGES + JOIN ================= */
  useEffect(() => {
    if (!groupData?._id) return;

    axios
      .get(`http://localhost:5000/message/${groupData._id}`, { withCredentials: true })
      .then((res) => setMsg(res.data.data || []));

    socket.emit("joinGroup", groupData._id);
  }, [groupData?._id]);

  /* ================= SOCKET ================= */
  useEffect(() => {
    const handleReceive = (data) => {
      setMsg((prev) =>
        prev.some((m) => m._id === data._id) ? prev : [...prev, data]
      );
    };

    const handleDelete = ({ messageId }) => {
      setMsg((prev) => prev.filter((m) => m._id !== messageId));
    };

    socket.on("receiveMessage", handleReceive);
    socket.on("messageDeleted", handleDelete);

    return () => {
      socket.off("receiveMessage", handleReceive);
      socket.off("messageDeleted", handleDelete);
    };
  }, []);

  /* ================= AUTO SCROLL ================= */
  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  /* ================= FILE SELECT ================= */
  const handleFileSelect = (file) => {
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= UPLOAD ================= */
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:5000/upload/upload", formData, {
      withCredentials: true,
      onUploadProgress: (e) => {
        setProgress(Math.round((e.loaded * 100) / e.total));
      },
    });

    return res.data.url;
  };

  /* ================= SEND ================= */
  const handleSend = async () => {
    if (!message.trim() && !file) return;

    let fileUrl = "";
    let msgType = "text";

    try {
      if (file) {
        setUploading(true);
        fileUrl = await uploadToCloudinary(file);
        msgType = "image";
      }

      socket.emit("sendMessage", {
        groupId: groupData._id,
        senderId: profileData._id,
        msgType,
        message,
        fileUrl,
      });
    } finally {
      setMessage("");
      setFile(null);
      setPreview(null);
      setProgress(0);
      setUploading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;

    await axios.delete(`http://localhost:5000/message/teacher/${messageId}`, { withCredentials: true });

    socket.emit("deleteMessage", { messageId, groupId: groupData._id });
  };

  /* ================= CREATE GROUP ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.groupName) {
      alert("Group name is required");
      return;
    }
    try {
      setLoading(true);
      const data = new FormData();
      data.append("groupName", formData.groupName);
      data.append("groupType", formData.groupType);
      if (groupImage) data.append("image", groupImage);

      const res = await axios.post(`http://localhost:5000/group/chat/create/${id}`, data, { withCredentials: true });

      if (res.data.success) {
        alert(res.data.msg);
        setFormShow(false);
        setFormData({ groupName: "", groupType: "private" });
        setGroupImage(null);

        // refresh group data after creation
        axios.get(`http://localhost:5000/group/chat/${id}`, { withCredentials: true })
          .then((res) => setGroupData(res.data.data));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex h-full max-w-6xl mx-auto">

        {/* ================= SIDEBAR ================= */}
        <div
          className={`fixed lg:static z-40 left-0 h-full w-[280px] bg-white border-r shadow
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className="flex justify-between items-center p-4 border-b lg:hidden">
            <h2 className="font-semibold">Members</h2>
            <IoClose onClick={() => setSidebarOpen(false)} />
          </div>

          <div className="p-3 space-y-3 overflow-y-auto">
            {!groupData && (
              <button
                onClick={() => setFormShow(true)}
                className="w-full flex justify-center items-center gap-3 bg-blue-500 p-2 rounded-lg font-medium text-white"
              >
                <FaPlus /> Create Chat
              </button>
            )}
            {groupData?.members?.map((m) => (
              <div key={m._id} className="flex items-center gap-3">
                <img src={m.profile_Imag} className="w-8 h-8 rounded-full" />
                <span>{m.username}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CHAT ================= */}
        <div className="flex-1 flex flex-col">
          {/* HEADER */}
          <div className="flex items-center gap-3 p-4 bg-white shadow">
            <FaBars className="lg:hidden" onClick={() => setSidebarOpen(true)} />
              <img src={groupData?.thumbnail} alt="group" />
            <h1 className="font-bold">{groupData?.groupName || "Select a group"}</h1>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msg.map((m) => {
              const isMe =
                (typeof m.senderId === "object"
                  ? m.senderId._id
                  : m.senderId) === profileData._id;

              return (
                <div
                  key={m._id}
                  className={`max-w-[85%] sm:max-w-[75%] p-2 rounded-lg text-sm ${
                    isMe ? "ml-auto bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img className="w-[30px] h-[30px]  rounded-[50%] " src={m.senderId.profile_Imag} alt="userProfile" />
                    <span className="text-xs opacity-70">{isMe ? "You" : m.senderId?.username}</span>
                    </div>
                    {groupData?.admins?.map((i) => i === profileData._id) && (
                      <BiDotsVerticalRounded
                        onClick={() =>
                          setOpenMenuId(openMenuId === m._id ? null : m._id)
                        }
                        className="cursor-pointer"
                      />
                    )}
                  </div>

                  {openMenuId === m._id && (
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="text-red-500 text-xs mt-1 flex items-center gap-1"
                    >
                      <MdDelete /> Delete
                    </button>
                  )}

                  {m.msgType === "text" && <p>{m.message}</p>}
                  {m.msgType === "image" && <img src={m.fileUrl} className="w-48 rounded-lg mt-2" />}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* ================= IMAGE PREVIEW ================= */}
          {preview && (
            <div className="p-3 bg-white w-[200px] border-t">
              <img src={preview} className="w-32 rounded mb-2" />
              {uploading && (
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className="bg-blue-500 h-2 rounded" style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>
          )}

          {/* ================= INPUT ================= */}
          <div className="py-3 lg:px-2 bg-white border-t lg:flex gap-1 items-center w-full">
            <input type="file" hidden id="fileUpload" accept="image/*" onChange={(e) => handleFileSelect(e.target.files[0])} />
            <label htmlFor="fileUpload" className="text-2xl cursor-pointer">
              <CiCirclePlus />
            </label>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-2 lg:px-3 py-2"
            />

            <button
              onClick={handleSend}
              disabled={uploading}
              className="bg-blue-500 py-2 text-white px-4 rounded-lg disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* ================= CREATE GROUP FORM MODAL ================= */}
      {formShow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-lg w-full bg-white p-6 relative rounded-xl shadow">
            <button onClick={() => setFormShow(false)} className="absolute right-2 top-2 p-1 rounded-full bg-gray-100 shadow">
              <IoClose />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Create Group Chat</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* GROUP NAME */}
              <div>
                <label className="block text-sm font-medium mb-1">Group Name</label>
                <input
                  type="text"
                  value={formData.groupName}
                  onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                  placeholder="Enter group name"
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* GROUP IMAGE */}
              <div>
                <label className="block text-sm font-medium mb-1">Group Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setGroupImage(e.target.files[0])}
                  className="w-full"
                />
              </div>

              {/* GROUP TYPE */}
              <div>
                <label className="block text-sm font-medium mb-1">Group Type</label>
                <select
                  value={formData.groupType}
                  onChange={(e) => setFormData({ ...formData, groupType: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {loading ? "Creating..." : "Create Group"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
