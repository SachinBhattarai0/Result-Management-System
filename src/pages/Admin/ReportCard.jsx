import React from "react";
import { useState } from "react";
import Content from "../../container/content/Content";
import ReportCardFilter from "../../components/reportCardFilter/ReportCardFilter";
import StudentListForReportCard from "../../components/studentRowForReportCard/studentRowForReportCard";

const ReportCard = () => {
  const [studentList, setStudentList] = useState({
    students: [],
    isPending: false,
  });

  const [filterInfo, setFilterInfo] = useState({
    class: "",
    exams: [{ exam: "", percentage: 100 }],
    noOfExam: 1,
  });

  return (
    <Content>
      <div className="flex-1 p-1 md:p-5 flex flex-col md:flex-row-reverse">
        <ReportCardFilter
          studentList={studentList}
          setStudentList={setStudentList}
          filterInfo={filterInfo}
          setFilterInfo={setFilterInfo}
        />

        <div className="md:flex-7">
          <table className="bg-white w-full rounded shadow-sm">
            <tbody>
              <tr>
                <th className="border-2 py-3">#</th>
                <th className="border-2 py-3">Student</th>
                <th className="border-2 py-3">RollNo</th>
                <th className="border-2 py-3">Action</th>
              </tr>

              {studentList.students.map((student, i) => (
                <StudentListForReportCard
                  filterInfo={filterInfo}
                  student={student}
                  index={i}
                  key={i}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Content>
  );
};

export default ReportCard;
