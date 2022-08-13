import React, { useState } from "react";
import { SUCCESS, useAlert } from "../../../context/AlertContext";
import Input from "../../form/Input";
import Spinner from "../../spinner/Spinner";
import Button from "../../form/Button";
import FilterContainer from "../filterContainer/FilterContainer";
import { apiWithJwt } from "../../../axios";

const defaultFormState = {
  name: "",
  year: "",
  month: "",
  date: "",
};

const ExamCreateCreteOptions = ({ examState, setExamState }) => {
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

      if (!data.error) updateAlert("exam created successfuly!!", SUCCESS);
      setformState(defaultFormState);

      const newExamList = examState.examList;
      newExamList.push(data.exam);

      setExamState({ ...examState, examList: newExamList });
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setCreatingExam(false);
  };

  return (
    <FilterContainer title="Create Exam:">
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col space-y-1">
        <Input
          placeholder="Enter Year"
          name="year"
          value={formState.year}
          type="number"
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        <Input
          placeholder="Enter Month"
          type="number"
          name="month"
          value={formState.month}
          style={{ width: "100%" }}
          onChange={handleChange}
        />
        <Input
          placeholder="Enter Date"
          type="number"
          name="date"
          value={formState.date}
          style={{ width: "100%" }}
          onChange={handleChange}
        />
        <Input
          placeholder="Enter Name"
          name="name"
          value={formState.name}
          style={{ width: "100%" }}
          onChange={handleChange}
        />
        <div className="flex flex-col mt-1">
          <Button variant={"green"} isPending={creatingExam}>
            {creatingExam ? <Spinner /> : "Create"}
          </Button>
        </div>
      </form>
    </FilterContainer>
  );
};

export default ExamCreateCreteOptions;
