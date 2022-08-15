import React, { useState, useEffect } from "react";
import Content from "../../components/content/Content";
import { apiWithJwt } from "../../axios/index";
import Spinner from "../../components/spinner/Spinner";
import SubjectCreateOptions from "../../components/Admin/subjectCreateOptions/SubjectCreateOptions";
import Popover from "../../components/popovers/Popover";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

const Subject = () => {
  const [subjectState, setSubjectState] = useState({
    isPending: false,
    subjectList: [],
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setSubjectState({ ...subjectState, isPending: true });
        const { data } = await apiWithJwt("/subject/get-all/");
        setSubjectState({
          ...subjectState,
          isPending: false,
          subjectList: data.subjects,
        });
      } catch (error) {
        setSubjectState({ ...subjectState, isPending: false });
        console.log(error);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <Content>
      <SubjectCreateOptions
        subjectState={subjectState}
        setSubjectState={setSubjectState}
      />
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

          {subjectState.subjectList.map((subject, i) => {
            return (
              <tr key={i}>
                <td className="border-2 py-3 px-1 text-center">{i + 1}</td>
                <td className="border-2 py-3 px-1 text-center">
                  {subject.name}
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {subject.theoryMark}
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {subject.practicalMark}
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {subject.passMark}
                </td>
                <td className="border-2 py-3 px-1 text-xs text-center flex flex-col">
                  <Popover>
                    {subject.class.map((c, i) => (
                      <span key={i}>{c.name},</span>
                    ))}
                  </Popover>
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {" "}
                  <button className="text-xl ml-2">
                    <AiFillEdit className="text-green-700" />
                  </button>
                  <button className="text-xl ml-2">
                    <BiTrash className="text-red-700" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {subjectState.isPending && <Spinner />}
    </Content>
  );
};

export default Subject;
