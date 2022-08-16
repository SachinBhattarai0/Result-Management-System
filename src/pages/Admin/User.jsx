import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { apiWithJwt } from "../../axios";
import Spinner from "../../components/spinner/Spinner";
import Content from "../../components/content/Content";
import Pagination from "../../components/pagination/Pagination";
import UserCreateCreteOptions from "../../components/Admin/userCreateOpions/UserCreateOptions";

const User = () => {
  const [pageNo, setPageNo] = useState(1);
  const [userState, setUserState] = useState({
    isPending: false,
    pager: {},
    userList: [],
  });

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        setUserState({ ...userState, isPending: true });
        const { data } = await apiWithJwt("/user/get-teachers?page=" + pageNo);
        setUserState({
          ...userState,
          pager: data.pager,
          userList: data.teachers,
          isPending: false,
        });
      } catch (error) {
        setUserState({ ...userState, isPending: false });
        console.log(error);
      }
    };
    fetchUserList();
  }, [pageNo]);
  return (
    <Content>
      <UserCreateCreteOptions />

      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">Name</th>
            <th className="border-2 py-3 px-1">Email</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>
          {userState.userList.map((user, i) => (
            <tr key={i}>
              <td className="border-2 p-1 py-3 text-center">{i + 1}</td>
              <td className="border-2 p-1 py-3 text-center">{user.name}</td>
              <td className="border-2 p-1 py-3 text-center">{user.email}</td>
              <td className="border-2 p-1 py-3 text-center">
                <button className="text-xl ml-2" userid={user._id}>
                  <AiFillEdit className="text-green-700" />
                </button>
                <button className="text-xl ml-2" userid={user._id}>
                  <BiTrash className="text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userState.isPending && <Spinner />}
      <Pagination pager={userState.pager} setPageNo={setPageNo} />
    </Content>
  );
};

export default User;
