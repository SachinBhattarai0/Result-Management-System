import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import Spinner from "../../components/spinner/Spinner";
import Content from "../../components/content/Content";
import Pagination from "../../components/pagination/Pagination";
import ExamCreateCreteOptions from "../../components/Admin/examCreteOptions/ExamCreateOptions";

const Exam = () => {
  const [pageNo, setPageNo] = useState(1);
  const [examState, setExamState] = useState({
    isPending: false,
    pager: {},
    examList: [],
  });

  useEffect(() => {
    const fetchexamList = async () => {
      try {
        setExamState({ ...examState, isPending: true });
        const { data } = await apiWithJwt("/exam/get-all?page=" + pageNo);
        setExamState({
          ...examState,
          isPending: false,
          pager: data.pager,
          examList: data.exams,
        });
      } catch (error) {
        setExamState({ ...examState, isPending: false });
        console.log(error);
      }
    };
    fetchexamList();
  }, [pageNo]);
  return (
    <Content>
      <ExamCreateCreteOptions />
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
      {examState.isPending && <Spinner />}

      <Pagination pager={examState.pager} setPageNo={setPageNo} />
    </Content>
  );
};

export default Exam;
