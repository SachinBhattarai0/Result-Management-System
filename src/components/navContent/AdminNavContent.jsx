import React from "react";
import { BiUser } from "react-icons/bi";
import { TbSchool } from "react-icons/tb";
import { BiBookAlt } from "react-icons/bi";
import { MdChecklist } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineAssignment } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import NavListItem from "../Navbar/NavlistItem";
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
        <NavListItem
          to="/rms/admin/dashboard/"
          icon={<AiOutlineDashboard className="text-xl" />}
        >
          Dashboard
        </NavListItem>
        <NavListItem
          to="/rms/admin/assignment/"
          icon={<MdOutlineAssignment className="text-xl" />}
        >
          Assignments
        </NavListItem>
        <NavListItem
          to="/rms/admin/report-card/"
          icon={<TbReportSearch className="text-xl" />}
        >
          ReportCard
        </NavListItem>
        <NavListItem
          to="/rms/admin/class/"
          icon={<SiGoogleclassroom className="text-xl" />}
        >
          Class
        </NavListItem>
        <NavListItem
          to="/rms/admin/exam/"
          icon={<TbSchool className="text-xl" />}
        >
          Exam
        </NavListItem>
        <NavListItem
          to="/rms/admin/mark/"
          icon={<MdChecklist className="text-xl" />}
        >
          Mark
        </NavListItem>
        <NavListItem
          to="/rms/admin/subject/"
          icon={<BiBookAlt className="text-xl" />}
        >
          Subject
        </NavListItem>
        <NavListItem
          to="/rms/admin/user/"
          icon={<BiUser className="text-xl" />}
        >
          User
        </NavListItem>
        <NavListItem
          to="/rms/admin/student/"
          icon={<FaUserGraduate className="text-xl" />}
        >
          Student
        </NavListItem>
        <NavListItem
          to="/rms/admin/my-info/"
          icon={<AiOutlineSetting className="text-xl" />}
        >
          Settings
        </NavListItem>
      </ul>
    </>
  );
};
