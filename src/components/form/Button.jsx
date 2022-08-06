import React from "react";

const button = ({ children, ...rest }) => {
  return (
    <button
      className="bg-bluish text-white hover:bg-blue-500 rounded py-3 px-8 transition"
      {...rest}
    >
      {children}
    </button>
  );
};

export default button;
