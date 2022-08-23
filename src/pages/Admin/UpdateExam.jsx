import React from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SUCCESS, useAlert } from "../../context/AlertContext";
import Spinner from "../../container/spinner/Spinner";
import Input from "../../container/form/Input";
import Button from "../../container/form/Button";
import Content from "../../container/content/Content";
import FormContainer from "../../components/formContainer/FormContainer";

const UpdateExam = () => {
  const navigate = useNavigate();
  const { state: exam } = useLocation();
  const [updatingExam, setUpdatingExam] = useState(false);
  const { updateAlert } = useAlert();
  const [formState, setFormState] = useState({
    id: exam._id,
    name: exam.name,
    year: exam.year,
    month: exam.month,
    date: exam.date,
  });

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdatingExam(true);
    try {
      const { data } = await apiWithJwt("/exam/update/", {
        ...formState,
      });
      updateAlert(data.message, SUCCESS);
      navigate(-1, { replace: true });
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setUpdatingExam(false);
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
          <label>Year:</label>
          <Input
            type="number"
            placeholder="Enter year"
            value={formState.year}
            name="year"
            onChange={handleChange}
          />
          <label>Month:</label>
          <Input
            type="number"
            placeholder="Enter month"
            value={formState.month}
            name="month"
            onChange={handleChange}
          />
          <label>Date:</label>
          <Input
            type="number"
            placeholder="Enter date"
            value={formState.date}
            name="date"
            onChange={handleChange}
          />

          <div className="flex flex-col">
            <Button variant="green">
              {updatingExam ? <Spinner /> : "Update"}
            </Button>
          </div>
        </form>
      </FormContainer>
    </Content>
  );
};

export default UpdateExam;
