import React, { useState, useEffect } from "react";
import Content from "../../components/content/Content";
import { apiWithJwt } from "../../axios";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import Spinner from "../../components/spinner/Spinner";
import ClassCreateOptions from "../../components/Admin/classCreateOptions/ClassCreateOptions";

const Assignment = () => {
  const [classState, setClassState] = useState({
    isPending: false,
    classList: [],
  });

  useEffect(() => {
    const fetchClassList = async () => {
      try {
        setClassState({ ...classState, isPending: true });
        const { data } = await apiWithJwt("/class/get-all");
        setClassState({
          ...classState,
          isPending: false,
          classList: data.class,
        });
      } catch (error) {
        setClassState({ ...classState, isPending: false });
        console.log(error);
      }
    };
    fetchClassList();
  }, []);

  return (
    <Content>
      <ClassCreateOptions
        setClassState={setClassState}
        classState={classState}
      />
      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">Name</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>
          {classState.classList.map((_class, i) => (
            <tr key={i}>
              <td className="border-2 p-1 py-3 text-center">{i + 1}</td>
              <td className="border-2 p-1 py-3 text-center">{_class.name}</td>
              <td className="border-2 p-1 py-3 text-center">
                <button className="text-xl ml-2">
                  <AiFillEdit className="text-green-700" />
                </button>
                <button className="text-xl ml-2">
                  <BiTrash className="text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {classState.isPending && <Spinner />}
    </Content>
  );
};

export default Assignment;
