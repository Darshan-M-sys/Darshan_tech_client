import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JitsiMeeting } from "@jitsi/react-sdk";
import axios from "axios";

export default function StudentLive() {
  const nav = useNavigate();
  const apiRef = useRef(null);

  // ✅ Student info from localStorage (set during registration)
  const email = localStorage.getItem("liveEmail");
  const name = localStorage.getItem("liveName");

  const [ready, setReady] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [jwtToken, setJwtToken] = useState("");

  const API_URL = "https://darshantechinnvations.shop";

  // 🔒 Permission check once
  useEffect(() => {
    if (!email || !name) {
      nav("/register");
      return;
    }

    const checkAccess = async () => {
      try {
        // Check if user is allowed
        const res = await axios.post(
          `${API_URL}/live/user/can-join`,
          { email }
        );

        if (!res.data.canJoin) {
          nav("/waiting");
          return;
        }

        // ✅ Get current live status & room
        const liveRes = await axios.get(`${API_URL}/live/status`);
        if (!liveRes.data.isLive) {
          nav("/waiting");
          return;
        }

        setRoomName(liveRes.data.roomName);

        // ✅ Request student JWT from backend
        const jwtRes = await axios.post(`${API_URL}/live/jwt/student`, {
          name,
          email,
        });

        setJwtToken(jwtRes.data.jwt);
        setReady(true);
      } catch (err) {
        console.error(err);
        nav("/waiting");
      }
    };

    checkAccess();
  }, [email, name, nav]);

  // 🔁 Background live check every 10 seconds
  useEffect(() => {
    if (!ready) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${API_URL}/live/status`);
        if (!res.data.isLive) {
          window.location.href = "/waiting";
        }
      } catch {
        window.location.href = "/waiting";
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [ready]);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Joining live class…</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={roomName || "Darshan_LMS_Live"}
        jwt={jwtToken}
        userInfo={{
          displayName: name || "Student",
        }}
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: true,
          disableModeratorIndicator: true,
          disableAudioLevels: true,
          toolbarButtons: ["chat", "raisehand", "participants-pane"],
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        onApiReady={(api) => {
          apiRef.current = api;

          // 🔒 Force mute (student cannot unmute)
          api.addEventListener("audioMuteStatusChanged", (e) => {
            if (!e.muted) api.executeCommand("toggleAudio");
          });

          api.addEventListener("videoMuteStatusChanged", (e) => {
            if (!e.muted) api.executeCommand("toggleVideo");
          });
        }}
        getIFrameRef={(node) => {
          node.style.height = "100%";
          node.style.width = "100%";
        }}
      />
    </div>
  );
}
