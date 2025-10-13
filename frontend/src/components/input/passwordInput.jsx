import React, { useState } from 'react';

const PasswordInput = ({ inputId, label, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = showPassword ? 'text' : 'password';

  return (
    <div className="relative text-gray-500 transition duration-150
    rounded-lg border border-gray-500
    hover:ring-orange-main hover:border-transparent hover:ring-1 hover:text-orange-main
     focus-within:text-orange-main focus-within:ring-orange-main
    ">
      {label && (
        <label
          htmlFor={inputId}
          className="absolute -top-2 left-4 text-sm font-medium px-2 py-0 bg-white"
        >
          {label}
        </label>
      )}
      <input
        type={inputType}
        id={inputId}
        name={inputId}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full h-8 sm:h-9 pl-10 pr-2.5 py-2.5
        text-xs sm:text-sm border rounded-lg border-transparent 
        focus:border-b-orange-main focus:border-transparent focus:outline-none 
        focus:ring-2 focus:ring-orange-main focus:text-gray-600"
      />

      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5">
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="cursor-pointer"
        >
          {!showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
