import { useEffect, useState } from "react";

import axios from "axios";
import LiveInfoBanner from "./LiveInfoBanner";
import { Link } from "react-router-dom";
 const LiveCreate
=()=> {
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
     const API_URL="https://darshantechinnvations.shop";
  const schedule = async () => {
    await axios.post(`${API_URL}/live/schedule`, { scheduledTime: time },{withCredentials:true});
    alert("Live Scheduled");
  };
  const start = async () => {
    await axios.post(`${API_URL}/live/start`);
    setStatus("LIVE");
  };
  const stop = async () => {
    await axios.post(`${API_URL}/live/stop`);
    setStatus("STOPPED");
  };
  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`${API_URL}/live/status`);
      setStatus(res.data.isLive ? "LIVE" : "OFFLINE");
    };
    load();
  }, []);

    const [form, setForm] = useState({
    title: "",
    description: "",
    startTime: "",
    duration: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveLiveInfo = async () => {
    try {
      await axios.post(
        `${API_URL}/live/live-info`,
        form,
        { withCredentials: true }
      );
      alert("Live info saved");
    } catch (err) {
      alert("Error saving live info");
    }
  };

   const [authData,setAuthData]=useState({})
    
    const handleAuth=async()=>{
      try{
      const login= await axios.get(`${API_URL}/user/login`,{withCredentials:true});
      setAuthData(login.data.data|| {})
      }catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
      handleAuth()
    },[])
    
 
  return (
  <>

   {authData.role==="teacher"?(
    <div>
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-xl font-bold mb-4 text-center">
          🎥 Live Class Settings
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Live Class Title"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Live Class Description"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="startTime"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <button
          onClick={saveLiveInfo}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Live Info
        </button>
      </div>

<LiveInfoBanner/>
  
      <div className="bg-white p-6 rounded-xl shadow w-[420px]">
        <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Teacher Control Panel</h2>
        {status==="LIVE" &&
<Link to="https://www.darshantechinnovations.tech/hosting/teacher/live" target="_block" className="text-blue-500 font-semibold">Go Live</Link>
}
</div>
        <input
          type="datetime-local"
          className="w-full border p-2 rounded mb-3"
          onChange={e => setTime(e.target.value)}
        />

        <button
          onClick={schedule}
          className="w-full bg-blue-600 text-white py-2 rounded mb-2"
        >
          Schedule Live
        </button>

        <button
          onClick={start}
          className="w-full bg-green-600 text-white py-2 rounded mb-2"
        >
          Start Live
        </button>

        <button
          onClick={stop}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Stop Live
        </button>

        <div className="mt-4 text-sm">
          Status: <b>{status}</b>
        </div>
      </div>
  
         


      </div>)
    :<h1>Unauthorized Access</h1>
   }
    </>
  );
}

export default LiveCreate;