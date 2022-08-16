import React, { useState, useEffect } from "react";
import Content from "../../components/content/Content";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import UserCreateCreteOptions from "../../components/Admin/userCreateOpions/UserCreateOptions";
import { apiWithJwt } from "../../axios";
import Pagination from "../../components/pagination/Pagination";
import Spinner from "../../components/spinner/Spinner";

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
