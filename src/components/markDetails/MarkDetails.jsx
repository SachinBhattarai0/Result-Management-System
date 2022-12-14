import React from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";
import { SUCCESS } from "../../context/AlertContext";
import { useAlert } from "../../context/AlertContext";
import Spinner from "../../container/spinner/Spinner";
import ButtonOutlined from "../../container/form/ButtonOutlined";

const MarkDetails = ({ marks, markId }) => {
  const defaultFormState = marks.reduce((pv, cv) => {
    return {
      ...pv,
      [cv.subject]: {
        theoryMark: cv.theoryMark,
        practicalMark: cv.practicalMark,
      },
    };
  }, {});
  const [formState, setFormState] = useState(defaultFormState);
  const [markEditOpen, setMarkEditOpen] = useState(false);
  const [isUpdating, setisUpdating] = useState(false);
  const { updateAlert } = useAlert();

  const handleMarkSaveButtonClick = async () => {
    setisUpdating(true);
    try {
      const { data } = await apiWithJwt("/mark/update-marks/", {
        marks: { ...formState },
        markId,
      });
      updateAlert(data.message, SUCCESS);
      setMarkEditOpen(false);
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setisUpdating(false);
  };

  const handleTheoryMarkChange = (target, subject) => {
    const newValue = formState[subject];
    newValue.theoryMark = target.value;
    setFormState({ ...formState, [subject]: newValue });
  };
  const handlePracticalMarkChange = (target, subject) => {
    const newValue = formState[subject];
    newValue.practicalMark = target.value;
    setFormState({ ...formState, [subject]: newValue });
  };

  return (
    <div className="relative mx-12 flex flex-col space-y-3">
      {markEditOpen ? (
        <ButtonOutlined onClick={handleMarkSaveButtonClick} variant="green">
          {isUpdating ? <Spinner /> : "Save"}
        </ButtonOutlined>
      ) : (
        <ButtonOutlined onClick={() => setMarkEditOpen(!markEditOpen)}>
          Edit
        </ButtonOutlined>
      )}
      {marks.map((subjectMark, i) => (
        <div key={i} className="flex space-x-10">
          <span className="w-28">{subjectMark.subject}</span>
          {markEditOpen ? (
            <>
              <span>
                th:{" "}
                <input
                  type="number"
                  className="w-12 h-6 outline-none border border-gray-500 text-center"
                  onChange={(e) =>
                    handleTheoryMarkChange(e.target, subjectMark.subject)
                  }
                  value={formState[subjectMark.subject].theoryMark}
                />
              </span>
              <span>
                pr:{" "}
                <input
                  type="number"
                  className="w-12 h-6 outline-none border border-gray-500 text-center"
                  onChange={(e) =>
                    handlePracticalMarkChange(e.target, subjectMark.subject)
                  }
                  value={formState[subjectMark.subject].practicalMark}
                />
              </span>
            </>
          ) : (
            <>
              <span className="w-12 h-6">
                th: {formState[subjectMark.subject].theoryMark}
              </span>
              <span className="w-12 h-6">
                pr: {formState[subjectMark.subject].practicalMark}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MarkDetails;
