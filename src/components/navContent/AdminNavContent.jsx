import React from "react";
import { TbReportSearch, TbSchool } from "react-icons/tb";
import { MdChecklist, MdOutlineAssignment } from "react-icons/md";
import { BiBookAlt, BiUser } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavState } from "../../context/NavContext";

export const AdminNavContent = () => {
  const { navState } = useNavState();

  return (
    <>
      <div>
        <h2 className={`text-xl ml-3 ${!navState.open && "hidden"}`}>
          SES ADMIN
        </h2>
      </div>

      <ul className="mt-4">
        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/admin/dashboard/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <AiOutlineDashboard className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>Dashboard</span>
          </NavLink>
        </li>
        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/admin/assignment/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <MdOutlineAssignment className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>Assignments</span>
          </NavLink>
        </li>
        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/admin/report-card/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <TbReportSearch className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>ReportCard</span>
          </NavLink>
        </li>
        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/admin/class/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <SiGoogleclassroom className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>Class</span>
          </NavLink>
        </li>
        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/admin/exam/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <TbSchool className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>Exam</span>
          </NavLink>
        </li>
        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/admin/mark/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <MdChecklist className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>Mark</span>
          </NavLink>
        </li>
        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/admin/subject/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <BiBookAlt className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>Subject</span>
          </NavLink>
        </li>

        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/admin/user/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <BiUser className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>User</span>
          </NavLink>
        </li>

        <li className="text-lg cursor-pointer">
          <NavLink
            to="/rms/admin/student/"
            className="flex space-x-1 items-center hover:bg-blue-900 p-2"
          >
            <FaUserGraduate className="text-xl" />
            <span className={`${!navState.open && "hidden"}`}>Student</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};
