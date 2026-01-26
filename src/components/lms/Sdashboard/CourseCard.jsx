import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CourseCard = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleMyCourses = async () => {
     const API_URL="https://darshantechinnvations.shop";
    try {
      const res = await axios.get(
        `${API_URL}/enrollment/student`,
        { withCredentials: true }
      );
      setMyCourses(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMyCourses();
  }, []);

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow animate-pulse">
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  /* ================= EMPTY STATE ================= */
  if (!myCourses.length) {
    return (
      <p className="text-center text-gray-500">
        You are not enrolled in any courses yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {myCourses.map((item) => {
        const progress = item.progress || 0;

        return (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* Thumbnail */}
            <img
              src={item.courseId?.thumbnail || "/course-placeholder.png"}
              alt={item.courseId?.title}
              className="h-40 w-full object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {item.courseId?.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {item.courseId?.shortDescription}
              </p>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full
                    ${
                      progress === 100
                        ? "bg-green-100 text-green-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                >
                  {progress === 100 ? "Completed" : "In Progress"}
                </span>

                <Link to={`/training/course/${item.courseId?._id}`}>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                    Continue →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseCard;
