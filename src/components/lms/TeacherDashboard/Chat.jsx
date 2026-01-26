import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { FaBars, FaPlus } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { io } from "socket.io-client";

/* ================= CONFIG ================= */
const API_URL = "https://darshantechinnvations.shop";

/* ================= COMPONENT ================= */
const Chat = ({ id }) => {
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

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

  /* ================= SOCKET INIT ================= */
  useEffect(() => {
    socketRef.current = io(API_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current.on("receiveMessage", (data) => {
      setMsg((prev) =>
        prev.some((m) => m._id === data._id) ? prev : [...prev, data]
      );
    });

    socketRef.current.on("messageDeleted", ({ messageId }) => {
      setMsg((prev) => prev.filter((m) => m._id !== messageId));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  /* ================= PROFILE ================= */
  useEffect(() => {
    axios
      .get(`${API_URL}/user/profile`, { withCredentials: true })
      .then((res) => setProfileData(res.data.data || {}));
  }, []);

  /* ================= GROUP ================= */
  useEffect(() => {
    if (!id) return;

    axios
      .get(`${API_URL}/group/chat/${id}`, { withCredentials: true })
      .then((res) => setGroupData(res.data.data));
  }, [id]);

  /* ================= LOAD + JOIN ROOM ================= */
  useEffect(() => {
    if (!groupData?._id || !socketRef.current) return;

    axios
      .get(`${API_URL}/message/${groupData._id}`, {
        withCredentials: true,
      })
      .then((res) => setMsg(res.data.data || []));

    socketRef.current.emit("joinGroup", groupData._id);
  }, [groupData?._id]);

  /* ================= AUTO SCROLL ================= */
  useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  /* ================= FILE ================= */
  const handleFileSelect = (file) => {
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= UPLOAD ================= */
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`${API_URL}/upload/upload`, formData, {
      withCredentials: true,
      onUploadProgress: (e) => {
        setProgress(Math.round((e.loaded * 100) / e.total));
      },
    });

    return res.data.url;
  };

  /* ================= SEND MESSAGE ================= */
  const handleSend = async () => {
    if (!message.trim() && !file) return;

    let fileUrl = "";
    let msgType = "text";

    if (file) {
      setUploading(true);
      fileUrl = await uploadToCloudinary(file);
      msgType = "image";
    }

    socketRef.current.emit("sendMessage", {
      groupId: groupData._id,
      msgType,
      message,
      fileUrl,
    });

    setMessage("");
    setFile(null);
    setPreview(null);
    setProgress(0);
    setUploading(false);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;

    await axios.delete(
      `${API_URL}/message/teacher/${messageId}`,
      { withCredentials: true }
    );

    socketRef.current.emit("deleteMessage", {
      messageId,
      groupId: groupData._id,
    });
  };

  /* ================= RENDER ================= */
  return (
    <div className="h-screen bg-gray-100">
      <div className="flex h-full max-w-6xl mx-auto">
        {/* SIDEBAR */}
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
            {groupData?.members?.map((m) => (
              <div key={m._id} className="flex items-center gap-3">
                <img
                  src={m.profile_Imag}
                  className="w-8 h-8 rounded-full"
                />
                <span>{m.username}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 flex flex-col">
          {/* HEADER */}
          <div className="flex items-center gap-3 p-4 bg-white shadow">
            <FaBars className="lg:hidden" onClick={() => setSidebarOpen(true)} />
            <h1 className="font-bold">
              {groupData?.groupName || "Select Group"}
            </h1>
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
                  className={`max-w-[75%] p-2 rounded-lg text-sm ${
                    isMe
                      ? "ml-auto bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p>{m.message}</p>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="p-3 bg-white border-t flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded px-3 py-2"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              disabled={uploading}
              className="bg-blue-500 text-white px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
