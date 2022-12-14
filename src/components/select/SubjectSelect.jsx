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
  label = "Subject",
  extraOnChangeEvent = () => {}, //this is any extra event to run on value change
}) => {
  const selectRef = useRef();
  const [subjectOptions, setSubjectOptions] = useState([]);

  const handleChange = (e) => {
    setFormState({ ...formState, [name]: e.target.value });
    extraOnChangeEvent(e);
  };

  //This useEffect makes sure that whenever user changes class
  //the subject which belong to previous class doesnot remain
  //in the formState
  useEffect(() => {
    if (!subjectOptions[0]) return;

    const prevSubject = formState.subject;
    if (!subjectOptions.map((s) => s._id).includes(prevSubject))
      setFormState({ ...formState, [name]: "" });
  }, [subjectOptions]);

  useEffect(() => {
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
      <label>{label}:</label>
      <Select name={name} onChange={handleChange} value={formState[name]}>
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
