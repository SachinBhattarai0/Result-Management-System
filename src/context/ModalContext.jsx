import React from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    open: false,
    title: "",
    body: "",
    onClick: () => {},
  });

  const showModal = (title, body, onClick) =>
    setModalState({ ...modalState, open: true, title, body, onClick });

  const closeModal = () => setModalState({ ...modalState, open: false });

  return (
    <ModalContext.Provider value={{ modalState, showModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalState = () => useContext(ModalContext);
export default ModalProvider;
