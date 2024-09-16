import React from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { LoginSchema } from "../schemas/index";
import TextInput from "../components/text-input";
import Checkbox from "../components/checkbox";
import { PrimaryButton } from "../components/buttons";
import axiosInstance from "../libs/axios_instance";
import { useAuthStore } from "../store/useAuthStore";

const login = async (data: { username: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

const Login: React.FC = () => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const token = response.access_token;
      useAuthStore.getState().login(token);
      resetForm();
    },
    onError: (error) => {
      alert("Error Happened");
    },
  });
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutation.mutate({ username: values.email, password: values.password });
    },
    validationSchema: LoginSchema,
  });
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample Portrate"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left mb-3">
          <label className="mr-1">Login</label>
        </div>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Email Address"
            name="email"
            id="email"
            onChange={handleChange}
            value={values.email}
          />

          <TextInput
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={handleChange}
            value={values.password}
            className="mt-4"
          />

          <div className="mt-4 flex justify-between font-semibold text-sm">
            <Checkbox type="checkbox" label="Remember Me" />
            <p className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4 cursor-pointer">
              Forgot Password?
            </p>
          </div>

          <div className="text-center md:text-left">
            <PrimaryButton type="submit" text="Login" />
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?{" "}
          <p className="text-red-600 hover:underline hover:underline-offset-4 cursor-pointer">
            Register
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
