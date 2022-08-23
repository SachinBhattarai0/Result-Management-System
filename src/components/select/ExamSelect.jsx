import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiWithJwt } from "../../axios";
import Select from "../../container/form/Select";

const ExamSelect = ({ formState, setFormState, name = "exam" }) => {
  const [examOptions, setExamOptions] = useState([]);

  const handleChange = (target) => {
    setFormState({ ...formState, [name]: target.value });
  };

  useEffect(() => {
    apiWithJwt("/exam/get-all/")
      .then(({ data }) => setExamOptions(data.exams))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col">
      <label>Exam:</label>
      <Select
        name={name}
        onChange={(e) => handleChange(e.target)}
        value={formState[name]}
      >
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
