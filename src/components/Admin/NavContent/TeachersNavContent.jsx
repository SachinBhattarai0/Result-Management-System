import React from "react";
import {
  MdAssignment,
  MdAssignmentTurnedIn,
  MdOutlineAssignment,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useNavState } from "../../../context/NavContext";

export const TeachersNavContent = () => {
  const { navState } = useNavState();

  return (
    <>
      <div>
        <h2 className={`text-xl ml-3 ${!navState.open && "hidden"}`}>SES</h2>
      </div>
      <ul className="mt-4">
        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/assignment/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <MdOutlineAssignment className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>Assignments</span>
          </NavLink>
        </li>
        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/assignment/completed-assignments/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <MdAssignment className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>Completed</span>
          </NavLink>
        </li>
        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/assignment/my-info/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <MdAssignmentTurnedIn className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>My Info</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};
