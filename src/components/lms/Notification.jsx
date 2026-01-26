import React, { useEffect, useState } from "react";

const Notification = ({ message, type = "info", onClose }) => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setLeaving(false);

      const timer = setTimeout(() => {
        setLeaving(true);

        setTimeout(() => {
          setVisible(false);
          onClose && onClose();
        }, 400); // match fadeOut duration
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, type, onClose]);

  if (!visible || !message) return null;

  const typeStyles = {
    success: {
      bg: "bg-green-500",
      border: "border-l-green-300",
      progress: "bg-green-300",
    },
    error: {
      bg: "bg-red-500",
      border: "border-l-red-300",
      progress: "bg-red-300",
    },
    warning: {
      bg: "bg-yellow-500",
      border: "border-l-yellow-300",
      progress: "bg-yellow-300",
    },
    info: {
      bg: "bg-blue-500",
      border: "border-l-blue-300",
      progress: "bg-blue-300",
    },
  };

  const styles = typeStyles[type] || typeStyles.info;

  return (
       <div className="fixed top-[50px] lg:top-[200px] right:[10px] md:right-[200px] z-50">    <div
      className={`
        fixed top-5 right-5 z-50
        w-[220px]
        text-white p-3
        border-l-[6px]
        rounded-xl rounded-l-sm
        shadow-lg
        relative overflow-hidden
        ${styles.bg} ${styles.border}
        ${leaving ? "animate-fadeOut" : "animate-slideIn"}
      `}
    >
      <div className="font-semibold">{message}</div>

      {/* Close button */}
      <button
        onClick={() => {
          setLeaving(true);
          setTimeout(() => {
            setVisible(false);
            onClose && onClose();
          }, 400);
        }}
        className="absolute top-1 right-2 text-white text-lg"
      >
        ×
      </button>

      {/* Progress bar */}
      {!leaving && (
        <span
          className={`
            absolute bottom-0 left-0 h-[4px]
            animate-progress
            ${styles.progress}
          `}
        ></span>
      )}
    </div>
    </div>

  );
};

export default Notification;
