import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SUCCESS, useAlert } from "../../../context/AlertContext";
import Select from "../../form/Select";
import Spinner from "../../spinner/Spinner";
import Button from "../../form/Button";
import FormContainer from "../formContainer/FormContainer";
import { apiWithJwt } from "../../../axios/index";

const AssignmentCreateOptions = ({ assignments, setAssignments }) => {
  const examRef = useRef();
  const classRef = useRef();
  const subjectRef = useRef();
  const teacherRef = useRef();
  const { updateAlert } = useAlert();
  const navigate = useNavigate();
  const [creatingAssignment, setCreatingAssignment] = useState(false);

  const [createOptions, setCreateOptions] = useState({
    exam: [],
    class: [],
    subject: [],
    teacher: [],
  });
  const { exam, class: _class, subject, teacher } = createOptions;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exam = examRef.current.value;
    const _class = classRef.current.value;
    const subject = subjectRef.current.value;
    const teacher = teacherRef.current.value;

    try {
      setCreatingAssignment(true);
      const { data } = await apiWithJwt("/assignment/create/", {
        user: teacher,
        exam,
        subject,
        class: _class,
      });
      setCreatingAssignment(false);

      const prevAssignments = assignments.assignmentList;
      prevAssignments.push(data.assignment);
      setAssignments({ ...assignments, assignmentList: prevAssignments });

      updateAlert("Assignment created Sucessfully", SUCCESS);
      if (!data.error) return navigate("/rms/admin/assignment/");
    } catch (error) {
      setCreatingAssignment(false);
      console.log(error);
      updateAlert(error.response.data.message);
    }
  };

  useEffect(() => {
    const getCreateOptions = async () => {
      try {
        const [exams, classes, subjects, teachers] = await Promise.all([
          apiWithJwt("/exam/get-all/"),
          apiWithJwt("/class/get-all/"),
          apiWithJwt("/subject/get-all/"),
          apiWithJwt("/user/get-teachers/"),
        ]);

        setCreateOptions({
          exam: exams.data.exams,
          class: classes.data.class,
          subject: subjects.data.subjects,
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
          <Select name="exam" ref={examRef}>
            {exam.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label>Class:</label>
          <Select name="class" ref={classRef}>
            {_class.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label>Subject:</label>
          <Select name="subject" ref={subjectRef}>
            {subject.map((i) => (
              <option key={i._id} value={i._id}>
                {i.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col">
          <label>Teacher:</label>
          <Select name="teacher" ref={teacherRef}>
            {teacher.map((i) => (
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
