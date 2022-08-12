import React from "react";
import Content from "../../components/content/Content";
import SubjectCreateOptions from "../../components/Admin/subjectCreateOptions/SubjectCreateOptions";

const Subject = () => {
  return (
    <Content>
      <SubjectCreateOptions />
      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">Name</th>
            <th className="border-2 py-3 px-1">ThMark</th>
            <th className="border-2 py-3 px-1">PrMark</th>
            <th className="border-2 py-3 px-1">PassMark</th>
            <th className="border-2 py-3 px-1">Classes</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>

          <tr></tr>
        </tbody>
      </table>
    </Content>
  );
};

export default Subject;
