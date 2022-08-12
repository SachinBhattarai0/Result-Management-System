import React from "react";

const FilterContainer = ({ children, title }) => {
  return (
    <div className="p-3 bg-white w-full mb-4">
      <h3 className="text-2xl">{title}</h3>
      {children}
    </div>
  );
};

export default FilterContainer;
