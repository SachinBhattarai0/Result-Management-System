import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../context/UserContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserState();

  useEffect(() => {
    if (!userInfo.isAuthenticated) navigate("/sign-in/", { replace: true });
  }, [userInfo.isAuthenticated]);
  return <div>Dashboard</div>;
};

export default Dashboard;
