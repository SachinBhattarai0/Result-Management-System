import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SUCCESS, useAlert } from "../../context/AlertContext";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import Select from "../../components/form/Select";
import Content from "../../components/content/Content";
import FormContainer from "../../components/Admin/formContainer/FormContainer";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { state: assignment } = useLocation();
  console.log(assignment);
  const { updateAlert } = useAlert();
  const [formOptions, setFormOptions] = useState({
    examOptions: [],
    classOptions: [],
    subjectOptions: [],
    teacherOptions: [],
  });

  const [formState, setFormState] = useState({
    id: assignment._id,
    exam: assignment.exam,
    class: assignment.class._id,
    subjects: assignment.subject._id,
    passed: false,
  });

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    // try {
    //   const { data } = await apiWithJwt("/user/update-student", {
    //     ...formState,
    //   });
    //   updateAlert(data.message, SUCCESS);
    //   navigate(-1, { replace: true });
    // } catch (error) {
    //   updateAlert(error.response.data.message);
    // }
  };

  //   useEffect(() => {
  //     const getCreateOptions = async () => {
  //       try {
  //         const [exams, classes, teachers] = await Promise.all([
  //           apiWithJwt("/exam/get-all/"),
  //           apiWithJwt("/class/get-all/"),
  //           apiWithJwt("/user/get-teachers/"),
  //         ]);

  //         setCreateOptions({
  //           ...createOptions,
  //           exam: exams.data.exams,
  //           class: classes.data.class,
  //           teacher: teachers.data.teachers,
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getCreateOptions();
  //   }, []);

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
