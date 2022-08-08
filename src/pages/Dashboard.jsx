import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../context/UserContext";
import TopNav from "../components/Navbar/TopNav";
import { apiWithJwt } from "../axios";
import { Link } from "react-router-dom";
import Button from "../components/form/Button";
import Spinner from "../components/spinner/Spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserState();
  const [assignmentState, setAssignmentState] = useState({
    assignments: [],
    isPending: false,
  });

  useEffect(() => {
    const getUserAssignments = async () => {
      try {
        setAssignmentState({ ...assignmentState, isPending: true });

        const { data } = await apiWithJwt("/assignment/list");
        setAssignmentState({
          assignments: [...data.assignments],
          isPending: false,
        });
      } catch (error) {
        setAssignmentState({ ...assignmentState, isPending: false });
        console.log(error);
      }
    };

    getUserAssignments();
  }, []);

  useEffect(() => {
    if (!userInfo.isAuthenticated) navigate("/sign-in/", { replace: true });
  }, [userInfo.isAuthenticated]);
  console.log("createdAt");

  return (
    <div className="flex flex-col flex-1">
      <TopNav />
      <div className="flex-1 p-1 md:p-5">
        <table className="bg-white w-full rounded shadow-sm">
          <tbody>
            <tr>
              <th className="border-2 py-3 px-1">#</th>
              <th className="border-2 py-3 px-1">Exam</th>
              <th className="border-2 py-3 px-1">Class</th>
              <th className="border-2 py-3 px-1">Subject</th>
              <th className="border-2 py-3 px-1">Action</th>
            </tr>

            {assignmentState.assignments.map((assignment, index) => {
              const { _id, exam, class: _class, subject } = assignment;

              return (
                <tr key={_id}>
                  <td className="border-2 py-3 px-1 text-center">
                    {index + 1}
                  </td>
                  <td className="border-2 py-3 px-1 text-center">
                    {exam.year}-{exam.month}-{exam.date}
                  </td>
                  <td className="border-2 py-3 px-1 text-center">
                    {_class.name}
                  </td>
                  <td className="border-2 py-3 px-1 text-center">
                    {subject.name}
                  </td>
                  <td className="border-2 py-3 px-1 text-center">
                    <Link to={`/rms/assignment/${_id}/`} state={assignment}>
                      <Button sm>view</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {assignmentState.isPending && <Spinner h="h-28" w="w-28" />}
      </div>
    </div>
  );
};

export default Dashboard;
