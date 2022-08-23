import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";

const ClassCheckbox = ({ formState, setFormState, name = "classes" }) => {
  const [classOptions, setClassOptions] = useState([]);

  const handleCheckboxChange = ({ target }, classId) => {
    const newClasses = formState[name];

    if (target.checked) {
      newClasses.push(classId);
      setFormState({ ...formState, [name]: newClasses });
    } else {
      newClasses.splice(newClasses.indexOf(classId), 1);
      setFormState({
        ...formState,
        [name]: newClasses,
      });
    }
  };

  useEffect(() => {
    apiWithJwt("/class/get-all/")
      .then(({ data }) => setClassOptions(data.class))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex space-x-2">
      <label>Classes:</label>
      {classOptions.map((classItem, i) => (
        <div className="flex mr-2 space-x-1" key={i}>
          <span>{classItem.name}</span>
          <input
            type="checkbox"
            checked={formState[name].includes(classItem._id)}
            onChange={(e) => handleCheckboxChange(e, classItem._id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ClassCheckbox;
