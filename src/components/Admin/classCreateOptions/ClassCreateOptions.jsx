import React, { useState } from "react";
import { SUCCESS, useAlert } from "../../../context/AlertContext";
import Input from "../../form/Input";
import Spinner from "../../spinner/Spinner";
import Button from "../../form/Button";
import FilterContainer from "../filterContainer/FilterContainer";
import { apiWithJwt } from "../../../axios";

const ClassCreateOptions = ({ setClassState, classState }) => {
  const { updateAlert } = useAlert();
  const [className, setClassName] = useState("");
  const [creatingClass, setCreatingClass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCreatingClass(false);
      const { data } = await apiWithJwt("/class/create/", { name: className });

      if (!data.error) updateAlert("class created successfuly!!", SUCCESS);
      setClassName("");

      const newClassList = classState.classList;
      newClassList.push(data.class);

      setClassState({ ...classState, classList: newClassList });
    } catch (error) {
      setCreatingClass(false);
      updateAlert(error.response.data.message);
    }
  };

  return (
    <FilterContainer title="Create Class:">
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <Input
            placeholder="Enter Name Of Class"
            value={className}
            style={{ width: "100%" }}
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-1">
          <Button variant={"green"} isPending={creatingClass}>
            {creatingClass ? <Spinner /> : "Create"}
          </Button>
        </div>
      </form>
    </FilterContainer>
  );
};

export default ClassCreateOptions;
