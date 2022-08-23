import React from "react";
import { useState } from "react";
import { useAlert } from "../../context/AlertContext";
import { SUCCESS } from "../../context/AlertContext";
import { apiWithJwt } from "../../axios";
import Input from "../../container/form/Input";
import Spinner from "../../container/spinner/Spinner";
import Button from "../../container/form/Button";
import FormContainer from "../formContainer/FormContainer";

const ClassCreateOptions = ({ setClassCreatedOrDeleted }) => {
  const { updateAlert } = useAlert();
  const [className, setClassName] = useState("");
  const [creatingClass, setCreatingClass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCreatingClass(true);
      const { data } = await apiWithJwt("/class/create/", { name: className });

      //This state change will trigger useEffect to fetch new class list
      setClassCreatedOrDeleted(Math.random());

      updateAlert(data.message, SUCCESS);
      setClassName("");
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setCreatingClass(false);
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
