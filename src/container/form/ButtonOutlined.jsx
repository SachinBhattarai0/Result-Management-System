import React from "react";

const ButtonOutlined = ({ children, variant, ...rest }) => {
  const variantOptions = {
    blue: "border-blue-800 text-blue-800 hover:shadow-blue-200 hover:shadow-md hover:bg-blue-800",
    green:
      "border-green-800 text-green-800 hover:shadow-green-200 hover:shadow-md hover:bg-green-800",
  };
  return (
    <button
      className={`absolute text-sm right-0 transition px-2 rounded outline-none border hover:text-white ${
        variantOptions[variant] || variantOptions["blue"]
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonOutlined;
