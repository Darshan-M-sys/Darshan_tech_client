import React from "react";
import Header from "../Header";
import { Helmet } from "react-helmet";
import LmsFooter from "../LMSFooter";

const MyProfile = () => {
  return (
    <>
    <div>
      <Helmet>
        <title>Founder Profile | DarshanTech Innovations</title>

        <meta
          name="description"
          content="Founder profile of Darshan M – Full-Stack Web Developer, Software Engineer, Educator, and Founder of DarshanTech Innovations."
        />

        <meta
          name="keywords"
          content="Darshan M, DarshanTech Innovations founder, full stack developer India, software developer, MERN stack expert, LMS founder"
        />

        {/* Google Trust */}
        <meta name="author" content="Darshan M" />

        {/* This page CAN be indexed (important for founder authority) */}
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />

      <div className="max-w-7xl mx-auto p-6">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
          <img
            src="https://ui-avatars.com/api/?name=Darshan M&background=4f46e5&color=fff"
            className="w-32 h-32 rounded-full border-4 border-indigo-500"
            alt="Darshan M Founder Profile"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">
              Darshan M
            </h1>

            <p className="text-indigo-600 font-medium">
              Full-Stack Web Developer · Software Engineer · Founder
            </p>

            <p className="mt-3 text-gray-600 leading-relaxed">
              Passionate full-stack developer and real-world problem solver.
              Founder of DarshanTech Innovations, focused on building scalable
              software, LMS platforms, and mentoring students through
              industry-level projects.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                Founder
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                Instructor
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                Mentor
              </span>
            </div>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

          {/* BASIC INFO */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-gray-800 mb-4">
              Basic Information
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><b>Email:</b> darshandarshan94356@gmail.com</li>
              <li><b>Location:</b> India</li>
              <li><b>Member Since:</b> Jan 2026</li>
              <li><b>Role:</b> Founder – DarshanTech Innovations</li>
            </ul>
          </div>

          {/* SKILLS */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-gray-800 mb-4">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                "HTML","CSS","JavaScript","React","Node.js","Express",
                "MongoDB","REST API","Socket.IO","Python","Django",
                "Flask","Tailwind","Git","GitHub","Next.js","AI / ML"
              ].map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* TEACHING */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-gray-800 mb-4">
              Teaching Expertise
            </h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li>Full-Stack Web Development</li>
              <li>MERN Stack Projects</li>
              <li>Live Classes & Mentorship</li>
              <li>Interview Preparation</li>
            </ul>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[
            ["Courses", "12"],
            ["Students", "1,200+"],
            ["Live Sessions", "85"],
            ["Rating", "4.8 ⭐"]
          ].map(([title, value]) => (
            <div
              key={title}
              className="bg-white rounded-xl shadow p-5 text-center"
            >
              <h4 className="text-gray-600 font-medium">{title}</h4>
              <p className="text-2xl font-bold text-indigo-600 mt-2">
                {value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
    <LmsFooter/>
    </>
  );
};

export default MyProfile;
