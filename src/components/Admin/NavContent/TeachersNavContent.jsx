import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineAssignment } from "react-icons/md";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { useNavState } from "../../../context/NavContext";
import { AiOutlineSetting } from "react-icons/ai";
import NavListItem from "../../Navbar/NavlistItem";

export const TeachersNavContent = () => {
  const { navState } = useNavState();

  return (
    <>
      <div>
        <h2 className={`text-xl ml-3 ${!navState.open && "hidden"}`}>SES</h2>
      </div>
      <ul className="mt-4">
        <NavListItem to="/rms/assignment/" icon={<MdOutlineAssignment />}>
          Assignments
        </NavListItem>

        <NavListItem
          to="/rms/assignment/completed/"
          icon={<MdAssignmentTurnedIn />}
        >
          Completed
        </NavListItem>

        <NavListItem to="/rms/user/" icon={<AiOutlineSetting />}>
          Settings
        </NavListItem>
      </ul>
    </>
  );
};
