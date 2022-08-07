import React from "react";
import { Outlet } from "react-router-dom";
import { MdAssignment, MdAssignmentTurnedIn } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavState } from "../../context/NavContext";

const Navbar = () => {
  const { navState, toggleNavState } = useNavState();
  return (
    <>
      <nav
        className={`relative flex flex-col p-2 font-roboto bg-blue-800 text-gray-100 h-screen transition-all ${
          navState.open ? "w-60" : "w-14"
        }`}
      >
        <div
          className={`flex items-center ${
            !navState.open ? "justify-center" : "justify-between"
          }`}
        >
          <h2 className={`text-xl ${!navState.open && "hidden"}`}>
            RMS Dashboard
          </h2>
          <GiHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={toggleNavState}
          />
        </div>
        <ul className="mt-4">
          <li className="p-2 text-lg cursor-pointer hover:bg-blue-900">
            <div className="flex space-x-1 items-center">
              <CgDetailsMore className="text-xl" />
              <span className={`${!navState.open && "hidden"}`}>
                Assignments
              </span>
            </div>
          </li>
          <li className="p-2 text-lg cursor-pointer hover:bg-blue-900">
            <div className="flex space-x-1 items-center">
              <MdAssignment className="text-xl" />
              <span className={`${!navState.open && "hidden"}`}>Completed</span>
            </div>
          </li>
          <li className="p-2 text-lg cursor-pointer hover:bg-blue-900">
            <div className="flex space-x-1 items-center">
              <MdAssignmentTurnedIn className="text-xl" />
              <span className={`${!navState.open && "hidden"}`}>My Info</span>
            </div>
          </li>

          <li className="p-2 text-lg cursor-pointer hover:bg-blue-900 absolute bottom-0 left-0 w-full">
            <div className="flex space-x-1 items-center">
              <BiLogOut className="text-xl" />
              <span className={`${!navState.open && "hidden"}`}>Log Out</span>
            </div>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
