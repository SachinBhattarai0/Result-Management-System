import React from "react";
import Content from "../../components/content/Content";
import AssignmentCreateOptions from "../../components/Admin/assignmentCreateOptions/AssignmentCreateOptions";

const Assignment = () => {
  return (
    <Content>
      <AssignmentCreateOptions />
      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">To</th>
            <th className="border-2 py-3 px-1">Exam</th>
            <th className="border-2 py-3 px-1">Subject</th>
            <th className="border-2 py-3 px-1">Done</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>

          <tr></tr>
        </tbody>
      </table>
    </Content>
  );
};

export default Assignment;
