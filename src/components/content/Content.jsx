import React from "react";
import TopNav from "../Navbar/TopNav";
import { useNavState } from "../../context/NavContext";

const Content = ({ children }) => {
  const { navState } = useNavState();
  return (
    <div className="flex flex-col flex-1 pb-10">
      <TopNav />
      <div
        className={`md:max-h-9/10 px-3 overflow-y-scroll relative flex-col top-24 ${
          navState.open ? "hidden md:flex" : "flex"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Content;
