import React from "react";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import MarkDetails from "../markDetails/MarkDetails";

const MarkListItem = ({ mark }) => {
  const [markItemOpen, setMarkItemOpen] = useState(false);
  return (
    <div className="rounded border-gray-400 border p-3">
      <div className="flex items-center space-x-5 flex-wrap">
        <div>
          {markItemOpen ? (
            <IoMdArrowDropdown
              className="text-3xl text-gray-500 cursor-pointer"
              onClick={() => setMarkItemOpen(!markItemOpen)}
            />
          ) : (
            <IoMdArrowDropright
              className="text-3xl text-gray-500 cursor-pointer"
              onClick={() => setMarkItemOpen(!markItemOpen)}
            />
          )}
        </div>
        <div>
          Exam: {mark.exam.name}({mark.exam.year}-{mark.exam.month}-
          {mark.exam.date})
        </div>
        <div>Class: {mark.class.name}</div>
        <div>Name: {mark.student.name}</div>
      </div>
      {markItemOpen && <MarkDetails markId={mark._id} marks={mark.marks} />}
    </div>
  );
};

export default MarkListItem;
