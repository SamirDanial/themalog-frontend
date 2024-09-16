import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Please enter your password"),
});

export const TemperatureSchema = yup.object().shape({
  sensor_id: yup.string().required(),
  temperature: yup.string().required(),
});
