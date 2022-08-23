import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";

const SubjectCheckbox = ({
  formState,
  setFormState,
  forClass: nameOfClass,
  name = "subjects",
}) => {
  const [subjectOptions, setSubjectOptions] = useState([]);

  const handleCheckboxChange = ({ target }, subjectId) => {
    const newSubjects = formState[name];

    if (target.checked) {
      newSubjects.push(subjectId);
      setFormState({ ...formState, [name]: newSubjects });
    } else {
      newSubjects.splice(newSubjects.indexOf(subjectId), 1);
      setFormState({
        ...formState,
        [name]: newSubjects,
      });
    }
  };

  useEffect(() => {
    setFormState({ ...formState, [name]: [] });

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
    <div className="flex space-x-2">
      <label>Subjects:</label>
      {subjectOptions.map((subjectItem, i) => (
        <div className="flex mr-2 space-x-1" key={i}>
          <span>{subjectItem.name}</span>
          <input
            type="checkbox"
            checked={formState[name].includes(subjectItem._id)}
            onChange={(e) => handleCheckboxChange(e, subjectItem._id)}
          />
        </div>
      ))}
    </div>
  );
};

export default SubjectCheckbox;
