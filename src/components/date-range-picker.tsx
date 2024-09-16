import React from "react";

type DateRangePickerType = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name: string;
  id: string;
  label: string;
};

const DateRangePicker: React.FC<DateRangePickerType> = ({
  id,
  name,
  onChange,
  value = "",
  label,
}) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <label htmlFor={name}>{label}:</label>
      <input
        className={`text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded`}
        type="date"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default DateRangePicker;
