import React from "react";
import { useState } from "react";
import { fetchWithJwt } from "../../../utils/utils";
import { downloadFromBlob } from "../../../utils/utils";
import { useAlert } from "../../../context/AlertContext";
import Spinner from "../../spinner/Spinner";
import Button from "../../form/Button";

const StudentListForReportCard = ({ filterInfo, student, index }) => {
  const { updateAlert } = useAlert();
  const [isDownloadPending, setIsDownloadPending] = useState(false);

  const downloadReportCardForStudent = async (student) => {
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
    <tr key={student.id}>
      <td className="border-2 p-1 py-3 text-center">{index + 1}</td>
      <td className="border-2 p-1 py-3 text-center">{student.name}</td>
      <td className="border-2 p-1 py-3 text-center">{student.rollNo}</td>
      <td className="border-2 p-1 py-3 text-center">
        <Button
          sm
          variant={"darkBlue"}
          onClick={() => downloadReportCardForStudent(student.id)}
          isPending={isDownloadPending}
        >
          {isDownloadPending ? <Spinner /> : "View"}
        </Button>
      </td>
    </tr>
  );
};

export default StudentListForReportCard;
