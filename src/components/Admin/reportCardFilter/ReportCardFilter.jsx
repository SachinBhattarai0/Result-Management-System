import React from "react";
import Select from "../../form/Select";
import Button from "../../form/Button";

const ReportCardFilter = () => {
  return (
    <div className="md:flex-3 bg-white p-2 md:mx-2 rounded-sm border-2 border-gray-200 md:max-h-80">
      <h2 className="text-xl">Filter</h2>
      <hr />
      <div className="mt-1 max-h-9/10 overflow-y-scroll">
        <div className="flex flex-col">
          <label htmlFor="class">Class:</label>
          <Select>
            <option value="">1</option>
          </Select>
        </div>
        <div className="flex flex-col mt-1">
          <label htmlFor="class">
            Exam: <button>+</button>
          </label>
          <Select>
            <option value="">1</option>
          </Select>
        </div>
        <div className="flex flex-col space-y-[1px] mt-2">
          <Button sm variant="gray">
            Search
          </Button>
          <Button sm variant="darkBlue">
            Download Full
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportCardFilter;
