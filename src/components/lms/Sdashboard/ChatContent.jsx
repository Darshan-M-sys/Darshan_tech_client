import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { io } from "socket.io-client";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

/* ================= SOCKET ================= */
const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket"],
});

const ChatContent = ({ id }) => {
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

  const [viewImage, setViewImage] = useState(null);

  const bottomRef = useRef(null);

  /* ================= TIME FORMAT ================= */
  const formatTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ================= PROFILE ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/user/profile", {
        withCredentials: true,
      })
      .then((res) => setProfileData(res.data.data || {}));
  }, []);

  /* ================= GROUP ================= */
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/group/chat/${id}`, {
        withCredentials: true,
      })
      .then((res) => setGroupData(res.data.data));
  }, [id]);

  /* ================= LOAD MESSAGES ================= */
  useEffect(() => {
    if (!groupData?._id) return;

    axios
      .get(`http://localhost:5000/message/${groupData._id}`, {
        withCredentials: true,
      })
      .then((res) => setMsg(res.data.data || []));

    socket.emit("joinGroup", groupData._id);
  }, [groupData?._id]);

  /* ================= SOCKET ================= */
  useEffect(() => {
    const handleReceive = (data) => {
      setMsg((prev) =>
        prev.some((m) => m._id === data._id)
          ? prev
          : [...prev, data]
      );
    };

    const handleDelete = ({ messageId }) => {
      setMsg((prev) =>
        prev.filter((m) => m._id !== messageId)
      );
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
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
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

    const res = await axios.post(
      "http://localhost:5000/upload/upload",
      formData,
      {
        withCredentials: true,
        onUploadProgress: (e) => {
          setProgress(
            Math.round((e.loaded * 100) / e.total)
          );
        },
      }
    );

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

    await axios.delete(
      `http://localhost:5000/message/${messageId}`,
      { withCredentials: true }
    );

    socket.emit("deleteMessage", {
      messageId,
      groupId: groupData._id,
    });
  };

  /* ================= ESC CLOSE IMAGE ================= */
  useEffect(() => {
    const esc = (e) =>
      e.key === "Escape" && setViewImage(null);
    window.addEventListener("keydown", esc);
    return () =>
      window.removeEventListener("keydown", esc);
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <div className="flex h-full max-w-6xl mx-auto">

        {/* ================= SIDEBAR ================= */}
        <div
          className={`fixed lg:static z-40 left-0 h-full w-[280px] bg-white border-r shadow
          transform transition-transform duration-300 overflow-auto
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b lg:hidden">
            <h2 className="font-semibold">Members</h2>
            <IoClose
              className="cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          <div className="p-3 space-y-2 text-sm max-h-[calc(100vh-60px)] overflow-y-auto">
            {groupData?.members?.map((m) => (
              <div
                key={m._id}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
              >
                <img
                  src={m.profile_Imag}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="truncate">
                  <p className="font-medium truncate">
                    {m.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {m.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CHAT ================= */}
        <div className="flex-1 flex flex-col">

          {/* HEADER */}
          <div className="flex items-center gap-3 p-3 bg-white shadow sticky top-0 z-10">
            <FaBars
              className="lg:hidden cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            />

            {groupData?.groupImage && (
              <img
                src={groupData.groupImage}
                className="w-10 h-10 rounded-full object-cover border"
              />
            )}

            <div>
              <h1 className="font-semibold">
                {groupData?.groupName}
              </h1>
              <p className="text-xs text-gray-500">
                {groupData?.members?.length} members
              </p>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {msg.map((m) => {
              const isMe =
                (typeof m.senderId === "object"
                  ? m.senderId._id
                  : m.senderId) === profileData._id;

              return (
                <div
                  key={m._id}
                  className={`max-w-[80%] p-2 rounded-xl text-sm
                  ${
                    isMe
                      ? "ml-auto bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 rounded-bl-none"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center  justify-center gap-2">
                    <img src={m.senderId?.profile_Imag} className="w-[30px] h-[30px] rounded-full" alt="profile" />
                    <span className="text-xs opacity-70">
                      {isMe
                        ? "You"
                        : m.senderId?.username}
                    </span>
</div>
                    {isMe && (
                      <BiDotsVerticalRounded
                        className="cursor-pointer"
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === m._id
                              ? null
                              : m._id
                          )
                        }
                      />
                    )}
                  </div>

                  {openMenuId === m._id && (
                    <button
                      onClick={() =>
                        handleDelete(m._id)
                      }
                      className="text-red-500 text-xs flex items-center gap-1 mb-1"
                    >
                      <MdDelete size={14} /> Delete
                    </button>
                  )}

                  {m.msgType === "text" && (
                    <p className="break-words">
                      {m.message}
                    </p>
                  )}

                  {m.msgType === "image" && (
                    <img
                      src={m.fileUrl}
                      onClick={() =>
                        setViewImage(m.fileUrl)
                      }
                      className="w-48 rounded-lg mt-2 cursor-pointer"
                    />
                  )}

                  <p className="text-[10px] text-right opacity-70 mt-1">
                    {formatTime(m.createdAt)}
                  </p>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="p-3 bg-white border-t">
              <img
                src={preview}
                className="w-32 rounded mb-2"
              />
              {uploading && (
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-blue-500 h-2 rounded"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* INPUT */}
          <div className="p-2 bg-white border-t flex gap-2 items-center">
            <input
              type="file"
              hidden
              id="fileUpload"
              accept="image/*"
              onChange={(e) =>
                handleFileSelect(e.target.files[0])
              }
            />

            <label
              htmlFor="fileUpload"
              className="text-2xl cursor-pointer"
            >
              <CiCirclePlus />
            </label>

            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend()
              }
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2"
            />

            <button
              onClick={handleSend}
              disabled={uploading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* ================= FULL IMAGE VIEW ================= */}
      {viewImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setViewImage(null)}
          >
            <IoClose />
          </button>

          <img
            src={viewImage}
            className="max-w-[95%] max-h-[90%] rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ChatContent;
