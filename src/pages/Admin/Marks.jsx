import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import Content from "../../components/content/Content";

const Marks = () => {
  return (
    <Content>
      <div className="flex-1 p-1 md:p-5 flex flex-col">
        <div>filter</div>

        <div className="md:flex-7">
          <table className="bg-white w-full rounded shadow-sm">
            <tbody>
              <tr>
                <th className="border-2 py-3">#</th>
                <th className="border-2 py-3">Student</th>
                <th className="border-2 py-3">Class</th>
                <th className="border-2 py-3">RollNo</th>
                <th className="border-2 py-3">Exam</th>
                <th className="border-2 py-3">Action</th>
              </tr>

              <tr>
                <td className="border-2 py-3 text-center">1</td>
                <td className="border-2 py-3 text-center">Johd Doe</td>
                <td className="border-2 py-3 text-center">12</td>
                <td className="border-2 py-3 text-center">13</td>
                <td className="border-2 py-3 text-center">2022-02-11</td>
                <td className="border-2 p-1 py-3 text-center">
                  <button className="text-xl ml-2">
                    <AiFillEdit className="text-green-700" />
                  </button>
                  <button className="text-xl ml-2">
                    <BiTrash className="text-red-700" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Content>
  );
};

export default Marks;
