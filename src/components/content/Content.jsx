import React from "react";
import TopNav from "../Navbar/TopNav";

const Content = ({ children }) => {
  return (
    <div className="flex flex-col flex-1">
      <TopNav />
      <div className="md:max-h-9/10 px-3 overflow-y-scroll relative flex flex-col top-24">
        {children}
      </div>
    </div>
  );
};

export default Content;
