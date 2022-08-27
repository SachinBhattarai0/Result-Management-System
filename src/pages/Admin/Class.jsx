import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiWithJwt } from "../../axios";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { SUCCESS } from "../../context/AlertContext";
import { useAlert } from "../../context/AlertContext";
import { useModalState } from "../../context/ModalContext";
import Content from "../../container/content/Content";
import Spinner from "../../container/spinner/Spinner";
import ClassCreateOptions from "../../components/classCreateOptions/ClassCreateOptions";

const Assignment = () => {
  const navigate = useNavigate();
  const { updateAlert } = useAlert();
  const [classCreatedOrDeleted, setClassCreatedOrDeleted] = useState("");
  const { showModal, closeModal } = useModalState();
  const [classState, setClassState] = useState({
    isPending: false,
    classList: [],
  });

  const deleteClass = async (id) => {
    try {
      const { data } = await apiWithJwt("/class/delete/", { id });
      updateAlert(data.message, SUCCESS);
      closeModal();
      //This state change will trigger useEffect to fetch new class list
      setClassCreatedOrDeleted(Math.random());
    } catch (error) {
      console.log(error);
      updateAlert(error.message);
    }
  };

  const handleUpdateButtonClick = (_class) => {
    navigate("/rms/admin/class/update", { state: _class });
  };

  const handleDeleteButtonClick = (_class) => {
    showModal(
      "Are you sure?",
      "You are about to delete the class " + _class.name,
      () => deleteClass(_class._id)
    );
  };

  useEffect(() => {
    const fetchClassList = async () => {
      try {
        setClassState({ ...classState, isPending: true });
        const { data } = await apiWithJwt("/class/get-all");
        setClassState({
          ...classState,
          isPending: false,
          classList: data.class,
        });
      } catch (error) {
        setClassState({ ...classState, isPending: false });
        console.log(error);
      }
    };
    fetchClassList();
  }, [classCreatedOrDeleted]);

  return (
    <Content>
      <ClassCreateOptions setClassCreatedOrDeleted={setClassCreatedOrDeleted} />
      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">Name</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>
          {classState.classList.map((_class, i) => (
            <tr key={i}>
              <td className="border-2 p-1 py-3 text-center">{i + 1}</td>
              <td className="border-2 p-1 py-3 text-center">{_class.name}</td>
              <td className="border-2 p-1 py-3 text-center">
                <button className="text-xl ml-2">
                  <AiFillEdit
                    className="text-green-700"
                    onClick={() => handleUpdateButtonClick(_class)}
                  />
                </button>
                <button className="text-xl ml-2">
                  <BiTrash
                    className="text-red-700"
                    onClick={() => handleDeleteButtonClick(_class)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {classState.isPending && <Spinner />}
    </Content>
  );
};

export default Assignment;
