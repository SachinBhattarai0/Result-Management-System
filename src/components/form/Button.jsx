import React from "react";

const button = ({ children, sm, ...rest }) => {
  return (
    <>
      {sm ? (
        <button
          className="bg-blue-900 text-white hover:bg-blue-800 px-2 py-1 rounded"
          {...rest}
        >
          {children}
        </button>
      ) : (
        <button
          className="bg-bluish text-white hover:bg-blue-500 rounded py-3 px-8 transition"
          {...rest}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default button;
