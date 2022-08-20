import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios/index";
import { AiFillEdit } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";
import { BiTrash } from "react-icons/bi";
import Content from "../../components/content/Content";
import Spinner from "../../components/spinner/Spinner";
import Pagination from "../../components/pagination/Pagination";
import AssignmentCreateOptions from "../../components/Admin/assignmentCreateOptions/AssignmentCreateOptions";

const Assignment = () => {
  const [pageNo, setPageNo] = useState(1);
  const [assignments, setAssignments] = useState({
    isPending: false,
    pager: {},
    assignmentList: [],
  });

  useEffect(() => {
    const fetchAssignmentList = async () => {
      try {
        setAssignments({ ...assignments, isPending: true });
        const { data } = await apiWithJwt("/assignment/get-all?page=" + pageNo);
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
  }, [pageNo]);

  return (
    <Content>
      <AssignmentCreateOptions />
      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">To</th>
            <th className="border-2 py-3 px-1">Exam</th>
            <th className="border-2 py-3 px-1">Subject</th>
            <th className="border-2 py-3 px-1">Done</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>

          {assignments.assignmentList.map((assignment, i) => (
            <tr key={i}>
              <td className="border-2 p-1 py-3 text-center">{i + 1}</td>
              <td className="border-2 p-1 py-3 text-center">
                {assignment.user ? assignment.user.name : "deleted"}
              </td>
              <td className="border-2 p-1 py-3 text-center">
                {assignment.exam ? assignment.exam.name : "deleted"}
              </td>
              <td className="border-2 p-1 py-3 text-center">
                {assignment.subject ? assignment.subject.name : "deleted"}
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
                  <AiFillEdit className="text-green-700" />
                </button>
                <button className="text-xl ml-2">
                  <BiTrash className="text-red-700" />
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
