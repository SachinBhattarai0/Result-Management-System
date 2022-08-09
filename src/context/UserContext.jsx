import React, { useState, useEffect, createContext, useContext } from "react";
import { apiWithJwt } from "../axios";

const userContext = createContext();

const defaultState = {
  email: "",
  id: "",
  name: "",
  role: "",
  isPending: false,
  isAuthenticated: false,
};

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(defaultState);

  const logOut = () => {
    localStorage.removeItem("jwtToken");
    setUserInfo(defaultState);
  };

  useEffect(() => {
    const verifyJwtToken = async () => {
      try {
        const response = await apiWithJwt("/user/verify/");

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

    verifyJwtToken();
  }, []);

  return (
    <userContext.Provider value={{ userInfo, setUserInfo, logOut }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserState = () => useContext(userContext);
export default UserContextProvider;
