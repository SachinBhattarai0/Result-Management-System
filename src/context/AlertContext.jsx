import React, { useState, useContext, createContext } from "react";

export const DANGER = "bg-red-700";
export const SUCCESS = "bg-green-700";

const AlertContext = createContext();

const defaultState = {
  type: DANGER,
  message: "",
};

const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState(defaultState);

  const updateAlert = (message, type = DANGER) => {
    setAlertState({ type, message });
    setTimeout(() => setAlertState(defaultState), 3000);
  };

  return (
    <AlertContext.Provider value={{ alertState, updateAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);

export default AlertProvider;
