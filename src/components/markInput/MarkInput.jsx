import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { apiWithJwt } from "../../axios";
import { useAlert } from "../../context/AlertContext";
import Button from "../form/Button";
import TopNav from "../Navbar/TopNav";

const MarkInput = () => {
  const { state: assignment } = useLocation();
  const { updateAlert } = useAlert();
  const ThInputRef = useRef([]);
  const PrInputRef = useRef([]);
  const [studentList, setStudentList] = useState({
    students: [],
    isPending: false,
  });

  const { _id, class: _class, exam, subject, createdAt } = assignment;

  const handleSubmit = () => {
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

    // theoryMark
    // practicalMark
    //Submit mark to backend
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
    <div className="flex flex-col flex-1">
      <TopNav />
      <div className="flex-1 p-5">
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
                <td className="border-2 py-3 px-1 text-center">
                  {student.name}
                </td>
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
        <div className="py-1 flex flex-col">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default MarkInput;
