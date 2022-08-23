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
import ClassCheckbox from "../../components/checkbox/ClassCheckbox";
import FormContainer from "../../components/formContainer/FormContainer";

const UpdateSubject = () => {
  const navigate = useNavigate();
  const { state: subject } = useLocation();
  const { updateAlert } = useAlert();
  const [updatingSubject, setupdatingSubject] = useState(false);

  const [formState, setFormState] = useState({
    id: subject._id,
    name: subject.name,
    theoryMark: subject.theoryMark,
    practicalMark: subject.practicalMark,
    passMark: subject.passMark,
    classes: subject.class.map((i) => i._id),
  });

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setupdatingSubject(true);

    try {
      const { data } = await apiWithJwt("/subject/update/", {
        ...formState,
      });
      updateAlert(data.message, SUCCESS);
      navigate(-1, { replace: true });
    } catch (error) {
      updateAlert(error.response.data.message);
    }

    setupdatingSubject(false);
  };

  return (
    <Content>
      <FormContainer title="Update Subject:">
        <form className="flex flex-col mt-2 space-y-1" onSubmit={handleSubmit}>
          <label>Name:</label>
          <Input
            placeholder="Enter name"
            value={formState.name}
            name="name"
            onChange={handleChange}
          />
          <label>TheoryMark:</label>
          <Input
            type="number"
            placeholder="Enter theoryMark"
            value={formState.theoryMark}
            name="theoryMark"
            onChange={handleChange}
          />
          <label>PracticalMark:</label>
          <Input
            type="number"
            placeholder="Enter practicalMark"
            value={formState.practicalMark}
            name="practicalMark"
            onChange={handleChange}
          />
          <label>PassMark:</label>
          <Input
            type="number"
            placeholder="Enter passMark"
            value={formState.passMark}
            name="passMark"
            onChange={handleChange}
          />
          <ClassCheckbox formState={formState} setFormState={setFormState} />
          <div className="flex flex-col">
            <Button variant="green">
              {updatingSubject ? <Spinner /> : "Update"}
            </Button>
          </div>
        </form>
      </FormContainer>
    </Content>
  );
};

export default UpdateSubject;
