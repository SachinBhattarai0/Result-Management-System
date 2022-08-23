import React, { useState } from "react";
import { SUCCESS, useAlert } from "../../context/AlertContext";
import Input from "../../container/form/Input";
import Spinner from "../../container/spinner/Spinner";
import Button from "../../container/form/Button";
import FormContainer from "../formContainer/FormContainer";
import { apiWithJwt } from "../../axios";

const defaultFormState = {
  name: "",
  year: "",
  month: "",
  date: "",
};

const ExamCreateCreteOptions = () => {
  const [formState, setformState] = useState(defaultFormState);
  const [creatingExam, setCreatingExam] = useState(false);
  const { updateAlert } = useAlert();

  const handleChange = (e) => {
    setformState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCreatingExam(true);
      const { data } = await apiWithJwt("/exam/create/", { ...formState });

      if (!data.error) updateAlert(data.message, SUCCESS);
      setformState(defaultFormState);
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setCreatingExam(false);
  };

  return (
    <FormContainer title="Create Exam:">
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col space-y-1">
        <Input
          placeholder="Enter Year"
          name="year"
          value={formState.year}
          type="number"
          onChange={handleChange}
        />
        <Input
          placeholder="Enter Month"
          type="number"
          name="month"
          value={formState.month}
          onChange={handleChange}
        />
        <Input
          placeholder="Enter Date"
          type="number"
          name="date"
          value={formState.date}
          onChange={handleChange}
        />
        <Input
          placeholder="Enter Name"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
        <div className="flex flex-col mt-1">
          <Button variant={"green"} isPending={creatingExam}>
            {creatingExam ? <Spinner /> : "Create"}
          </Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default ExamCreateCreteOptions;