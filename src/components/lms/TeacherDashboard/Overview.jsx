import React, { useEffect, useState } from "react";
import { FaBook, FaUsers, FaClipboardList } from "react-icons/fa";
import axios from "axios"
const Overview = ({myStudents,myCoursesLength}) => {
 
 const stats = [
    { title: "My Courses", value: myCoursesLength, icon: <FaBook /> },
    { title: "Students", value: myStudents, icon: <FaUsers /> },
    { title: "Quizzes", value:myCoursesLength, icon: <FaClipboardList /> },
  ];
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>
            <div className="text-3xl text-blue-600">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Create Course
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Create Quiz
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>📘 React Course Updated</li>
            <li>📝 Quiz added to Python Course</li>
            <li>👨‍🎓 5 new students enrolled</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
