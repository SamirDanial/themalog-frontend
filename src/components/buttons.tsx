import React from "react";

type ButtonType = {
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  onClick?: () => void;
  className?: string;
};

export const PrimaryButton: React.FC<ButtonType> = ({
  type,
  text,
  onClick,
  className,
}) => {
  return (
    <button
      className={`mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider ${className}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
