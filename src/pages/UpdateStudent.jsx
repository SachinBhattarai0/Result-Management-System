import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiWithJwt } from "../axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SUCCESS, useAlert } from "../context/AlertContext";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import Select from "../components/form/Select";
import Content from "../components/content/Content";
import FormContainer from "../components/Admin/formContainer/FormContainer";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { state: student } = useLocation();
  const { updateAlert } = useAlert();
  const [formOptions, setFormOptions] = useState({
    classOptions: [],
    subjectOptions: [],
  });
  const [formState, setFormState] = useState({
    id: student._id,
    name: student.name,
    class: student.class._id,
    subjects: student.subjects.map((sub) => sub._id),
    passed: false,
  });

  const handleCheckboxChange = ({ target }) => {
    const subjectId = target.getAttribute("subid");
    const newSubjects = formState.subjects;

    if (target.checked) {
      newSubjects.push(subjectId);
      setFormState({ ...formState, subjects: newSubjects });
    } else {
      newSubjects.splice(newSubjects.indexOf(subjectId), 1);
      setFormState({
        ...formState,
        subjects: newSubjects,
      });
    }
  };

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiWithJwt("/user/update-student", {
        ...formState,
      });
      updateAlert(data.message, SUCCESS);
      navigate(-1, { replace: true });
    } catch (error) {
      updateAlert(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchClassSubject = async () => {
      try {
        const [subjects, _class] = await Promise.all([
          apiWithJwt("/subject/get-all/"),
          apiWithJwt("/class/get-all/"),
        ]);

        setFormOptions({
          ...formOptions,
          classOptions: _class.data.class,
          subjectOptions: subjects.data.subjects,
        });
      } catch (error) {
        updateAlert(error.message);
      }
    };

    fetchClassSubject();
  }, []);

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
          <label>Class:</label>
          <Select defaultOpt={false} name="class" onChange={handleChange}>
            {formOptions.classOptions.map((classItem, i) => (
              <option
                key={i}
                value={classItem._id}
                defaultChecked={formState.class === classItem._id}
              >
                {classItem.name}
              </option>
            ))}
          </Select>
          <div className="flex space-x-2">
            <label>Subjects:</label>
            {formOptions.subjectOptions.map((subjectItem, i) => (
              <div className="flex mr-2 space-x-1" key={i}>
                <span>{subjectItem.name}</span>
                <input
                  type="checkbox"
                  subid={subjectItem._id}
                  checked={formState.subjects.includes(subjectItem._id)}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))}
          </div>
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
            <Button variant="green">Update</Button>
          </div>
        </form>
      </FormContainer>
    </Content>
  );
};

export default UpdateStudent;
