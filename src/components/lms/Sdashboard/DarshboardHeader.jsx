import { FaBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashboardHeader = ({name,image}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
      
      {/* Left Section */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome back, <span className="text-indigo-600">{name} 👋</span>
        </h1>
        <p className="text-sm text-gray-500">
          Continue your learning journey
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <FaSearch className="text-gray-500 text-sm" />
          <input
            type="text"
            placeholder="Search courses..."
            className="bg-transparent outline-none px-2 text-sm"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <FaBell className="text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
       <Link to="/training/profile"> <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={image}
            alt="profile"
            className="w-9 h-9 rounded-full"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">Student</p>
            <p className="text-xs text-gray-500">View Profile</p>
          </div>
        </div></Link>

      </div>
    </div>
  );
};

export default DashboardHeader;
