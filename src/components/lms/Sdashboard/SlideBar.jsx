import { FaHome, FaBook, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-5 hidden md:block">
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">DarshanTech Innovations</h1>

      <ul className="space-y-4 text-gray-700">
        <li className="flex items-center gap-3 cursor-pointer hover:text-indigo-600">
          <FaHome /> Dashboard
        </li>
        <li className="flex items-center gap-3 cursor-pointer hover:text-indigo-600">
          <FaBook /> My Courses
        </li>
        <li className="flex items-center gap-3 cursor-pointer hover:text-indigo-600">
          <FaUserGraduate /> Certificates
        </li>
        <li className="flex items-center gap-3 cursor-pointer hover:text-red-500">
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
