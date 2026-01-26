import { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherLiveInfoPanel() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL="https://darshantechinnvations.shop";
  const fetchInfo = async () => {
    const res = await axios.get(
      `${API_URL}/live/live-info`,
      { withCredentials: true }
    );
    setInfo(res.data.data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const showLiveInfo = async () => {
    setLoading(true);
    await axios.post(
      `${API_URL}/live/info/show`,
      {},
      { withCredentials: true }
    );
    await fetchInfo();
    setLoading(false);
  };

  const hideLiveInfo = async () => {
    setLoading(true);
    await axios.post(
      `${API_URL}/live/info/hide`,
      {},
      { withCredentials: true }
    );
    await fetchInfo();
    setLoading(false);
  };

  if (!info) return null;

  const start = info.startTime
    ? new Date(info.startTime).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
      })
    : "Not scheduled";

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🎥 Live Class Control</h1>

      <div className="mb-4">
        <p className="text-gray-500 text-sm">Title</p>
        <p className="font-semibold">{info.title}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-500 text-sm">Description</p>
        <p>{info.description}</p>
      </div>

      <div className="mb-4">
        <p className="text-gray-500 text-sm">Start Time</p>
        <p>{start}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={showLiveInfo}
          disabled={loading || info.isStarted}
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          Start Live
        </button>

        <button
          onClick={hideLiveInfo}
          disabled={loading || !info.isStart}
          className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-60"
        >
          Stop Live
        </button>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Status:{" "}
        <span className={info.isStart ? "text-green-600" : "text-red-600"}>
          {info.isStart ? "Live is ON" : "Live is OFF"}
        </span>
      </p>
    </div>
  );
}
