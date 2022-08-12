import React from "react";
import Content from "../../components/content/Content";
import ClassCreateOptions from "../../components/Admin/classCreateOptions/ClassCreateOptions";

const Assignment = () => {
  return (
    <Content>
      <ClassCreateOptions />
      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">Name</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>

          <tr></tr>
        </tbody>
      </table>
    </Content>
  );
};

export default Assignment;
