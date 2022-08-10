import React from "react";

const Select = ({ children, ...rest }) => {
  return (
    <select
      className="px-1 flex-1 py-2 rounded-sm border border-gray-300 outline-none focus:border-bluish"
      {...rest}
    >
      <option value="" defaultChecked>
        ---------
      </option>
      {children}
    </select>
  );
};

export default Select;
