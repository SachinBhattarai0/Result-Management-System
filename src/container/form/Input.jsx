import React from "react";

const input = ({ name, label, placeholder, type = "text", ...rest }) => {
  return (
    <div className="flex flex-col-reverse relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="peer w-full min-w-64 border outline-none p-3 border-gray-200 rounded-sm focus:border-bluish"
        {...rest}
      />
      <label
        htmlFor={name}
        className="font-sm text-sm rounded-sm transition duration-300 absolute text-bluish translate-x-3 peer-focus:-translate-y-10 px-1 -z-10 scale-0 peer-focus:scale-100  peer-focus:z-10 bg-white"
      >
        {label}
      </label>
    </div>
  );
};

export default input;
