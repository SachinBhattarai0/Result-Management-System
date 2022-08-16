import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { apiWithJwt } from "../../axios";
import Content from "../../components/content/Content";
import Spinner from "../../components/spinner/Spinner";
import Popover from "../../components/popovers/Popover";
import Pagination from "../../components/pagination/Pagination";
import StudentCreateOptions from "../../components/Admin/studentCreateOptions/StudentCreateOptions";

const Student = () => {
  const [pageNo, setPageNo] = useState(1);
  const [studentState, setStudentState] = useState({
    isPending: false,
    pager: {},
    studentList: [],
  });

  useEffect(() => {
    const fetchstudentList = async () => {
      try {
        setStudentState({ ...studentState, isPending: true });
        const { data } = await apiWithJwt("/user/get-students?page=" + pageNo);
        setStudentState({
          ...studentState,
          studentList: data.students,
          pager: data.pager,
          isPending: false,
        });
      } catch (error) {
        setStudentState({ ...studentState, isPending: false });
        console.log(error);
      }
    };
    fetchstudentList();
  }, [pageNo]);
  return (
    <Content>
      <StudentCreateOptions />

      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">RollNo</th>
            <th className="border-2 py-3 px-1">Name</th>
            <th className="border-2 py-3 px-1">Class</th>
            <th className="border-2 py-3 px-1">Subjects</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>

          {!studentState.isPending &&
            studentState.studentList.map((student, i) => (
              <tr key={i}>
                <td className="border-2 py-3 px-1 text-center">
                  {student.rollNo}
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {student.name}
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {student.class.name}
                </td>
                <td className="border-2 py-3 px-1 text-center text-xs">
                  <Popover>
                    {student.subjects.map((sub, i) => (
                      <div key={i}>{sub.name}</div>
                    ))}
                  </Popover>
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
      {studentState.isPending && <Spinner />}

      <Pagination pager={studentState.pager} setPageNo={setPageNo} />
    </Content>
  );
};

export default Student;
