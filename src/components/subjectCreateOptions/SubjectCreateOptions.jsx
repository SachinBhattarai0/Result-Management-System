import React, { useState, useEffect } from "react";
import Input from "../../container/form/Input";
import Button from "../../container/form/Button";
import Spinner from "../../container/spinner/Spinner";
import { SUCCESS, useAlert } from "../../context/AlertContext";
import { apiWithJwt } from "../../axios";
import FormConainer from "../formContainer/FormContainer";

const defaultFormState = {
  name: "",
  theoryMark: 75,
  practicalMark: 25,
  passMark: 40,
  classes: [],
};

const SubjectCreateOptions = () => {
  const { updateAlert } = useAlert();
  const [formState, setFormState] = useState(defaultFormState);
  const [creatingClass, setCreatingClass] = useState(false);
  const [classList, setClassList] = useState([]);
  const { name, theoryMark, practicalMark, passMark } = formState;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const handleCheckboxChange = ({ target }) => {
    const classid = target.getAttribute("class_id");
    const newClasses = formState.classes;

    if (target.checked) {
      newClasses.push(classid);
      setFormState({ ...formState, classes: newClasses });
    } else {
      newClasses.splice(newClasses.indexOf(classid), 1);
      setFormState({ ...formState, classes: newClasses });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCreatingClass(true);
      const { data } = await apiWithJwt("/subject/create/", { ...formState });

      setFormState({ ...defaultFormState });
      updateAlert(data.message, SUCCESS);
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setCreatingClass(false);
  };

  useEffect(() => {
    const fetchclassList = async () => {
      try {
        const { data } = await apiWithJwt("/class/get-all/");
        setClassList(data.class);
      } catch (error) {
        console.log(error);
      }
    };
    fetchclassList();
  }, []);
  return (
    <FormConainer title="Create Subject:">
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col space-y-1">
        <label>Name:</label>
        <Input
          placeholder="Enter Name"
          value={name}
          name="name"
          onChange={handleChange}
        />
        <label>TheoryMark:</label>
        <Input
          placeholder="Enter Theory Mark"
          value={theoryMark}
          name="theoryMark"
          type="number"
          onChange={handleChange}
        />
        <label>PracticalMark:</label>
        <Input
          placeholder="Enter Practical Mark"
          value={practicalMark}
          name="practicalMark"
          type="number"
          onChange={handleChange}
        />
        <label>PassMark:</label>
        <Input
          placeholder="Enter Pass Mark"
          value={passMark}
          name="passMark"
          type="number"
          onChange={handleChange}
        />
        <label>Class:</label>
        <div className="flex flex-wrap mt-1 space-x-2">
          {classList.map((_class, i) => (
            <div className="flex space-x-1" key={i}>
              <input
                type="checkbox"
                class_id={_class._id}
                checked={formState.classes.includes(_class._id) ? true : false}
                onChange={handleCheckboxChange}
              />
              <div>{_class.name}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-1">
          <Button variant={"green"} isPending={creatingClass}>
            {creatingClass ? <Spinner /> : "Create"}
          </Button>
        </div>
      </form>
    </FormConainer>
  );
};

export default SubjectCreateOptions;
