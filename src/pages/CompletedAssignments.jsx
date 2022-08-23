import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiWithJwt } from "../axios";
import { Link } from "react-router-dom";
import Spinner from "../container/spinner/Spinner";
import Button from "../container/form/Button";
import Content from "../container/content/Content";
import Pagination from "../container/pagination/Pagination";

const CompletedAssignments = () => {
  const [pageNo, setPageNo] = useState(1);
  const [assignmentState, setAssignmentState] = useState({
    assignmentList: [],
    pager: {},
    isPending: false,
  });

  useEffect(() => {
    setAssignmentState({ ...assignmentState, isPending: true });
    const fetchAssignmentList = async () => {
      try {
        const { data } = await apiWithJwt("/assignment/list?page=" + pageNo, {
          completed: true,
        });
        setAssignmentState({
          ...assignmentState,
          isPending: false,
          pager: data.pager,
          assignmentList: data.assignments,
        });
      } catch (error) {
        console.log(error);
        setAssignmentState({ isPending: false });
      }
    };
    fetchAssignmentList();
  }, [pageNo]);

  return (
    <Content>
      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">Exam</th>
            <th className="border-2 py-3 px-1">Class</th>
            <th className="border-2 py-3 px-1">Subject</th>
            {/* <th className="border-2 py-3 px-1">Action</th> */}
          </tr>

          {assignmentState.assignmentList.map((assignment, index) => {
            const { _id, exam, class: _class, subject } = assignment;

            return (
              <tr key={_id}>
                <td className="border-2 py-3 px-1 text-center">{index + 1}</td>
                <td className="border-2 py-3 px-1 text-center">
                  {exam.year}-{exam.month}-{exam.date}
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {_class.name}
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {subject.name}
                </td>
                {/* <td className="border-2 py-3 px-1 text-center">
                  <Link to={`/rms/`} state={assignment}>
                    <Button sm>view</Button>
                  </Link>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {assignmentState.isPending && <Spinner />}
      <Pagination setPageNo={setPageNo} pager={assignmentState.pager} />
    </Content>
  );
};

export default CompletedAssignments;
