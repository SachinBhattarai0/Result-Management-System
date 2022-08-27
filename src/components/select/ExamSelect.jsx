import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiWithJwt } from "../../axios";
import Select from "../../container/form/Select";

const ExamSelect = ({
  formState,
  setFormState,
  name = "exam",
  label = "Exam",
  extraOnChangeEvent = () => {}, //this is any extra event to run on value change
}) => {
  const [examOptions, setExamOptions] = useState([]);

  const handleChange = (e) => {
    setFormState({ ...formState, [name]: e.target.value });
    extraOnChangeEvent(e);
  };

  useEffect(() => {
    apiWithJwt("/exam/get-all/")
      .then(({ data }) => setExamOptions(data.exams))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col">
      <label>{label}:</label>
      <Select name={name} onChange={handleChange} value={formState[name]}>
        {examOptions.map((exam) => (
          <option key={exam._id} value={exam._id}>
            {exam.name} ({exam.year}-{exam.month}-{exam.date})
          </option>
        ))}
      </Select>
    </div>
  );
};

export default ExamSelect;
