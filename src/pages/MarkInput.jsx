import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiWithJwt } from "../axios";
import { SUCCESS, useAlert } from "../context/AlertContext";
import Button from "../components/form/Button";
import Spinner from "../components/spinner/Spinner";
import Content from "../components/content/Content";

const MarkInput = () => {
  const navigate = useNavigate();
  const ThInputRef = useRef([]);
  const PrInputRef = useRef([]);
  const { updateAlert } = useAlert();
  const { state: assignment } = useLocation();
  const [markPending, setMarkPending] = useState(false);
  const [studentList, setStudentList] = useState({
    students: [],
    isPending: false,
  });

  const { _id, class: _class, subject } = assignment;

  const handleSubmit = async () => {
    const theoryMarks = ThInputRef.current
      .slice(0, studentList.students.length)
      .map((i) => i.value);
    const practicalMarks = PrInputRef.current
      .slice(0, studentList.students.length)
      .map((i) => i.value);

    const studentMarks = theoryMarks.map((_, i) => {
      return {
        student: studentList.students[i]._id,
        theoryMark: theoryMarks[i],
        practicalMark: practicalMarks[i],
      };
    });

    try {
      setMarkPending(true);
      const { data } = await apiWithJwt("/mark/create/", {
        marks: studentMarks,
        assignment: _id,
      });
      updateAlert(data.message, SUCCESS);

      navigate("/rms/assignment/", { replace: true });
    } catch (error) {
      setMarkPending(false);
      updateAlert(error.response.data.message);
    }
  };

  const handleKeyDownOnThInput = ({ target, key }, i) => {
    if (key === "Enter") PrInputRef.current[i]?.focus();

    if (key === "Backspace" && target.value === "")
      PrInputRef.current[i - 1]?.focus();
  };
  const handleKeyDownOnPrInput = ({ target, key }, i) => {
    if (key === "Enter") ThInputRef.current[i + 1]?.focus();

    if (key === "Backspace" && target.value === "")
      ThInputRef.current[i]?.focus();
  };

  useEffect(() => {
    const getStudentList = async () => {
      try {
        setStudentList({ ...studentList, isPending: true });
        const { data } = await apiWithJwt("/assignment/student-list/", {
          assignmentId: _id,
        });
        setStudentList({
          ...studentList,
          students: data.students,
          isPending: false,
        });
      } catch (error) {
        setStudentList({ ...studentList, isPending: false });
        console.log(error);
      }
    };

    getStudentList();
  }, []);
  return (
    <Content>
      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1" rowSpan={2}>
              RollNo
            </th>
            <th className="border-2 py-3 px-1" rowSpan={2}>
              Name
            </th>
            <th className="border-2 py-3 px-1" colSpan={2}>
              Marks
            </th>
          </tr>
          <tr>
            <td className="border-2 py-3 px-1 text-center">Theory</td>
            <td className="border-2 py-3 px-1 text-center">Practical</td>
          </tr>

          {studentList.students.map((student, i) => (
            <tr key={student._id}>
              <td className="border-2 py-3 px-1 text-center">
                {student.rollNo}
              </td>
              <td className="border-2 py-3 px-1 text-center">{student.name}</td>
              <td className="border-2 py-3 px-1 text-center">
                <input
                  ref={(ref) => ThInputRef.current.push(ref)}
                  onKeyDown={(e) => handleKeyDownOnThInput(e, i)}
                  type="number"
                  min={0}
                  max={subject.theoryMark}
                  className="w-16 px-2 py-1 outline-none border border-gray-300 rounded-sm"
                />
              </td>
              <td className="border-2 py-3 px-1 text-center">
                <input
                  ref={(ref) => PrInputRef.current.push(ref)}
                  onKeyDown={(e) => handleKeyDownOnPrInput(e, i)}
                  type="number"
                  min={0}
                  max={subject.PracticalMark}
                  className="w-16 px-2 py-1 outline-none border border-gray-300 rounded-sm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {studentList.isPending ? (
        <Spinner h="h-28" w="w-28" />
      ) : (
        <div className="py-1 flex flex-col">
          <Button onClick={handleSubmit} isPending={markPending}>
            {markPending ? <Spinner /> : "Submit"}
          </Button>
        </div>
      )}
    </Content>
  );
};

export default MarkInput;
