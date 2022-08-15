import React, { useState, useEffect } from "react";
import Content from "../../components/content/Content";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { apiWithJwt } from "../../axios";
import Spinner from "../../components/spinner/Spinner";
import StudentCreateOptions from "../../components/Admin/studentCreateOptions/StudentCreateOptions";

const Student = () => {
  const [studentState, setStudentState] = useState({
    isPending: false,
    studentList: [],
  });
  console.log(studentState);
  useEffect(() => {
    const fetchstudentList = async () => {
      try {
        setStudentState({ ...studentState, isPending: true });
        const { data } = await apiWithJwt("/user/get-students");
        setStudentState({
          ...studentState,
          studentList: data.students,
          isPending: false,
        });
      } catch (error) {
        setStudentState({ ...studentState, isPending: false });
        console.log(error);
      }
    };
    fetchstudentList();
  }, []);
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

          {studentState.studentList.map((student, i) => (
            <tr key={i}>
              <td className="border-2 py-3 px-1 text-center">
                {student.rollNo}
              </td>
              <td className="border-2 py-3 px-1 text-center">{student.name}</td>
              <td className="border-2 py-3 px-1 text-center">
                {student.class.name}
              </td>
              <td className="border-2 py-3 px-1 text-center text-xs">
                {student.subjects.map((sub, i) => (
                  <span key={i}>{sub.name} ,</span>
                ))}
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
    </Content>
  );
};

export default Student;
