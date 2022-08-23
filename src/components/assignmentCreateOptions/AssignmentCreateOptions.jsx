import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SUCCESS, useAlert } from "../../context/AlertContext";
import Select from "../../container/form/Select";
import Spinner from "../../container/spinner/Spinner";
import Button from "../../container/form/Button";
import FormContainer from "../formContainer/FormContainer";
import { apiWithJwt } from "../../axios/index";

const defaultFormState = {
  exam: "",
  class: "",
  subject: "",
  teacher: "",
};

const AssignmentCreateOptions = () => {
  const navigate = useNavigate();
  const { updateAlert } = useAlert();
  const [creatingAssignment, setCreatingAssignment] = useState(false);
  const [formState, setFormState] = useState(defaultFormState);

  const [createOptions, setCreateOptions] = useState({
    exam: [],
    class: [],
    subject: [],
    teacher: [],
  });

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

      updateAlert("Assignment created Sucessfully", SUCCESS);
      if (!data.error) return navigate("/rms/admin/assignment/");
    } catch (error) {
      setCreatingAssignment(false);
      console.log(error);
      updateAlert(error.response.data.message);
    }
  };

  const handleChange = (target) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleClassChange = async (target) => {
    //when class changes fetch subect for that class
    setFormState({ ...formState, [target.name]: target.value });
    const { data } = await apiWithJwt("/subject/get-for-class/", {
      class: target.value,
    });
    setCreateOptions({ ...createOptions, subject: data.subjects });
  };

  useEffect(() => {
    const getCreateOptions = async () => {
      try {
        const [exams, classes, teachers] = await Promise.all([
          apiWithJwt("/exam/get-all/"),
          apiWithJwt("/class/get-all/"),
          apiWithJwt("/user/get-all-teachers/"),
        ]);

        setCreateOptions({
          ...createOptions,
          exam: exams.data.exams,
          class: classes.data.class,
          teacher: teachers.data.teachers,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getCreateOptions();
  }, []);

  return (
    <FormContainer title="Create Assignments:">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Exam:</label>
          <Select name="exam" onChange={(e) => handleChange(e.target)}>
            {createOptions.exam.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name} ({i.year}-{i.month}-{i.date})
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label>Class:</label>
          <Select name="class" onChange={(e) => handleClassChange(e.target)}>
            {createOptions.class.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label>Subject:</label>
          <Select name="subject" onChange={(e) => handleChange(e.target)}>
            {createOptions.subject.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label>Teacher:</label>
          <Select name="teacher" onChange={(e) => handleChange(e.target)}>
            {createOptions.teacher.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </Select>
        </div>
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
