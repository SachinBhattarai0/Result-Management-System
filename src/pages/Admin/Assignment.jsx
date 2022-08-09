import React from "react";
import TopNav from "../../components/Navbar/TopNav";

const Assignment = () => {
  return (
    <>
      <div className="flex flex-col flex-1">
        <TopNav />
        <div className="flex-1 p-1 md:p-5">
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
        </div>
      </div>
    </>
  );
};

export default Assignment;
