import React from "react";
import { useState } from "react";
import { SUCCESS } from "../../context/AlertContext";
import { useAlert } from "../../context/AlertContext";
import { apiWithJwt } from "../../axios/index";
import Spinner from "../../container/spinner/Spinner";
import Button from "../../container/form/Button";
import FormContainer from "../formContainer/FormContainer";
import ClassSelect from "../select/ClassSelect";
import ExamSelect from "../select/ExamSelect";
import SubjectSelect from "../select/SubjectSelect";
import TeacherSelect from "../select/TeacherSelect";

const defaultFormState = {
  exam: "",
  class: "",
  subject: "",
  teacher: "",
};

const AssignmentCreateOptions = ({ setAssignmentDeletedOrCreated }) => {
  const { updateAlert } = useAlert();
  const [creatingAssignment, setCreatingAssignment] = useState(false);
  const [formState, setFormState] = useState(defaultFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCreatingAssignment(true);
      const { data } = await apiWithJwt("/assignment/create/", {
        exam: formState.exam,
        class: formState.class,
        subject: formState.subject,
        user: formState.teacher,
      });
      setCreatingAssignment(false);
      //This state change will trigger useEffect to fetch new assignment list
      setAssignmentDeletedOrCreated(Math.random());
      setFormState(defaultFormState);

      updateAlert(data.message, SUCCESS);
    } catch (error) {
      setCreatingAssignment(false);
      console.log(error);
      updateAlert(error.response.data.message);
    }
  };

  return (
    <FormContainer title="Create Assignments:">
      <form onSubmit={handleSubmit}>
        <ExamSelect formState={formState} setFormState={setFormState} />
        <ClassSelect formState={formState} setFormState={setFormState} />
        <SubjectSelect
          formState={formState}
          setFormState={setFormState}
          forClass={formState.class}
        />
        <TeacherSelect formState={formState} setFormState={setFormState} />

        <div className="flex flex-col mt-1">
          <Button variant={"green"} isPending={creatingAssignment}>
            {creatingAssignment ? <Spinner /> : "Create"}
          </Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default AssignmentCreateOptions;
