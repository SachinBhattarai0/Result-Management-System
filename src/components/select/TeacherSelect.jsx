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
}) => {
  const [teacherOptions, setTeacherOptions] = useState([]);

  const handleChange = (target) => {
    setFormState({ ...formState, [name]: target.value });
  };

  useEffect(() => {
    apiWithJwt("/user/get-all-teachers/")
      .then(({ data }) => setTeacherOptions(data.teachers))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col">
      <label>{label}:</label>
      <Select
        name={name}
        onChange={(e) => handleChange(e.target)}
        value={formState[name]}
      >
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
