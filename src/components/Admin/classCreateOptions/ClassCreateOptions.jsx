import React, { useState } from "react";
import { SUCCESS, useAlert } from "../../../context/AlertContext";
import Input from "../../form/Input";
import Spinner from "../../spinner/Spinner";
import Button from "../../form/Button";
import FormContainer from "../formContainer/FormContainer";
import { apiWithJwt } from "../../../axios";

const ClassCreateOptions = () => {
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
    } catch (error) {
      setCreatingClass(false);
      updateAlert(error.response.data.message);
    }
  };

  return (
    <FormContainer title="Create Class:">
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <Input
            placeholder="Enter Name Of Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-1">
          <Button variant={"green"} isPending={creatingClass}>
            {creatingClass ? <Spinner /> : "Create"}
          </Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default ClassCreateOptions;
