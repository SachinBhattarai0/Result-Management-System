import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useModalState } from "../../context/ModalContext";
import { SUCCESS } from "../../context/AlertContext";
import { useAlert } from "../../context/AlertContext";
import Spinner from "../../container/spinner/Spinner";
import Content from "../../container/content/Content";
import Pagination from "../../container/pagination/Pagination";
import ExamCreateCreteOptions from "../../components/examCreteOptions/ExamCreateOptions";

const Exam = () => {
  const navigate = useNavigate();
  const { updateAlert } = useAlert();
  const { showModal, closeModal } = useModalState();
  const [examCreatedOrDeleted, setExamCreatedOrDeleted] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [examState, setExamState] = useState({
    isPending: false,
    pager: {},
    examList: [],
  });

  const deleteExam = async (id) => {
    try {
      setExamState({ ...examState, isPending: true });
      const { data } = await apiWithJwt("/exam/delete/", { id });
      updateAlert(data.message, SUCCESS);
      closeModal();
      //This state change will trigger useEffect to fetch new student list
      setExamCreatedOrDeleted(Math.random());
    } catch (error) {
      console.log(error);
      updateAlert(error.message);
    }
  };

  const handleUpdateButtonClick = (exam) => {
    navigate("/rms/admin/exam/update", { state: exam });
  };

  const handleDeleteButtonClick = (exam) => {
    showModal(
      "Are you sure?",
      "Deleting exam will delete all mark associated to it!",
      () => deleteExam(exam._id)
    );
  };

  useEffect(() => {
    const fetchexamList = async () => {
      try {
        setExamState({ ...examState, isPending: true });
        const { data } = await apiWithJwt(
          "/exam/get-all-paginated?page=" + pageNo
        );
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
  }, [pageNo, examCreatedOrDeleted]);
  return (
    <Content>
      <ExamCreateCreteOptions
        setExamCreatedOrDeleted={setExamCreatedOrDeleted}
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
                  <AiFillEdit
                    className="text-green-700"
                    onClick={() => handleUpdateButtonClick(exam)}
                  />
                </button>
                <button className="text-xl ml-2">
                  <BiTrash
                    className="text-red-700"
                    onClick={() => handleDeleteButtonClick(exam)}
                  />
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
