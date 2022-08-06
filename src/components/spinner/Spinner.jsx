import React from "react";

const Spinner = ({ h, w }) => {
  return (
    <div
      className={`rounded-full animate-spin bg-gradient-to-br from-slate-700 m-auto ${
        h || "h-5"
      } ${w || "w-5"}`}
    >
      <div className="h-1/2 w-1/2 rounded-full bg-slate-300 top-1/2 left-1/2 translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
};

export default Spinner;
