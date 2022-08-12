import React, { useState, useEffect } from "react";
import ExamCreateCreteOptions from "../../components/Admin/examCreteOptions/ExamCreateOptions";
import { apiWithJwt } from "../../axios";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import Content from "../../components/content/Content";

const Exam = () => {
  const [examState, setExamState] = useState({
    isPending: false,
    examList: [],
  });
  console.log(examState);

  useEffect(() => {
    const fetchexamList = async () => {
      try {
        setExamState({ ...examState, isPending: true });
        const { data } = await apiWithJwt("/exam/get-all");
        setExamState({
          ...examState,
          isPending: false,
          examList: data.exams,
        });
      } catch (error) {
        setExamState({ ...examState, isPending: false });
        console.log(error);
      }
    };
    fetchexamList();
  }, []);
  return (
    <Content>
      <ExamCreateCreteOptions
        examState={examState}
        setExamState={setExamState}
      />
      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">Name</th>
            <th className="border-2 py-3 px-1">Date</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>

          {examState.examList.map((exam, i) => (
            <tr key={i}>
              <td className="border-2 p-1 py-3 text-center">{i + 1}</td>
              <td className="border-2 p-1 py-3 text-center">{exam.name}</td>
              <td className="border-2 p-1 py-3 text-center">
                {exam.year}-{exam.month}-{exam.date}
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
    </Content>
  );
};

export default Exam;
