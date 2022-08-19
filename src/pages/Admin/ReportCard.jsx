import React from "react";
import { useState } from "react";
import { fetchWithJwt } from "../../utils/utils";
import { downloadFromBlob } from "../../utils/utils";
import { useAlert } from "../../context/AlertContext";
import Button from "../../components/form/Button";
import Content from "../../components/content/Content";
import ReportCardFilter from "../../components/Admin/reportCardFilter/ReportCardFilter";

const ReportCard = () => {
  const { updateAlert } = useAlert();
  const [isDownloadPending, setIsDownloadPending] = useState(false);
  const [studentList, setStudentList] = useState({
    students: [],
    isPending: false,
  });

  const [filterInfo, setFilterInfo] = useState({
    class: "",
    exams: [{ exam: "", percentage: 100 }],
    noOfExam: 1,
  });

  const downloadReportCardForStudent = async (e) => {
    const student = e.target.getAttribute("std_id");
    const { class: _class, exams } = filterInfo;

    setIsDownloadPending(true);
    try {
      const res = await fetchWithJwt("/pdf/marksheet/student", {
        class: _class,
        exams,
        student,
      });

      const blob = await res.blob();
      downloadFromBlob(blob);

      setIsDownloadPending(false);
    } catch (error) {
      error = await error.json();
      updateAlert(error.message);
      setIsDownloadPending(false);
    }
  };

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
                <tr key={student.id}>
                  <td className="border-2 p-1 py-3 text-center">{i + 1}</td>
                  <td className="border-2 p-1 py-3 text-center">
                    {student.name}
                  </td>
                  <td className="border-2 p-1 py-3 text-center">
                    {student.rollNo}
                  </td>
                  <td className="border-2 p-1 py-3 text-center">
                    <Button
                      sm
                      variant={"darkBlue"}
                      std_id={student.id}
                      onClick={downloadReportCardForStudent}
                      isPending={isDownloadPending}
                    >
                      view
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Content>
  );
};

export default ReportCard;
