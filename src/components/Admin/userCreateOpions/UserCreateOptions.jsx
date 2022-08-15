import React, { useState } from "react";
import Input from "../../form/Input";
import Button from "../../form/Button";
import Spinner from "../../spinner/Spinner";
import { SUCCESS, useAlert } from "../../../context/AlertContext";
import { apiWithJwt } from "../../../axios/index";
import FilterContainer from "../filterContainer/FilterContainer";

const defaultState = {
  name: "",
  email: "",
  password: "",
  role: "teacher",
};

const UserCreateCreteOptions = () => {
  const [formState, setFormState] = useState(defaultState);
  const [creatingUser, setCreatingUser] = useState(false);
  const { updateAlert } = useAlert();

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreatingUser(true);
      const { data } = await apiWithJwt("/user/create-teacher", {
        ...formState,
      });
      setFormState(defaultState);
      updateAlert(data.message, SUCCESS);

      console.log(data);
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setCreatingUser(false);
  };

  return (
    <FilterContainer title="Create Teacher:">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-1 mt-3">
        <Input
          label="name"
          placeholder="Enter name"
          value={formState.name}
          name="name"
          onChange={handleChange}
        />
        <Input
          label="email"
          placeholder="Enter email"
          value={formState.email}
          name="email"
          onChange={handleChange}
        />
        <Input
          label="password"
          placeholder="Enter password"
          value={formState.password}
          name="password"
          type="password"
          onChange={handleChange}
        />
        <Button variant="green" isPending={creatingUser}>
          {creatingUser ? <Spinner /> : "Create"}
        </Button>
      </form>
    </FilterContainer>
  );
};

export default UserCreateCreteOptions;
