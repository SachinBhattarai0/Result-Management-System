import React, { useState, useEffect } from "react";
import Button from "../../container/form/Button";
import Select from "../../container/form/Select";
import Spinner from "../../container/spinner/Spinner";
import { SUCCESS, useAlert } from "../../context/AlertContext";
import { apiWithJwt } from "../../axios/index";
import FormContainer from "../formContainer/FormContainer";

const defaultState = { studentNames: "", class: "", subjects: [] };

const StudentCreateOptions = () => {
  const { updateAlert } = useAlert();
  const [formState, setFormState] = useState(defaultState);
  const [creatingStudents, setCreatingStudents] = useState(false);
  const [formOptions, setFormOptions] = useState({
    classOptions: [],
    subjectOptions: [],
  });
  // console.log(formState);

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDatas = { ...formState };
    formDatas.studentNames = formDatas.studentNames.split(",").filter((i) => i);

    try {
      setCreatingStudents(true);
      const { data } = await apiWithJwt("/user/create-student/", {
        ...formDatas,
      });
      setFormState(defaultState);
      updateAlert(data.message, SUCCESS);
      console.log(data);
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setCreatingStudents(false);
  };

  useEffect(() => {
    const getFormOptions = async () => {
      try {
        const res = await Promise.all([
          apiWithJwt("/class/get-all/"),
          apiWithJwt("/subject/get-all/"),
        ]);
        setFormOptions({
          ...formOptions,
          classOptions: res[0].data.class,
          subjectOptions: res[1].data.subjects,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getFormOptions();
  }, []);

  return (
    <FormContainer title="Create Students:">
      <form onSubmit={handleSubmit} className="flex flex-col mt-3">
        <div className="flex flex-col mb-1">
          <textarea
            rows="8"
            className="border outline-none p-3 border-gray-200 rounded-lg focus:border-bluish"
            placeholder="John Doe,Jack Sparrow,Rachod Das Chanchad...."
            name="studentNames"
            value={formState.studentNames}
            onChange={handleChange}
          ></textarea>
          <label className="text-gray-400">
            Enter Student names separated by comma, Roll no will be auto
            arranged alphabetically
          </label>
        </div>

        <Select label="Class:" name="class" onChange={handleChange}>
          {formOptions.classOptions.map((classItem, i) => (
            <option key={i} value={classItem._id}>
              {classItem.name}
            </option>
          ))}
        </Select>

        <div className="mt-2">
          <label>Subjects:</label>
          <div className="flex flex-wrap">
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
        </div>

        <div className="py-2 w-full flex flex-wrap">
          {formState.studentNames.split(",").map((name, i) => {
            return (
              name && (
                <span
                  key={i}
                  className="px-3 mt-1 mr-1 py-2 rounded-lg bg-blue-500 text-white"
                >
                  {name}
                </span>
              )
            );
          })}
        </div>
        <Button variant="green" isPending={creatingStudents}>
          {creatingStudents ? <Spinner /> : "Create"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default StudentCreateOptions;
