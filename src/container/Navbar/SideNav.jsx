import React from "react";
import { BiLogOut } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import { SUCCESS } from "../../context/AlertContext";
import { useNavState } from "../../context/NavContext";
import { useUserState } from "../../context/UserContext";
import { AdminNavContent } from "../navContent/AdminNavContent";
import { TeachersNavContent } from "../../container/navContent/TeachersNavContent";

const Navbar = () => {
  const { navState } = useNavState();
  const { logOut, userInfo } = useUserState();
  const { updateAlert } = useAlert();

  const handleLogout = () => {
    logOut();
    updateAlert("Logout Successfully!!", SUCCESS);
  };

  return (
    <>
      <nav
        className={`relative flex flex-col p-2 font-roboto bg-blue-800 text-gray-100 h-screen transition-all overflow-hidden ${
          navState.open ? "w-60" : "w-0 md:w-14"
        }`}
      >
        {userInfo.role === "teacher" ? (
          <TeachersNavContent />
        ) : (
          <AdminNavContent />
        )}
      </nav>

      <ul
        className={`absolute bottom-0 left-0 text-gray-200 w-60 ${
          navState.open ? "w-60" : "w-0 md:w-14"
        }`}
      >
        <li className="text-lg cursor-pointer w-full">
          <div
            to="/rms/dashboard/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
            onClick={handleLogout}
          >
            <BiLogOut className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>Log Out</span>
          </div>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Navbar;
