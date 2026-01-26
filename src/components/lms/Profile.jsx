import React, { useEffect, useState } from "react";
import Header from "./Header";
import profileLogo from "../assets/images/profile.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
     const API_URL="https://darshantechinnvations.shop";
  const handleProfileData = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/user/profile`,
        { withCredentials: true }
      );
      setProfileData(res.data.data || {});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleProfileData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      {/* 🚫 Do NOT index private profiles */}
      <Helmet>
        <title>User Profile | DarshanTech LMS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <div className="flex justify-center items-center h-[80vh]">
        <div className="relative w-[360px] bg-white rounded-2xl shadow-xl p-8 
          hover:shadow-2xl transition-all duration-300 overflow-hidden">

          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-indigo-500 
            opacity-0 hover:opacity-10 transition duration-300" />

          {loading ? (
            <p className="text-center text-gray-500">
              Loading profile...
            </p>
          ) : (
            <div className="relative z-10 flex flex-col items-center text-center gap-3">

              <img
                className="w-[110px] h-[110px] rounded-full border-4 border-blue-400 object-cover"
                src={profileData.profile_Imag || profileLogo}
                alt={`${profileData.username} profile`}
              />

              <h1 className="text-2xl font-bold text-gray-800">
                {profileData.username}
              </h1>

              <p className="text-sm text-gray-500">
                {profileData.email}
              </p>

              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-semibold">
                {profileData.role}
              </span>

              {profileData.bio && (
                <p className="text-gray-700 font-medium mt-2">
                  {profileData.bio}
                </p>
              )}

              {profileData.skills && (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-black">Skills:</span>{" "}
                  {profileData.skills}
                </p>
              )}

              <div className="flex gap-2 mt-4">
                <Link
                  to="/training/profile/update"
                  className="px-4 py-2 rounded-full text-white font-semibold 
                  bg-gradient-to-r from-blue-600 to-indigo-600 
                  hover:scale-105 transition-all"
                >
                  Edit Profile
                </Link>

                <Link
                  to="/training/dashboard"
                  className="px-4 py-2 rounded-full text-white font-semibold 
                  bg-gradient-to-r from-blue-600 to-indigo-600 
                  hover:scale-105 transition-all"
                >
                  Dashboard
                </Link>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
