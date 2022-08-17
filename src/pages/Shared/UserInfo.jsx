import React from "react";
import { useState } from "react";
import { SUCCESS, useAlert } from "../../context/AlertContext";
import { useUserState } from "../../context/UserContext";
import { apiWithJwt } from "../../axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import Button from "../../components/form/Button";
import Content from "../../components/content/Content";

const UserInfo = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserState();
  const { updateAlert } = useAlert();
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    isPending: false,
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ ...formState, isPending: true });
    try {
      const { data } = await apiWithJwt("/user/update-password/", {
        ...formState,
        userId: userInfo.id,
      });

      updateAlert(data.message, SUCCESS);
      navigate(-1, { replace: true });
    } catch (error) {
      updateAlert(error.response.data.message);
    }
    setFormState({ ...formState, isPending: false });
  };

  return (
    <Content>
      <div className="bg-white block justify-center items-center mx-auto md:w-1/2 p-8 shadow-xl">
        <h2 className="text-xl">My Info:</h2>
        <hr />

        <div className="mt-3 text-gray-600">
          <div className="flex">
            <span className="mr-1">Name: </span>
            <span>{userInfo.name}</span>
          </div>
          <div className="flex">
            <span className="mr-1">Email: </span>
            <span>{userInfo.email}</span>
          </div>
          <div className="flex">
            <span className="mr-1">Role: </span>
            <span>{userInfo.role}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col mt-2">
          <h2 className="text-lg">Change Password:</h2>
          <hr />
          <input
            type="password"
            className="outline-none border-b-2 border-b-gray-400 focus:border-b-bluish p-1 mt-2"
            placeholder="Current Password"
            value={formState.currentPassword}
            name="currentPassword"
            onChange={handleChange}
          />
          <div className="flex flex-wrap space-x-1 w-full">
            <input
              type="password"
              className="outline-none border-b-2 border-b-gray-400 focus:border-b-bluish p-1 mt-3 flex-1"
              placeholder="New Password"
              value={formState.newPassword}
              name="newPassword"
              onChange={handleChange}
            />
            <input
              type="password"
              className="outline-none border-b-2 border-b-gray-400 focus:border-b-bluish p-1 mt-3 flex-1"
              placeholder="Confirm New Password"
              value={formState.confirmNewPassword}
              name="confirmNewPassword"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mt-3">
            <Button variant="gray" isPending={formState.isPending}>
              {formState.isPending ? <Spinner /> : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </Content>
  );
};

export default UserInfo;
