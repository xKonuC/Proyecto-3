import React from 'react';

const TextArea = ({ inputId, label, value, onChange, placeholder, isEditable = true }) => {

  const handleChange = (event) => {
    if (isEditable) {
      onChange(event);
    }
  };

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
      <textarea
        id={inputId}
        name={inputId}
        value={value || ''}
        rows="2"
        onChange={handleChange}
        className="w-full py-3
        text-xs sm:text-sm border rounded-lg border-transparent 
        focus:border-b-orange-main focus:border-transparent focus:outline-none 
        focus:ring-2 focus:ring-orange-main focus:text-gray-600"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextArea;
