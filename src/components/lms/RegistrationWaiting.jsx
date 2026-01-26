import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCheckCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const RegistrationWaiting = ({ isOpen, onClose ,message}) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (isOpen) {
      setStatus("loading");

     
      const timer = setTimeout(() => {
        setStatus("success");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className="absolute inset-0 z-[99] bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 text-center animate-fadeIn">

        {status === "loading" && (
          <>
            <AiOutlineLoading3Quarters
              size={40}
              className="mx-auto text-indigo-600 animate-spin"
            />
            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              Verifying your data
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Please wait while we complete your registration…
            </p>
          </>
        )}

{status === "success" && (
          <>
            <MdCheckCircle
              size={48}
              className="mx-auto text-green-500"
            />
            <h2 className="mt-4 text-lg font-semibold text-gray-800">
             {message}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              A greeting message has been sent to your email.
            </p>

           <Link to="/training/dashboard"
              onClick={onClose}
              className="mt-[40px] px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Continue
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationWaiting;
