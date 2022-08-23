import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SUCCESS, useAlert } from "../../context/AlertContext";
import Button from "../../container/form/Button";
import Select from "../../container/form/Select";
import Content from "../../container/content/Content";
import FormContainer from "../../components/formContainer/FormContainer";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { state: assignment } = useLocation();
  //   console.log(assignment);
  const { updateAlert } = useAlert();
  const [formOptions, setFormOptions] = useState({
    examOptions: [],
    classOptions: [],
    subjectOptions: [],
    teacherOptions: [],
  });

  const [formState, setFormState] = useState({
    id: assignment._id,
    exam: assignment.exam?._id,
    class: assignment.class?._id,
    subject: assignment.subject?._id,
    teacher: assignment.user?._id,
  });

  console.log(formState);
  const handleChange = (target) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formState);
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
  };

  const handleClassChange = async (target) => {
    //when class changes fetch subect for that class
    setFormState({ ...formState, [target.name]: target.value });
    const { data } = await apiWithJwt("/subject/get-for-class/", {
      class: target.value,
    });
    setFormOptions({ ...formOptions, subjectOptions: data.subjects });
  };

  useEffect(() => {
    const getFormOptions = async () => {
      try {
        const [exams, classes, teachers] = await Promise.all([
          apiWithJwt("/exam/get-all/"),
          apiWithJwt("/class/get-all/"),
          apiWithJwt("/user/get-all-teachers/"),
        ]);

        setFormOptions({
          ...formOptions,
          examOptions: exams.data.exams,
          classOptions: classes.data.class,
          teacherOptions: teachers.data.teachers,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getFormOptions();
  }, []);

  return (
    <Content>
      <FormContainer title="Update Assignment:">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Exam:</label>
            <Select
              name="exam"
              value={formState.exam}
              onChange={(e) => handleChange(e.target)}
            >
              {formOptions.examOptions.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name} ({i.year}-{i.month}-{i.date})
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col">
            <label>Class:</label>
            <Select
              value={formState.class}
              name="class"
              onChange={(e) => handleClassChange(e.target)}
            >
              {formOptions.classOptions.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col">
            <label>Subject:</label>
            <Select
              name="subject"
              value={formState.subject}
              onChange={(e) => handleChange(e.target)}
            >
              {formOptions.subjectOptions.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col">
            <label>Teacher:</label>
            <Select
              name="teacher"
              value={formState.teacher}
              onChange={(e) => handleChange(e.target)}
            >
              {formOptions.teacherOptions.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col mt-2">
            <Button variant="green">Update</Button>
          </div>
        </form>
      </FormContainer>
    </Content>
  );
};

export default UpdateStudent;
