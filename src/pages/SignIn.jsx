import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";
import { useAlert } from "../context/AlertContext";
import { useUserState } from "../context/UserContext";
import Form from "../components/form/Form";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import { SUCCESS } from "../context/AlertContext";
import Spinner from "../components/spinner/Spinner";

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
          <Button
            type="submit"
            style={{ pointerEvents: userInfo.isPending ? "none" : "all" }}
          >
            {userInfo.isPending ? <Spinner /> : "Sign In"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
