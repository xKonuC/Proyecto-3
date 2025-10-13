import React from 'react';

const defaultIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    />
  </svg>
);

const TextInput = ({ inputId, label, value, onChange, placeholder, type = "text", icon = defaultIcon }) => {
  const handleChange = (event) => {
    // Convertir a número si el tipo es number, de lo contrario usar el valor string
    const newValue = type === 'number' ? (event.target.value === '' ? '' : Number(event.target.value)) : event.target.value;
    onChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };

  // Establecer correctamente el valor para el input
  const inputValue = type === 'number' ? (value === undefined || value === '' ? '' : Number(value)) : value;

  return (
    <div className="relative text-gray-500 transition duration-150
     rounded-lg border border-gray-500
     hover:ring-orange-main hover:border-transparent hover:ring-1 hover:text-orange-main
      focus-within:text-orange-main
     ">
      {label && (
        <label
          htmlFor={inputId}
          className="absolute -top-2 left-4 text-xs font-medium px-2 py-0 bg-white"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={inputId}
        value={inputValue}
        onChange={handleChange}
        autoComplete="off"
        className="w-full h-10 pl-10 pr-2.5 py-3
        text-xs sm:text-sm border rounded-lg border-transparent 
        focus:border-b-orange-main focus:border-transparent focus:outline-none 
        focus:ring-2 focus:ring-orange-main focus:text-gray-600"
        placeholder={placeholder}
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5">
        {icon}
      </span>
    </div>
  );
};

export default TextInput;
