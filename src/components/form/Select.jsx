import React, { forwardRef } from "react";

const Select = forwardRef(({ children, label, ...rest }, ref) => {
  return (
    <select
      className="px-1 flex-1 py-2 rounded-sm border border-gray-300 outline-none focus:border-bluish"
      ref={ref}
      {...rest}
    >
      <option value="" defaultChecked>
        ---------
      </option>
      {children}
    </select>
  );
});

export default Select;
