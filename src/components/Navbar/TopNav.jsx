import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavState } from "../../context/NavContext";

const TopNav = () => {
  const { navState, toggleNavState } = useNavState();

  return (
    <div className="p-5 flex items-center space-x-2 shadow-md bg-white absolute top-0 w-full">
      <GiHamburgerMenu
        className="text-2xl cursor-pointer text-gray-700"
        onClick={toggleNavState}
      />
      <h2 className={`text-lg ${navState.open && "hidden md:block"}`}>
        RMS Dashboard
      </h2>
    </div>
  );
};

export default TopNav;
