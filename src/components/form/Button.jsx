import React from "react";

const button = ({ children, sm, variant, ...rest }) => {
  const variantColor = {
    blue: "bg-bluish hover:bg-blue-500",
    green: "bg-green-700 hover:bg-green-600",
    darkBlue: "bg-blue-900 hover:bg-blue-500",
    gray: "bg-gray-600 hover:bg-gray-500",
  };
  return (
    <button
      className={`
      ${sm ? "px-2 py-1" : "py-3 px-8"}
      ${variantColor[variant] || variantColor["blue"]} 
      text-white rounded transition
       `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default button;
