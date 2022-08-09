import React from "react";
import TopNav from "../../components/Navbar/TopNav";
import Button from "../../components/form/Button";
import ReportCardFilter from "../../components/Admin/reportCardFilter/ReportCardFilter";

const ReportCard = () => {
  return (
    <div className="flex flex-col flex-1">
      <TopNav />
      <div className="flex-1 p-1 md:p-5 flex flex-col md:flex-row-reverse">
        <ReportCardFilter />

        <div className="md:flex-7">
          <table className="bg-white w-full rounded shadow-sm">
            <tbody>
              <tr>
                <th className="border-2 py-3 px-1">#</th>
                <th className="border-2 py-3 px-1">Student</th>
                <th className="border-2 py-3 px-1">Action</th>
              </tr>

              <tr>
                <td className="border-2 py-3 px-1 text-center">1</td>
                <td className="border-2 py-3 px-1 text-center">
                  Suban Choudhary
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  <Button sm variant={"darkBlue"}>
                    view
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
