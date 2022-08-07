import React from "react";
import { Outlet } from "react-router-dom";
import { MdAssignment, MdAssignmentTurnedIn } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { useNavState } from "../../context/NavContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { navState } = useNavState();
  return (
    <>
      <nav
        className={`relative flex flex-col p-2 font-roboto bg-blue-800 text-gray-100 h-screen transition-all ${
          navState.open ? "w-60" : "w-0 md:w-14"
        }`}
      >
        <div>
          <h2 className={`text-xl ml-3 ${!navState.open && "hidden"}`}>SES</h2>
        </div>
        <ul className="mt-4">
          <li className="text-lg cursor-pointer">
            <NavLink
              style={({ isActive }) =>
                isActive ? { background: "rgba(30,58,138,0.9)" } : undefined
              }
              to="/rms/dashboard/"
              className="flex space-x-1 items-center hover:bg-blue-900 p-2"
            >
              <CgDetailsMore className="text-xl" />
              <span className={`${!navState.open && "hidden"}`}>
                Assignments
              </span>
            </NavLink>
          </li>
          <li className="text-lg cursor-pointer">
            <NavLink
              style={({ isActive }) =>
                isActive ? { background: "rgba(30,58,138,0.9)" } : undefined
              }
              to="/rms/dashboard/completed-assignments/"
              className="flex space-x-1 items-center hover:bg-blue-900 p-2"
            >
              <MdAssignment className="text-xl" />
              <span className={`${!navState.open && "hidden"}`}>Completed</span>
            </NavLink>
          </li>
          <li className="text-lg cursor-pointer">
            <NavLink
              style={({ isActive }) =>
                isActive ? { background: "rgba(30,58,138,0.9)" } : undefined
              }
              to="/rms/dashboard/my-info/"
              className="flex space-x-1 items-center hover:bg-blue-900 p-2"
            >
              <MdAssignmentTurnedIn className="text-xl" />
              <span className={`${!navState.open && "hidden"}`}>My Info</span>
            </NavLink>
          </li>

          <li className="text-lg cursor-pointer absolute bottom-0 left-0 w-full">
            <NavLink
              style={({ isActive }) =>
                isActive ? { background: "rgba(30,58,138,0.9)" } : undefined
              }
              to="/rms/dashboard/"
              className="flex space-x-1 items-center hover:bg-blue-900 p-2"
            >
              <BiLogOut className="text-xl" />
              <span className={`${!navState.open && "hidden"}`}>Log Out</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
