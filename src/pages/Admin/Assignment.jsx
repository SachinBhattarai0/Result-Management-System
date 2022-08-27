import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios/index";
import { AiFillEdit } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { SUCCESS } from "../../context/AlertContext";
import { useAlert } from "../../context/AlertContext";
import { useModalState } from "../../context/ModalContext";
import Content from "../../container/content/Content";
import Spinner from "../../container/spinner/Spinner";
import Pagination from "../../container/pagination/Pagination";
import AssignmentCreateOptions from "../../components/assignmentCreateOptions/AssignmentCreateOptions";

const Assignment = () => {
  const navigate = useNavigate();
  const { updateAlert } = useAlert();
  const [pageNo, setPageNo] = useState(1);
  const { showModal, closeModal } = useModalState();
  const [assignmentDeletedOrCreated, setAssignmentDeletedOrCreated] =
    useState("");
  const [assignments, setAssignments] = useState({
    isPending: false,
    pager: {},
    assignmentList: [],
  });

  const deleteAssignment = async (id) => {
    try {
      const { data } = await apiWithJwt("/assignment/delete/", { id });
      updateAlert(data.message, SUCCESS);
      closeModal();
      //This state change will trigger useEffect to fetch new assignment list
      setAssignmentDeletedOrCreated(Math.random());
    } catch (error) {
      console.log(error);
      updateAlert(error.message);
    }
  };

  const handleUpdateButtonClick = (assignment) => {
    navigate("/rms/admin/assignment/update/", { state: assignment });
  };

  const handleDeleteButtonClick = (assignment) => {
    showModal("Are you sure?", "You are about to delete the assignment? ", () =>
      deleteAssignment(assignment._id)
    );
  };

  useEffect(() => {
    const fetchAssignmentList = async () => {
      try {
        setAssignments({ ...assignments, isPending: true });
        const { data } = await apiWithJwt(
          "/assignment/get-all-paginated?page=" + pageNo
        );
        setAssignments({
          ...assignments,
          pager: data.pager,
          assignmentList: data.assignments,
          isPending: false,
        });
      } catch (error) {
        setAssignments({ ...assignments, isPending: false });
      }
    };
    fetchAssignmentList();
  }, [pageNo, assignmentDeletedOrCreated]);

  return (
    <Content>
      <AssignmentCreateOptions
        setAssignmentDeletedOrCreated={setAssignmentDeletedOrCreated}
      />
      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">To</th>
            <th className="border-2 py-3 px-1">Exam</th>
            <th className="border-2 py-3 px-1">Subject</th>
            <th className="border-2 py-3 px-1">Class</th>
            <th className="border-2 py-3 px-1">Done</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>

          {assignments.assignmentList.map((assignment, i) => (
            <tr key={i}>
              <td className="border-2 p-1 py-3 text-center">{i + 1}</td>
              <td className="border-2 p-1 py-3 text-center">
                {assignment.user.name}
              </td>
              <td className="border-2 p-1 py-3 text-center">
                {assignment.exam.name} ({assignment.exam.year}-
                {assignment.exam.month}-{assignment.exam.date})
              </td>
              <td className="border-2 p-1 py-3 text-center">
                {assignment.subject.name}
              </td>
              <td className="border-2 p-1 py-3 text-center">
                {assignment.class.name}
              </td>
              <td className="border-2 p-1 py-3 text-center">
                {assignment.completed ? (
                  <ImCheckmark className="text-green-700 m-auto" />
                ) : (
                  <ImCross className="text-red-700 m-auto" />
                )}
              </td>
              <td className="border-2 p-1 py-3 text-center">
                <button className="text-xl ml-2">
                  <AiFillEdit
                    className={
                      assignment.completed
                        ? "pointer-events-none text-gray-600"
                        : "text-green-700"
                    }
                    onClick={() => handleUpdateButtonClick(assignment)}
                  />
                </button>
                <button className="text-xl ml-2">
                  <BiTrash
                    className="text-red-700"
                    onClick={() => handleDeleteButtonClick(assignment)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {assignments.isPending && <Spinner />}
      <Pagination pager={assignments.pager} setPageNo={setPageNo} />
    </Content>
  );
};

export default Assignment;
