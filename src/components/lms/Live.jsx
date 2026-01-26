import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JitsiMeeting } from "@jitsi/react-sdk";
import axios from "axios";

export default function StudentLive() {
  const nav = useNavigate();
  const apiRef = useRef(null);


  const email = localStorage.getItem("liveEmail");
  const name = localStorage.getItem("liveName");

  const [ready, setReady] = useState(false);

  // 🔒 Permission check ONCE
  useEffect(() => {
    if (!email) {
      nav("/register");
      return;
    }

    const check = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/live/user/can-join",
          { email }
        );

        if (!res.data.canJoin) {
          nav("/waiting");
          return;
        }

        setReady(true);
      } catch {
        nav("/waiting");
      }
    };

    check();
  }, []);

  // 🔁 Background live check (NO rerender)
  useEffect(() => {
    if (!ready) return;

    const interval = setInterval(async () => {
      const res = await axios.get("http://localhost:5000/live/status");

      if (!res.data.isLive) {
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

  // 🚫 Prevent remount


  return (
    <div className="h-screen w-screen">
      <JitsiMeeting
        domain="meet.jit.si"
        roomName="Darshan_Tech_Innovations_LMS_Skills"
        userInfo={{
          displayName: name || "Student",
        }}
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: true,

          disableModeratorIndicator: true,
          disableAudioLevels: true,

          // 🚫 STUDENT TOOLBAR
          toolbarButtons: [
            "chat",
            "raisehand",
            "participants-pane"
          ],
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        onApiReady={(api) => {
          apiRef.current = api;

          // 🔒 FORCE MUTE (even if student hacks)
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
