import React from "react";
import TopNav from "../../components/Navbar/TopNav";

const Exam = () => {
  return (
    <>
      <div className="flex flex-col flex-1">
        <TopNav />
        <div className="flex-1 p-1 md:p-5">Exam Content</div>
      </div>
    </>
  );
};

export default Exam;
