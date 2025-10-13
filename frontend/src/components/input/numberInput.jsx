import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = ({ inputId, min, max, step, value, onChange, placeholder }) => {
  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    onChange(newValue);
  };

  return (
    <div className="relative text-gray-500 transition duration-150
     rounded-lg border border-gray-500
     hover:ring-orange-main hover:border-transparent hover:ring-1 hover:text-orange-main
      focus-within:text-orange-main
     ">
      <input
        type="number"
        id={inputId}
        name={inputId}
        value={value || 0}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        className="w-full h-8 sm:h-9 pl-10 pr-2.5 py-2
            text-xs sm:text-sm border rounded-lg border-transparent 
            focus:border-b-orange-main focus:border-transparent focus:outline-none 
            focus:ring-2 focus:ring-orange-main focus:text-gray-600"
        placeholder={placeholder}
      />
    </div>
  );
};

NumberInput.propTypes = {
  inputId: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

NumberInput.defaultProps = {
  onChange: () => {}, // Default no-op function for onChange
};

export default NumberInput;
