import { useState } from "react";
import {
  FaBook,
  FaComments,
  FaStickyNote,
  FaQuestionCircle,
  FaUserTie
} from "react-icons/fa";


 
import { useParams } from 'react-router-dom'
import Header from '../Header'
import CourseContent from "./CourseContent";
import ChatContent from "./ChatContent";
import NotesContent from "./NotesContent";
import QuizContent from "./QuizContent";
import InterviewContent from "./InterviewContent";

const LearnCourse = () => {
 const {id}=useParams()
 const [activeTab, setActiveTab] = useState("course");

  const tabs = [
    { id: "course", label: "Course", icon: <FaBook /> },
    { id: "chat", label: "Chat", icon: <FaComments /> },
    { id: "notes", label: "Notes", icon: <FaStickyNote /> },
    { id: "quiz", label: "Quiz", icon: <FaQuestionCircle /> },
    { id: "interview", label: "Interview", icon: <FaUserTie /> },
  ];

  return (
   <> 
   <Header/>
   <div className="bg-white">
     < div className="bg-white rounded-xl shadow-sm">

      {/* Tab Header */}
      <div className="flex border-b overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition
              ${
                activeTab === tab.id
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className=" p-2 lg:p-6">
        {activeTab === "course" && <CourseContent  id={id} />}
        {activeTab === "chat" && <ChatContent  id={id}/>}
        {activeTab === "notes" && <NotesContent id={id} />}
        {activeTab === "quiz" && <QuizContent courseId={id}  />}
        {activeTab === "interview" && <InterviewContent id={id} />}
      </div>
    </div>
    </div>
    </>

  )
}

export default LearnCourse

