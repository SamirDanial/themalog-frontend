import React from "react";
import TextInput from "./text-input";
import { useFormik } from "formik";
import { TemperatureSchema } from "../schemas";
import axiosInstance from "../libs/axios_instance";
import { useMutation } from "@tanstack/react-query";
import { PrimaryButton } from "./buttons";

type AddNewTemperatureType = {
  onClose: () => void;
};

const addNewTemperature = async (data: {
  sensor_id: string;
  temperature: number;
}) => {
  const response = await axiosInstance.post("/temperatures", {
    sensor_id: data.sensor_id,
    temperature: data.temperature,
    timestamp: new Date().toISOString(),
  });

  return response.data;
};

const AddNewTemperature: React.FC<AddNewTemperatureType> = ({ onClose }) => {
  const mutation = useMutation({
    mutationFn: addNewTemperature,
    onSuccess: () => {
      resetForm();
      onClose();
    },
  });
  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      sensor_id: "",
      temperature: "",
    },
    onSubmit: (values) => {
      mutation.mutate({
        sensor_id: values.sensor_id,
        temperature: +values.temperature,
      });
    },
    validationSchema: TemperatureSchema,
  });
  return (
    <div className="w-[250px] h-[220px] sm:rounded-md bg-gray-50 z-50 fixed flex flex-col items-center top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="pt-4 uppercase">add new temperature</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <TextInput
          type="text"
          placeholder="Sensore ID"
          name="sensor_id"
          id="sensor_id"
          className="mt-5"
          onChange={handleChange}
          value={values.sensor_id}
        />
        <TextInput
          type="number"
          placeholder="Temperature"
          name="temperature"
          id="temperature"
          className="mt-5"
          onChange={handleChange}
          value={values.temperature}
        />
        <PrimaryButton type="submit" text="Submit" />
      </form>
    </div>
  );
};

export default AddNewTemperature;
