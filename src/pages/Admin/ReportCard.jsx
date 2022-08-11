import React, { useState } from "react";
import TopNav from "../../components/Navbar/TopNav";
import Button from "../../components/form/Button";
import ReportCardFilter from "../../components/Admin/reportCardFilter/ReportCardFilter";
import { useAlert } from "../../context/AlertContext";
import { downloadFromBlob, fetchWithJwt } from "../../utils/utils";

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
      const res = await fetchWithJwt("/pdf/marksheet/student/", {
        class: _class,
        exams,
        student,
      });

      const blob = await res.blob();
      downloadFromBlob(blob);

      setIsDownloadPending(false);
    } catch (error) {
      updateAlert(error.message);
      setIsDownloadPending(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <TopNav />
      <div className="md:max-h-9/10 overflow-y-scroll relative flex flex-col top-20">
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
                  <th className="border-2 py-3 ">#</th>
                  <th className="border-2 py-3 ">Student</th>
                  <th className="border-2 py-3 ">Action</th>
                </tr>

                {studentList.students.map(({ student }) => (
                  <tr key={student._id}>
                    <td className="border-2 p-1 py-3 text-center">
                      {student.rollNo}
                    </td>
                    <td className="border-2 p-1 py-3 text-center">
                      {student.name}
                    </td>
                    <td className="border-2 p-1 py-3 text-center">
                      <Button
                        sm
                        variant={"darkBlue"}
                        std_id={student._id}
                        onClick={downloadReportCardForStudent}
                        style={{
                          pointerEvents: isDownloadPending ? "none" : "all",
                        }}
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
      </div>
    </div>
  );
};

export default ReportCard;
