import React from "react";
import { GrFormViewHide } from "react-icons/gr";

const Popover = ({ children, element }) => {
  return (
    <>
      <div className="peer cursor-pointer w-full">
        {element || <GrFormViewHide className="text-3xl block mx-auto" />}
      </div>
      <div className="hidden peer-hover:flex absolute bg-white peer-hover:flex-col -translate-x-3/4 -translate-y-1/2 p-3 transition border rounded-sm border-gray-300">
        {children}
      </div>
    </>
  );
};

export default Popover;
