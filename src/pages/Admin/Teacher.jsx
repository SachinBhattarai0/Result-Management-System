import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { apiWithJwt } from "../../axios";
import { useNavigate } from "react-router-dom";
import { SUCCESS } from "../../context/AlertContext";
import { useAlert } from "../../context/AlertContext";
import { useModalState } from "../../context/ModalContext";
import Spinner from "../../components/spinner/Spinner";
import Content from "../../components/content/Content";
import Pagination from "../../components/pagination/Pagination";
import UserCreateCreteOptions from "../../components/Admin/userCreateOpions/UserCreateOptions";

const Teacher = () => {
  const navigate = useNavigate();
  const { updateAlert } = useAlert();
  const [pageNo, setPageNo] = useState(1);
  const [teacherDeleted, setTeacherDeleted] = useState("");
  const { showModal, closeModal } = useModalState();
  const [teacherState, setTeacherState] = useState({
    isPending: false,
    pager: {},
    teacherList: [],
  });

  const deleteTeacher = async (id) => {
    try {
      setTeacherState({ ...teacherState, isPending: true });
      const { data } = await apiWithJwt("/user/delete-teacher/", { id });
      updateAlert(data.message, SUCCESS);
      closeModal();
      //this state change will trigger useEffect to refetch new list of teachers
      setTeacherDeleted(Math.random());
    } catch (error) {
      console.log(error);
      updateAlert(error.message);
    }
  };

  const handleUpdateButtonClick = (teacher) => {
    navigate("/rms/admin/teacher/update", { state: teacher });
  };
  const handleDeleteButtonClick = (teacher) => {
    showModal(
      "Are you sure?",
      "Deleting teacher will delete all its associated assignments",
      () => deleteTeacher(teacher._id)
    );
  };

  useEffect(() => {
    const fetchTeacherList = async () => {
      try {
        setTeacherState({ ...teacherState, isPending: true });
        const { data } = await apiWithJwt(
          "/user/get-teachers-paginated?page=" + pageNo
        );
        setTeacherState({
          ...teacherState,
          pager: data.pager,
          teacherList: data.teachers,
          isPending: false,
        });
      } catch (error) {
        setTeacherState({ ...teacherState, isPending: false });
        console.log(error);
      }
    };
    fetchTeacherList();
  }, [pageNo, teacherDeleted]);

  return (
    <Content>
      <UserCreateCreteOptions />

      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">Name</th>
            <th className="border-2 py-3 px-1">Email</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>
          {teacherState.teacherList.map((teacher, i) => (
            <tr key={i}>
              <td className="border-2 p-1 py-3 text-center">{i + 1}</td>
              <td className="border-2 p-1 py-3 text-center">{teacher.name}</td>
              <td className="border-2 p-1 py-3 text-center">{teacher.email}</td>
              <td className="border-2 p-1 py-3 text-center">
                <button className="text-xl ml-2">
                  <AiFillEdit
                    className="text-green-700"
                    onClick={() => handleUpdateButtonClick(teacher)}
                  />
                </button>
                <button className="text-xl ml-2">
                  <BiTrash
                    className="text-red-700"
                    onClick={() => handleDeleteButtonClick(teacher)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {teacherState.isPending && <Spinner />}
      <Pagination pager={teacherState.pager} setPageNo={setPageNo} />
    </Content>
  );
};

export default Teacher;
