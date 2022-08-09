import React, { useState } from "react";
import TopNav from "../../components/Navbar/TopNav";
import Button from "../../components/form/Button";
import ReportCardFilter from "../../components/Admin/reportCardFilter/ReportCardFilter";

const ReportCard = () => {
  const [studentList, setStudentList] = useState({
    students: [],
    isPending: false,
  });

  return (
    <div className="flex flex-col flex-1">
      <TopNav />
      <div className="flex-1 p-1 md:p-5 flex flex-col md:flex-row-reverse">
        <ReportCardFilter
          studentList={studentList}
          setStudentList={setStudentList}
        />

        <div className="md:flex-7">
          <table className="bg-white w-full rounded shadow-sm">
            <tbody>
              <tr>
                <th className="border-2 py-3 ">#</th>
                <th className="border-2 py-3 ">Student</th>
                <th className="border-2 py-3 ">Action</th>
              </tr>

              {studentList.students.map(({ student }) => (
                <tr key={student._id}>
                  <td className="border-2 p-1 text-center">{student.rollNo}</td>
                  <td className="border-2 p-1 text-center">{student.name}</td>
                  <td className="border-2 p-1 text-center">
                    <Button sm variant={"darkBlue"}>
                      view
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
