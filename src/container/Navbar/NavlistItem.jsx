import React from "react";
import { NavLink } from "react-router-dom";
import { useNavState } from "../../context/NavContext";

const NavListItem = ({ icon, to, children }) => {
  const { navState, closeNavState } = useNavState();
  return (
    <li className="text-lg cursor-pointer">
      <NavLink
        to={to}
        onClick={closeNavState}
        className="flex space-x-1 items-center hover:bg-blue-900 p-2"
      >
        {icon}
        <span className={`${!navState.open && "hidden"}`}>{children}</span>
      </NavLink>
    </li>
  );
};

export default NavListItem;
