import { useEffect, useRef, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import axios from "axios";

export default function TeacherLive() {
const apiRef = useRef(null);
  const [authData,setAuthData]=useState({})
  
  const handleAuth=async()=>{
    try{
    const login= await axios.get("http://localhost:5000/user/login",{withCredentials:true});
    setAuthData(login.data.data|| {})
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    handleAuth()
  },[])
  
  return (
   
    <div className="h-screen w-screen">
       {authData.role==="teacher"?
      <JitsiMeeting
        domain="meet.jit.si"
        roomName="Darshan_Tech_Innovations_LMS_Skills"
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
            "whiteboard"
          ],
        }}
        onApiReady={(api) => {
          apiRef.current = api;

          // 🔇 MUTE ALL WHEN TEACHER JOINS
          api.executeCommand("muteEveryone");
        }}
        getIFrameRef={(node) => {
          node.style.height = "100%";
          node.style.width = "100%";
        }}
      />
      :
      <h1> Only Admin Can Handle This</h1>
}
    </div>
  );
}
