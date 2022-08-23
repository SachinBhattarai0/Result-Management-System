import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiWithJwt } from "../../axios";
import Select from "../../container/form/Select";

const SubjectSelect = ({
  formState,
  setFormState,
  forClass: nameOfClass,
  name = "subject",
}) => {
  const selectRef = useRef();
  const [subjectOptions, setSubjectOptions] = useState([]);

  const handleChange = (target) => {
    setFormState({ ...formState, [name]: target.value });
  };

  useEffect(() => {
    setFormState({ ...formState, [name]: "" });

    if (nameOfClass) {
      apiWithJwt("/subject/get-for-class/", { class: nameOfClass })
        .then(({ data }) => setSubjectOptions(data.subjects))
        .catch((err) => console.log(err));
    } else {
      apiWithJwt("/subject/get-all/", { class: nameOfClass })
        .then(({ data }) => setSubjectOptions(data.subjects))
        .catch((err) => console.log(err));
    }
  }, [nameOfClass]);

  return (
    <div className="flex flex-col">
      <label>Subject:</label>
      <Select
        name={name}
        onChange={(e) => handleChange(e.target)}
        value={formState[name]}
      >
        {subjectOptions.map((subject) => (
          <option key={subject._id} value={subject._id} ref={selectRef}>
            {subject.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SubjectSelect;
