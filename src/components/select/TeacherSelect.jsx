import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiWithJwt } from "../../axios";
import Select from "../../container/form/Select";

const TeacherSelect = ({
  formState,
  setFormState,
  name = "teacher",
  label = "Teacher",
  extraOnChangeEvent = () => {}, //this is any extra event to run on value change
}) => {
  const [teacherOptions, setTeacherOptions] = useState([]);

  const handleChange = (e) => {
    setFormState({ ...formState, [name]: e.target.value });
    extraOnChangeEvent(e);
  };

  useEffect(() => {
    apiWithJwt("/user/get-all-teachers/")
      .then(({ data }) => setTeacherOptions(data.teachers))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col">
      <label>{label}:</label>
      <Select name={name} onChange={handleChange} value={formState[name]}>
        {teacherOptions.map((teacher) => (
          <option key={teacher._id} value={teacher._id}>
            {teacher.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default TeacherSelect;
