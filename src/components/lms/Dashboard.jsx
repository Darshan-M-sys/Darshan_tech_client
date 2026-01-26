import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import TeacherDashboard from "./TeacherDashboard";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "../lms/Sdashboard/StudentDashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LmsFooter from "./LMSFooter";

const Dashboard = () => {
  const nav = useNavigate();
  const [authData, setAuthData] = useState({});
  const [loading, setLoading] = useState(true);
  const API_URL="https://darshantechinnvations.shop";
  const handleAuth = async () => {
    try {
      const login = await axios.get(
        `${API_URL}/user/login`,
        { withCredentials: true }
      );
      setAuthData(login.data.data || {});
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  useEffect(() => {
    if (!loading && (!authData?.username || !authData?.role)) {
      nav("/training/authentication/login");
    }
  }, [authData, loading, nav]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | DarshanTech Innovations LMS</title>
        <meta
          name="description"
          content="User dashboard for students, teachers, and administrators at DarshanTech Innovations LMS."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {authData?.role === "student" && <StudentDashboard />}
      {authData?.role === "teacher" && <TeacherDashboard />}
      {authData?.role === "admin" && <AdminDashboard />}
      <LmsFooter/>
    </>
  );
};

export default Dashboard;
