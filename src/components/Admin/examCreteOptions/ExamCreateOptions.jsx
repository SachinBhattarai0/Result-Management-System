import React from "react";
import Input from "../../form/Input";
import Button from "../../form/Button";
import FilterContainer from "../filterContainer/FilterContainer";

const ExamCreateCreteOptions = () => {
  return (
    <FilterContainer title="Create Exam:">
      <div className="mt-3 flex flex-col space-y-1">
        <Input
          placeholder="Enter Year"
          type="number"
          style={{ width: "100%" }}
        />
        <Input
          placeholder="Enter Month"
          type="number"
          style={{ width: "100%" }}
        />
        <Input
          placeholder="Enter Date"
          type="number"
          style={{ width: "100%" }}
        />
        <Input
          placeholder="Enter Name"
          type="number"
          style={{ width: "100%" }}
        />
      </div>
      <div className="flex flex-col mt-1">
        <Button variant={"green"}>Create</Button>
      </div>
    </FilterContainer>
  );
};

export default ExamCreateCreteOptions;
