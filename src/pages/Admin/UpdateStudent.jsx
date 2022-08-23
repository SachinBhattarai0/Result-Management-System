import React from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SUCCESS } from "../../context/AlertContext";
import { useAlert } from "../../context/AlertContext";
import Spinner from "../../container/spinner/Spinner";
import Input from "../../container/form/Input";
import Button from "../../container/form/Button";
import Content from "../../container/content/Content";
import SubjectCheckbox from "../../components/checkbox/SubjectCheckbox";
import ClassSelect from "../../components/select/ClassSelect";
import FormContainer from "../../components/formContainer/FormContainer";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { state: student } = useLocation();
  const { updateAlert } = useAlert();
  const [updatingStudent, setUpdatingStudent] = useState(false);
  const [formState, setFormState] = useState({
    id: student._id,
    name: student.name,
    class: student.class._id,
    subjects: student.subjects.map((sub) => sub._id),
    passed: student.passed,
  });

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdatingStudent(true);

    try {
      const { data } = await apiWithJwt("/user/update-student", {
        ...formState,
      });
      updateAlert(data.message, SUCCESS);
      navigate(-1, { replace: true });
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setUpdatingStudent(false);
  };

  return (
    <Content>
      <FormContainer title="Update Student:">
        <form className="flex flex-col mt-2 space-y-1" onSubmit={handleSubmit}>
          <label>Name:</label>
          <Input
            placeholder="Enter name"
            value={formState.name}
            name="name"
            onChange={handleChange}
          />
          <ClassSelect formState={formState} setFormState={setFormState} />

          <SubjectCheckbox
            formState={formState}
            setFormState={setFormState}
            forClass={formState.class}
          />

          <div className="flex items-center space-x-1">
            <label>Passed: </label>
            <input
              type="checkbox"
              checked={formState.passed}
              onChange={() =>
                setFormState({ ...formState, passed: !formState.passed })
              }
            />
          </div>
          <div className="flex flex-col">
            <Button variant="green">
              {updatingStudent ? <Spinner /> : "Update"}
            </Button>
          </div>
        </form>
      </FormContainer>
    </Content>
  );
};

export default UpdateStudent;
