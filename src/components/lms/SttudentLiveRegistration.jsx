import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LiveRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [liveInfo, setLiveInfo] = useState({});

  const nav = useNavigate();
  const API_URL="https://darshantechinnvations.shop";
  const fetchLiveInfo = async () => {
    try {
      const res = await axios.get(`${API_URL}/live/live-info`);
      setLiveInfo(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLiveInfo();
  }, []);

  const register = async () => {
    if (!name || !email) return alert("All fields required");

    await axios.post(`${API_URL}/live/user/register`, {
      name,
      email
    });

    localStorage.setItem("liveEmail", email);
    localStorage.setItem("liveName", name);
    nav("/waiting");
  };

  return (
  
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {liveInfo.isStart ?
      (
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">

      
        {liveInfo && (
          <div className="mb-6 border rounded-lg p-4 bg-blue-50">
            <h2 className="text-lg font-bold text-blue-700">
              {liveInfo.title}
            </h2>

            {liveInfo.startTime && (
              <p className="text-sm text-gray-600 mt-1">
                🕒 Starts at:{" "}
                {new Date(liveInfo.startTime).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short"
                })}
              </p>
            )}

            {liveInfo.description && (
              <div
                className="mt-3 text-sm text-gray-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: liveInfo.description
                }}
              />
            )}
          </div>
        )}

        {/* 🔵 REGISTER SECTION */}
        <h2 className="text-xl font-bold mb-4 text-center">
          Live Class Registration
        </h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register & Join
        </button>
      </div>):
      <h1>No Live Classes Is conducted in this time please wait.</h1>}
    </div>

 
  );
}
