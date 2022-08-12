import React from "react";
import Select from "../../form/Select";
import Button from "../../form/Button";
import FilterContainer from "../filterContainer/FilterContainer";

const AssignmentCreateOptions = () => {
  return (
    <FilterContainer title="Create Assignments:">
      <div className="flex flex-col">
        <label>Exam:</label>
        <Select>
          <option value="">option one</option>
          <option value="">option two</option>
        </Select>
      </div>
      <div className="flex flex-col">
        <label>Class:</label>
        <Select>
          <option value="">option one</option>
          <option value="">option two</option>
        </Select>
      </div>
      <div className="flex flex-col">
        <label>Subject:</label>
        <Select>
          <option value="">option one</option>
          <option value="">option two</option>
        </Select>
      </div>
      <div className="flex flex-col">
        <label>Teacher:</label>
        <Select>
          <option value="">option one</option>
          <option value="">option two</option>
        </Select>
      </div>
      <div className="flex flex-col mt-1">
        <Button variant={"green"}>Create</Button>
      </div>
    </FilterContainer>
  );
};

export default AssignmentCreateOptions;
