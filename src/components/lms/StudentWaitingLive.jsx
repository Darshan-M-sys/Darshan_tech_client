import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WaitingRoom() {
  const [timeLeft, setTimeLeft] = useState("");
  const [startTime, setStartTime] = useState(null);
  const nav = useNavigate();

  // 🔹 Fetch live status once
  const fetchLiveStatus = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/live/user/live-status"
      );

      if (res.data.isLive) {
        nav("/live");
        return;
      }

      if (res.data.scheduledTime) {
        setStartTime(new Date(res.data.scheduledTime));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLiveStatus();
  }, []);

  // 🔹 Countdown timer
  useEffect(() => {
    if (!startTime) return;

    const timer = setInterval(() => {
      const diff = startTime.getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft("Waiting for teacher to start...");
        return;
      }

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // 🔹 Check live status every 5 seconds (safe)
  useEffect(() => {
    const interval = setInterval(fetchLiveStatus, 5000);
    return () => clearInterval(interval);
  }, []);


  const [liveInfo, setLiveInfo] = useState({});
  
   
  
    const fetchLiveInfo = async () => {
      try {
        const res = await axios.get("http://localhost:5000/live/live-info");
        setLiveInfo(res.data.data);
        if(!res.data.data?.isStart){
          return nav('/register')
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      fetchLiveInfo();
    }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      {liveInfo ?
      <div className="bg-white p-8 rounded-xl shadow text-center w-[320px]">
        <h2 className="text-xl font-bold mb-2">Waiting Room</h2>

        {startTime && (
          <p className="text-sm text-gray-500 mb-2">
            Live starts at: {startTime.toLocaleString()}
          </p>
        )}

        <div className="text-2xl font-mono text-blue-600 mb-3">
          {timeLeft || "Loading..."}
        </div>

        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
          Please wait
        </span>
      </div>:<h1>Currently no live available</h1>}
    </div>
  );
}
