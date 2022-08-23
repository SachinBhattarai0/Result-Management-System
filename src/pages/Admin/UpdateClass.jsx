import React from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SUCCESS, useAlert } from "../../context/AlertContext";
import Input from "../../container/form/Input";
import Button from "../../container/form/Button";
import Content from "../../container/content/Content";
import FormContainer from "../../components/formContainer/FormContainer";

const UpdateClass = () => {
  const navigate = useNavigate();
  const { state: _class } = useLocation();
  const { updateAlert } = useAlert();
  const [formState, setFormState] = useState({
    id: _class._id,
    name: _class.name,
  });

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiWithJwt("/class/update/", {
        ...formState,
      });
      updateAlert(data.message, SUCCESS);
      navigate(-1, { replace: true });
    } catch (error) {
      updateAlert(error.response.data.message);
    }
  };

  return (
    <Content>
      <FormContainer title="Update Exam:">
        <form className="flex flex-col mt-2 space-y-1" onSubmit={handleSubmit}>
          <label>Name:</label>
          <Input
            placeholder="Enter name"
            value={formState.name}
            name="name"
            onChange={handleChange}
          />
          <div className="flex flex-col">
            <Button variant="green">Update</Button>
          </div>
        </form>
      </FormContainer>
    </Content>
  );
};

export default UpdateClass;
