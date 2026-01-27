import { useEffect, useRef, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import axios from "axios";

export default function TeacherLive() {
  const apiRef = useRef(null);
  const [authData, setAuthData] = useState({});
  const [ready, setReady] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const API_URL = "https://darshantechinnvations.shop";

  // 🔒 Fetch teacher auth and validate
  const handleAuth = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/login`, {
        withCredentials: true,
      });
      const data = res.data.data || {};

      if (data.role !== "teacher") {
        setAuthData({});
        setReady(false);
        return;
      }

      setAuthData(data);

      // ✅ Fetch teacher JWT for Jitsi
      const jwtRes = await axios.post(
        `${API_URL}/live/jwt/teacher`,
        {
          name: data.username,
          email: data.email,
        },
        { withCredentials: true }
      );

      setJwtToken(jwtRes.data.jwt);

      // ✅ Fetch or set room name dynamically
      const liveRes = await axios.get(`${API_URL}/live/status`);
      setRoomName(liveRes.data.roomName || "Darshan_Tech_Innovations_LMS_Skills");

      setReady(true);
    } catch (err) {
      console.error("Auth error:", err);
      setReady(false);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading Teacher Live…</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      {authData.role === "teacher" ? (
        <JitsiMeeting
          domain="meet.jit.si"
          roomName={roomName}
          jwt={jwtToken}
          userInfo={{
            displayName: authData.username || "Teacher",
          }}
          configOverwrite={{
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            enableModeratorIndicator: true,
          }}
          interfaceConfigOverwrite={{
            TOOLBAR_BUTTONS: [
              "microphone",
              "camera",
              "desktop",
              "chat",
              "participants-pane",
              "mute-everyone",
              "security",
              "hangup",
              "whiteboard",
              "raisehand",
            ],
          }}
          onApiReady={(api) => {
            apiRef.current = api;

            // 🔇 MUTE ALL STUDENTS WHEN TEACHER JOINS
            api.executeCommand("muteEveryone");

            // Optional: listen for teacher commands
            api.addEventListener("participantJoined", (event) => {
              console.log("Student joined:", event);
            });
          }}
          getIFrameRef={(node) => {
            node.style.height = "100%";
            node.style.width = "100%";
          }}
        />
      ) : (
        <h1 className="text-center text-red-600 mt-20">
          Only Teacher Can Access This Live Class
        </h1>
      )}
    </div>
  );
}
