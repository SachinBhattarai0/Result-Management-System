import React from "react";
import Input from "../../form/Input";
import Button from "../../form/Button";
import FilterContainer from "../filterContainer/FilterContainer";

const ClassCreateOptions = () => {
  return (
    <FilterContainer title="Create Class:">
      <div className="mt-3">
        <Input placeholder="Enter Name Of Class" style={{ width: "100%" }} />
      </div>
      <div className="flex flex-col mt-1">
        <Button variant={"green"}>Create</Button>
      </div>
    </FilterContainer>
  );
};

export default ClassCreateOptions;
