import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import LmsFooter from "./LMSFooter";

const OtpInput = ({ length = 6, onComplete }) => {
  const[msg,setMsg]=useState("");
  const[type,setType]=useState("")
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);
  const[success,setSuccess]=useState(false);
  const[response,setResponse]=useState("")
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);

    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((_, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = newOtp[i];
      }
    });

    onComplete?.(newOtp.join(""));
  };

 const {state}=useLocation()

    const handleForgetPassword=async()=>{
      try {
       const data= await axios.post("http://localhost:5000/user/forget_password",{email:state});
       setMsg(data.data.msg)
       setType(data.data.type)
      } catch (error) {
        console.log(error)
      }
    }


const navigate=useNavigate();
useEffect(()=>{
if (otp.join("") === "123456") {
  alert("I am");
}
},[otp])


useEffect(()=>{
const  setTime=setTimeout(()=>{
  if(success){
    return navigate("/training/authentication/reset-password",{state:{otp:otp.join(""),email:state}})
  }
},100)
return()=>clearTimeout(setTime)
},[success,otp,navigate])



const handlePasswordVerification=async()=>{
 try {
  if(!otp.length>5){
    return setResponse("Enter 6 digit otp")
  }
const data = await axios.post("http://localhost:5000/user/verify-otp",{email:state,otp:otp.join("")});
    setMsg(data.data.msg)
    setType(data.data.type)
    setSuccess(data.data.success);
 } catch (error) {
  console.log(error)
 }
}

return (
  <>   <div> <Header/>
    <div
      className="flex gap-3 items-center min-h-[100vh]  justify-center"
      onPaste={handlePaste}
    >
      <div className="flex flex-col bg-white p-4 rounded-xl  shadow shadow-xl">
 <div>
<h1 className="text-center font-bold text-blue-900"> OTP verification</h1>
<h2 className="text-center font-semibold mb-2"> The OTP sent to the Registered email</h2>

 </div> 
 <div className="flex">
      {otp.map((digit, index) => (  
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-xl font-semibold border  border-black rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      ))}
      </div>
    <div className="flex justify-between mt-2">
      <p onClick={handleForgetPassword} className="text-blue-500">Resend?</p>
      <h1>Otp Expire in <span className="text-blue-500 font-semibold"> 10 min</span></h1>
    </div>

      <button onClick={handlePasswordVerification} className="font-semibold p-2 mt-5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-5 rounded-xl" >Verify</button>
           <Notification
  message={msg}
  type={type}
  onClose={() => setMsg("")}
/>
      </div>
    
    </div>
    </div>
    <LmsFooter/>
    </>
  );
};

export default OtpInput;
