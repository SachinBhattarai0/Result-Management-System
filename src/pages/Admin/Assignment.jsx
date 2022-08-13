import React, { useState, useEffect } from "react";
import { apiWithJwt } from "../../axios/index";
import Content from "../../components/content/Content";
import { AiFillEdit } from "react-icons/ai";
import { ImCheckmark, ImCross } from "react-icons/im";
import { BiTrash } from "react-icons/bi";
import Spinner from "../../components/spinner/Spinner";
import AssignmentCreateOptions from "../../components/Admin/assignmentCreateOptions/AssignmentCreateOptions";

const Assignment = () => {
  const [assignments, setAssignments] = useState({
    isPending: false,
    assignmentList: [],
  });

  useEffect(() => {
    const fetchAssignmentList = async () => {
      try {
        setAssignments({ ...assignments, isPending: true });
        const { data } = await apiWithJwt("/assignment/get-all/");
        setAssignments({
          ...assignments,
          assignmentList: data.assignments,
          isPending: false,
        });
      } catch (error) {
        setAssignments({ ...assignments, isPending: false });
      }
    };
    fetchAssignmentList();
  }, []);

  return (
    <Content>
      <AssignmentCreateOptions
        assignments={assignments}
        setAssignments={setAssignments}
      />
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
                {assignment.user.name}
              </td>
              <td className="border-2 p-1 py-3 text-center">
                {assignment.exam.name}
              </td>
              <td className="border-2 p-1 py-3 text-center">
                {assignment.subject.name}
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
    </Content>
  );
};

export default Assignment;
