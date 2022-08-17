import React, { useState, createContext, useContext } from "react";

const NavContext = createContext();

const NavContextProvider = ({ children }) => {
  const [navState, setNavState] = useState({
    open: window.innerHeight < 768 ? false : true,
  });

  const toggleNavState = () => {
    setNavState({ ...navState, open: !navState.open });
  };
  const closeNavState = () => {
    setNavState({ ...navState, open: false });
  };
  return (
    <NavContext.Provider value={{ navState, toggleNavState, closeNavState }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavState = () => useContext(NavContext);
export default NavContextProvider;
