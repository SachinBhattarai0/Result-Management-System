import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import { useUserState } from "../context/UserContext";
import { SUCCESS } from "../context/AlertContext";
import Form from "../container/form/Form";
import Button from "../container/form/Button";
import Input from "../container/form/Input";
import Spinner from "../container/spinner/Spinner";

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { updateAlert } = useAlert();
  const { userInfo, setUserInfo } = useUserState();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUserInfo({ ...userInfo, isPending: true });

      const { data } = await api.post("/user/sign-in", { ...loginInfo });
      setUserInfo({
        ...userInfo,
        ...data.user,
        isAuthenticated: true,
        isPending: false,
      });
      localStorage.setItem("jwtToken", data.jwtToken);
      updateAlert("Login Successfull!", SUCCESS);
    } catch (error) {
      setUserInfo({ ...userInfo, isPending: false });
      updateAlert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (userInfo.isAuthenticated)
      navigate("/rms/assignment/", { replace: true });
  }, [userInfo.isAuthenticated]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Form onSubmit={handleSubmit}>
        <h2 className="text-3xl">RMS LOGIN</h2>
        <Input
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          value={loginInfo.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          placeholder="password"
          type="password"
          value={loginInfo.password}
          onChange={handleChange}
        />

        <div className="flex flex-col">
          <Button type="submit" isPending={userInfo.isPending}>
            {userInfo.isPending ? <Spinner /> : "Sign In"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
