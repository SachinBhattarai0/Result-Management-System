import React from "react";
import { useState } from "react";
import { apiWithJwt } from "../../axios";
import { SUCCESS } from "../../context/AlertContext";
import { useAlert } from "../../context/AlertContext";
import Button from "../../container/form/Button";
import Spinner from "../../container/spinner/Spinner";
import FormContainer from "../../components/formContainer/FormContainer";
import ClassSelect from "../../components/select/ClassSelect";
import Content from "../../container/content/Content";

const StudentPromotion = () => {
  const defaultState = {
    classToPromote: "",
    classToPromoteTo: "",
    passed: false,
  };

  const { updateAlert } = useAlert();
  const [isPromoting, setIsPromoting] = useState(false);
  const [formState, setFormState] = useState(defaultState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPromoting(true);
    try {
      const { data } = await apiWithJwt("/user/promote-student/", {
        ...formState,
      });
      updateAlert(data.message, SUCCESS);
      setFormState(defaultState);
    } catch (error) {
      updateAlert(error.message);
    }
    setIsPromoting(false);
  };

  return (
    <Content>
      <FormContainer title="Promote Student:">
        <form onSubmit={handleSubmit} className="mt-3">
          <ClassSelect
            name="classToPromote"
            label="ClassToPromote"
            formState={formState}
            setFormState={setFormState}
          />
          {formState.passed !== true && (
            <ClassSelect
              name="classToPromoteTo"
              label="ClassToPromoteTo"
              formState={formState}
              setFormState={setFormState}
            />
          )}
          <div className="flex space-x-2">
            <label>Passed:</label>
            <input
              type="checkbox"
              checked={formState.passed}
              onChange={(e) =>
                setFormState({ ...formState, passed: e.target.checked })
              }
            />
          </div>
          <div className="flex flex-col mt-3">
            <Button variant="green">
              {isPromoting ? <Spinner /> : "Promote"}
            </Button>
          </div>
        </form>
      </FormContainer>
    </Content>
  );
};

export default StudentPromotion;
