import React, { useState, createContext, useContext } from "react";

const NavContext = createContext();

const NavContextProvider = ({ children }) => {
  const [navState, setNavState] = useState({ open: true });

  const toggleNavState = () => {
    setNavState({ ...navState, open: !navState.open });
  };
  return (
    <NavContext.Provider value={{ navState, toggleNavState }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavState = () => useContext(NavContext);
export default NavContextProvider;
