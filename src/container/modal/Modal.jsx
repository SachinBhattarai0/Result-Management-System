import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { useModalState } from "../../context/ModalContext";
import Spinner from "../spinner/Spinner";
import Button from "../form/Button";

const Modal = () => {
  const { modalState, setModalState, closeModal } = useModalState();

  const handleClick = () => {
    setModalState({ ...modalState, isPending: true });
    modalState.onClick();
  };

  if (!modalState.open) return null;

  return (
    <div className="bg-black bg-opacity-70 fixed h-screen w-screen top-0 left-0 z-50">
      <div className="p-4 rounded w-3/4 md:w-1/2 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between">
          <span className="text-xl">{modalState.title || "Are You Sure?"}</span>
          <MdOutlineClose
            className="text-3xl cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <div className="py-3">{modalState.body}</div>
        <div className="flex flex-col space-y-1">
          <Button variant="red" onClick={handleClick}>
            {modalState.isPending ? <Spinner /> : "I am sure.."}
          </Button>
          <Button variant="gray" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
