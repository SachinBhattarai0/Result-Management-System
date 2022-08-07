import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../context/UserContext";
import TopNav from "../components/Navbar/TopNav";
import { apiWithJwt } from "../axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserState();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const getUserAssignments = async () => {
      try {
        const { data } = await apiWithJwt("/assignment/list");
        setAssignments([...data.assignments]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserAssignments();
  }, []);

  useEffect(() => {
    if (!userInfo.isAuthenticated) navigate("/sign-in/", { replace: true });
  }, [userInfo.isAuthenticated]);

  return (
    <div className="flex flex-col flex-1">
      <TopNav />
      <div className="flex-1 p-5">
        <table className="bg-white w-full rounded shadow-sm">
          <tbody>
            <tr>
              <th className="border-2 py-3 px-1">#</th>
              <th className="border-2 py-3 px-1">Exam</th>
              <th className="border-2 py-3 px-1">Class</th>
              <th className="border-2 py-3 px-1">Subject</th>
              <th className="border-2 py-3 px-1">Action</th>
            </tr>

            {assignments.map((assignment, index) => {
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
                    <button className="bg-blue-900 text-white hover:bg-blue-800 px-2 py-1 rounded">
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
