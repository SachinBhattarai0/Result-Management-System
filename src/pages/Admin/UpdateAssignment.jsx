import React from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SUCCESS } from "../../context/AlertContext";
import { useAlert } from "../../context/AlertContext";
import Spinner from "../../container/spinner/Spinner";
import Button from "../../container/form/Button";
import Content from "../../container/content/Content";
import ClassSelect from "../../components/select/ClassSelect";
import ExamSelect from "../../components/select/ExamSelect";
import TeacherSelect from "../../components/select/TeacherSelect";
import SubjectSelect from "../../components/select/SubjectSelect";
import FormContainer from "../../components/formContainer/FormContainer";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { updateAlert } = useAlert();
  const { state: assignment } = useLocation();
  const [updatingAssignment, setUpdatingAssignment] = useState(false);
  const [formState, setFormState] = useState({
    id: assignment._id,
    exam: assignment.exam?._id,
    class: assignment.class?._id,
    subject: assignment.subject?._id,
    teacher: assignment.user?._id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdatingAssignment(true);
    try {
      const { data } = await apiWithJwt("/assignment/update", {
        id: formState.id,
        exam: formState.exam,
        class: formState.class,
        subject: formState.subject,
        user: formState.teacher,
      });

      updateAlert(data.message, SUCCESS);
      navigate(-1, { replace: true });
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setUpdatingAssignment(false);
  };

  return (
    <Content>
      <FormContainer title="Update Assignment:">
        <form onSubmit={handleSubmit}>
          <ExamSelect formState={formState} setFormState={setFormState} />
          <ClassSelect formState={formState} setFormState={setFormState} />
          <SubjectSelect
            formState={formState}
            setFormState={setFormState}
            forClass={formState.class}
          />
          <TeacherSelect formState={formState} setFormState={setFormState} />
          <div className="flex flex-col mt-2">
            <Button variant="green">
              {updatingAssignment ? <Spinner /> : "Update"}
            </Button>
          </div>
        </form>
      </FormContainer>
    </Content>
  );
};

export default UpdateStudent;
