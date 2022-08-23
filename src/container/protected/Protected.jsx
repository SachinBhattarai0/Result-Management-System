import React from "react";
import { Navigate } from "react-router-dom";
import { useUserState } from "../../context/UserContext";

const Protected = ({ components, roles }) => {
  const { userInfo } = useUserState();

  if (roles.includes(userInfo.role)) return <>{components}</>;
  else if (userInfo.role === "admin")
    return <Navigate to={"/rms/admin/dashboard/"} replace={true} />;
  else if (userInfo.role === "teacher")
    return <Navigate to={"/rms/assignment/"} replace={true} />;
  return <Navigate to={"/sign-in/"} replace={true} />;
};

export default Protected;
