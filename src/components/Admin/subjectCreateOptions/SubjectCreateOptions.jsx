import React from "react";
import Input from "../../form/Input";
import Button from "../../form/Button";
import FilterContainer from "../filterContainer/FilterContainer";

const SubjectCreateOptions = () => {
  return (
    <FilterContainer title="Create Class:">
      <div className="mt-3 flex flex-col space-y-1">
        <Input placeholder="Enter Name" style={{ width: "100%" }} />
        <Input placeholder="Enter Theory Mark" style={{ width: "100%" }} />
        <Input placeholder="Enter Practical Mark" style={{ width: "100%" }} />
        <Input placeholder="Enter Pass Mark" style={{ width: "100%" }} />
        <div className="flex mt-1 space-x-2">
          <div className="flex space-x-1">
            <div>Sub 1</div>
            <input type="checkbox" />
          </div>
          <div className="flex space-x-1">
            <div>Sub 2</div>
            <input type="checkbox" />
          </div>
          <div className="flex space-x-1">
            <div>Sub 3</div>
            <input type="checkbox" />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-1">
        <Button variant={"green"}>Create</Button>
      </div>
    </FilterContainer>
  );
};

export default SubjectCreateOptions;
