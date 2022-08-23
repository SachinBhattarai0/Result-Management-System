import React, { useState } from "react";
import Input from "../../container/form/Input";
import Button from "../../container/form/Button";
import Spinner from "../../container/spinner/Spinner";
import { SUCCESS, useAlert } from "../../context/AlertContext";
import { apiWithJwt } from "../../axios";
import ClassCheckbox from "../checkbox/ClassCheckbox";
import FormConainer from "../formContainer/FormContainer";

const defaultFormState = {
  name: "",
  theoryMark: 75,
  practicalMark: 25,
  passMark: 40,
  classes: [],
};

const SubjectCreateOptions = ({ setSubjectCreatedOrDeleted }) => {
  const { updateAlert } = useAlert();
  const [formState, setFormState] = useState(defaultFormState);
  const [creatingClass, setCreatingClass] = useState(false);
  const { name, theoryMark, practicalMark, passMark } = formState;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCreatingClass(true);
      const { data } = await apiWithJwt("/subject/create/", { ...formState });

      //This state change will trigger useEffect to fetch new student list
      setSubjectCreatedOrDeleted(Math.random());

      setFormState({ ...defaultFormState });
      updateAlert(data.message, SUCCESS);
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setCreatingClass(false);
  };

  return (
    <FormConainer title="Create Subject:">
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col space-y-1">
        <label>Name:</label>
        <Input
          placeholder="Enter Name"
          value={name}
          name="name"
          onChange={handleChange}
        />
        <label>TheoryMark:</label>
        <Input
          placeholder="Enter Theory Mark"
          value={theoryMark}
          name="theoryMark"
          type="number"
          onChange={handleChange}
        />
        <label>PracticalMark:</label>
        <Input
          placeholder="Enter Practical Mark"
          value={practicalMark}
          name="practicalMark"
          type="number"
          onChange={handleChange}
        />
        <label>PassMark:</label>
        <Input
          placeholder="Enter Pass Mark"
          value={passMark}
          name="passMark"
          type="number"
          onChange={handleChange}
        />
        <ClassCheckbox formState={formState} setFormState={setFormState} />

        <div className="flex flex-col mt-1">
          <Button variant={"green"} isPending={creatingClass}>
            {creatingClass ? <Spinner /> : "Create"}
          </Button>
        </div>
      </form>
    </FormConainer>
  );
};

export default SubjectCreateOptions;
