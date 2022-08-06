import React from "react";
import { useAlert } from "../../context/AlertContext";

const Alert = () => {
  const { alertState } = useAlert();

  return (
    alertState.message && (
      <div
        className={`absolute top-5 z-30 left-1/2 -translate-x-1/2 text-white p-2 rounded gelatine-animation ${alertState.type}`}
      >
        {alertState.message}
      </div>
    )
  );
};

export default Alert;
