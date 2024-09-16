import React from "react";

type TextInputType = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type: string;
  placeholder?: string;
  name: string;
  id: string;
  className?: string;
};

const TextInput: React.FC<TextInputType> = ({
  onChange,
  value,
  id,
  name,
  placeholder,
  type,
  className,
}) => {
  return (
    <input
      className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded ${className}`}
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextInput;
