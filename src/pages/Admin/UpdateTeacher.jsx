import React from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SUCCESS, useAlert } from "../../context/AlertContext";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import Content from "../../components/content/Content";
import FormContainer from "../../components/Admin/formContainer/FormContainer";

const UpdateTeacher = () => {
  const navigate = useNavigate();
  const { state: teacher } = useLocation();
  const { updateAlert } = useAlert();

  const [formState, setFormState] = useState({
    id: teacher._id,
    name: teacher.name,
    email: teacher.email,
    password: "",
  });

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiWithJwt("/user/update-teacher", {
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
      <FormContainer title="Update Teacher:">
        <form className="flex flex-col mt-2 space-y-1" onSubmit={handleSubmit}>
          <label>Name:</label>
          <Input
            placeholder="Enter name"
            value={formState.name}
            name="name"
            onChange={handleChange}
          />
          <label>Email:</label>
          <Input
            placeholder="Enter email"
            value={formState.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password:</label>
          <Input
            placeholder="Enter password(optional)"
            type="password"
            value={formState.password}
            name="password"
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

export default UpdateTeacher;
