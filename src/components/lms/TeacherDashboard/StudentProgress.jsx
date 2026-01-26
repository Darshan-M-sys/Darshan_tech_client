const StudentProgress = ({ students = [] }) => {
  if (!students.length) {
    return (
      <p className="text-gray-500 text-sm">
        No enrollments found
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {students.map((item, index) => {
        const progress = item?.progress || 0;

        return (
          <div
            key={item._id || index}
            className="flex flex-col gap-2 p-4 border rounded-lg bg-white shadow-sm"
          >
            <div>
              <h1 className="font-semibold text-gray-800">
                {item.courseId?.title || "No course"}
              </h1>

              <p className="text-base font-medium text-gray-700">
                {item.studentId?.username || "No username"}
              </p>

              <p className="text-sm text-gray-500">
                {item.studentId?.email || "No email"}
              </p>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <div className="w-[220px] bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-xs font-medium text-gray-600">
                {progress}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentProgress;
