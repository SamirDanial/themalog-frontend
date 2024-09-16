import React from "react";

type CheckboxType = {
  type: string;
  label?: string;
};

const Checkbox: React.FC<CheckboxType> = ({ type, label }) => {
  return (
    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
      <input className="mr-1" type={type} />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
