import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiWithJwt } from "../../axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SUCCESS } from "../../context/AlertContext";
import { useAlert } from "../../context/AlertContext";
import Input from "../../container/form/Input";
import Button from "../../container/form/Button";
import Content from "../../container/content/Content";
import FormContainer from "../../components/Admin/formContainer/FormContainer";

const UpdateSubject = () => {
  const navigate = useNavigate();
  const { state: subject } = useLocation();
  const { updateAlert } = useAlert();
  const [classList, setClassList] = useState([]);

  const [formState, setFormState] = useState({
    id: subject._id,
    name: subject.name,
    theoryMark: subject.theoryMark,
    practicalMark: subject.practicalMark,
    passMark: subject.passMark,
    classes: subject.class.map((i) => i._id),
  });

  const handleChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await apiWithJwt("/subject/update/", {
        ...formState,
      });
      updateAlert(data.message, SUCCESS);
      navigate(-1, { replace: true });
    } catch (error) {
      updateAlert(error.response.data.message);
    }
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
    <Content>
      <FormContainer title="Update Subject:">
        <form className="flex flex-col mt-2 space-y-1" onSubmit={handleSubmit}>
          <label>Name:</label>
          <Input
            placeholder="Enter name"
            value={formState.name}
            name="name"
            onChange={handleChange}
          />
          <label>TheoryMark:</label>
          <Input
            type="number"
            placeholder="Enter theoryMark"
            value={formState.theoryMark}
            name="theoryMark"
            onChange={handleChange}
          />
          <label>PracticalMark:</label>
          <Input
            type="number"
            placeholder="Enter practicalMark"
            value={formState.practicalMark}
            name="practicalMark"
            onChange={handleChange}
          />
          <label>PassMark:</label>
          <Input
            type="number"
            placeholder="Enter passMark"
            value={formState.passMark}
            name="passMark"
            onChange={handleChange}
          />
          <label>Classes:</label>
          <div className="flex flex-wrap mt-1 space-x-2">
            {classList.map((_class, i) => (
              <div className="flex space-x-1" key={i}>
                <div>{_class.name}</div>
                <input
                  type="checkbox"
                  class_id={_class._id}
                  checked={
                    formState.classes.includes(_class._id) ? true : false
                  }
                  onChange={handleCheckboxChange}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <Button variant="green">Update</Button>
          </div>
        </form>
      </FormContainer>
    </Content>
  );
};

export default UpdateSubject;
