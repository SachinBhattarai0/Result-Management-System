import React, { useState, useEffect, createContext, useContext } from "react";
import { apiWithJwt } from "../axios";

const userContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    id: "",
    name: "",
    role: "",
    isPending: false,
    isAuthenticated: false,
  });
  console.log(userInfo);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    const verifyJwtToken = async () => {
      try {
        const response = await apiWithJwt("/user/verify/", {}, jwtToken);

        if (response.status === 200)
          setUserInfo({
            ...response.data.user,
            isPending: false,
            isAuthenticated: true,
          });
      } catch (error) {
        localStorage.removeItem("jwtToken");
      }
    };

    if (jwtToken) verifyJwtToken();
  }, []);

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserState = () => useContext(userContext);
export default UserContextProvider;