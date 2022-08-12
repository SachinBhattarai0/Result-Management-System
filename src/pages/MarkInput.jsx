import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiWithJwt } from "../axios";
import { SUCCESS, useAlert } from "../context/AlertContext";
import Button from "../components/form/Button";
import Spinner from "../components/spinner/Spinner";
import Content from "../components/content/Content";

const MarkInput = () => {
  const { state: assignment } = useLocation();
  const { updateAlert } = useAlert();
  const ThInputRef = useRef([]);
  const PrInputRef = useRef([]);
  const navigate = useNavigate();
  const [markPending, setMarkPending] = useState(false);
  const [studentList, setStudentList] = useState({
    students: [],
    isPending: false,
  });

  const { _id, class: _class, exam, subject } = assignment;

  const handleSubmit = async () => {
    const theoryMarks = ThInputRef.current
      .slice(0, studentList.students.length)
      .map((i) => i.value);
    const practicalMarks = PrInputRef.current
      .slice(0, studentList.students.length)
      .map((i) => i.value);

    const invalidThMarkIndex = theoryMarks.findIndex(
      (mark) => mark === "" || mark < 0 || mark > subject.theoryMark
    );

    if (invalidThMarkIndex !== -1)
      return updateAlert(
        `Invalid theory mark at index ${
          invalidThMarkIndex + 1
        } !! should be less than 0 and greater than ${subject.theoryMark}`
      );

    const invalidPrMarkIndex = practicalMarks.findIndex(
      (mark) => mark === "" || mark < 0 || mark > subject.practicalMark
    );

    if (invalidPrMarkIndex !== -1)
      return updateAlert(
        `Invalid practical mark at index ${
          invalidPrMarkIndex + 1
        } !! should be less than 0 and greater than ${subject.practicalMark}`
      );

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
        exam: exam._id,
        subject: subject._id,
        class: _class._id,
        marks: studentMarks,
        assignment: _id,
      });
      updateAlert(data.message, SUCCESS);
      navigate("/rms/assignmemt/");
      setMarkPending(false);
    } catch (error) {
      setMarkPending(false);
      console.log(error);
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
          <Button
            onClick={handleSubmit}
            style={{ pointerEvents: markPending ? "none" : "all" }}
          >
            {markPending ? <Spinner /> : "Submit"}
          </Button>
        </div>
      )}
    </Content>
  );
};

export default MarkInput;
