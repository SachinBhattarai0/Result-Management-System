import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiWithJwt } from "../../axios";
import Select from "../../container/form/Select";

const ClassSelect = ({ formState, setFormState, name = "class" }) => {
  const [classOptions, setClassOptions] = useState([]);

  const handleChange = (target) => {
    setFormState({ ...formState, [name]: target.value });
  };

  useEffect(() => {
    apiWithJwt("/class/get-all/")
      .then(({ data }) => setClassOptions(data.class))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col">
      <label>Class:</label>
      <Select
        name={name}
        onChange={(e) => handleChange(e.target)}
        value={formState[name]}
      >
        {classOptions.map((_class) => (
          <option key={_class._id} value={_class._id}>
            {_class.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default ClassSelect;
