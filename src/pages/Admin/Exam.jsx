import React from "react";
import ExamCreateCreteOptions from "../../components/Admin/examCreteOptions/ExamCreateOptions";
import Content from "../../components/content/Content";

const Exam = () => {
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

          <tr></tr>
        </tbody>
      </table>
    </Content>
  );
};

export default Exam;
