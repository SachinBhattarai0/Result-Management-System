import React from "react";
import { useState } from "react";
import { SUCCESS } from "../../context/AlertContext";
import { useAlert } from "../../context/AlertContext";
import { apiWithJwt } from "../../axios/index";
import ClassSelect from "../select/ClassSelect";
import SubjectCheckbox from "../checkbox/SubjectCheckbox";
import Button from "../../container/form/Button";
import Spinner from "../../container/spinner/Spinner";
import FormContainer from "../formContainer/FormContainer";

const defaultState = { studentNames: "", class: "", subjects: [] };

const StudentCreateOptions = ({ setStudentCreatedOrDeleted }) => {
  const { updateAlert } = useAlert();
  const [formState, setFormState] = useState(defaultState);
  const [creatingStudents, setCreatingStudents] = useState(false);

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
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
      //This state change will trigger useEffect to fetch new student list
      setStudentCreatedOrDeleted(true);

      setFormState(defaultState);
      updateAlert(data.message, SUCCESS);
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setCreatingStudents(false);
  };

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

        <ClassSelect formState={formState} setFormState={setFormState} />

        <SubjectCheckbox
          formState={formState}
          setFormState={setFormState}
          forClass={formState.class}
        />

        <div className="py-2 w-full flex flex-wrap">
          {formState.studentNames.split(",").map(
            (name, i) =>
              name && (
                <span
                  key={i}
                  className="px-3 mt-1 mr-1 py-2 rounded-lg bg-blue-500 text-white"
                >
                  {name}
                </span>
              )
          )}
        </div>
        <Button variant="green" isPending={creatingStudents}>
          {creatingStudents ? <Spinner /> : "Create"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default StudentCreateOptions;
