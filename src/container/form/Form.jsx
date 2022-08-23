import React from "react";

const Form = ({ children, ...rest }) => {
  return (
    <form
      className="space-y-3 rounded-2xl max-w-sm shadow-2xl px-8 py-12"
      {...rest}
    >
      {children}
    </form>
  );
};

export default Form;
