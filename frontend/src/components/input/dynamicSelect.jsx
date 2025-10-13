import React from 'react';

const DynamicSelect = ({ selectId, label, options, value, onChange }) => {
    return (
        <select
            id={selectId}
            name={selectId}
            className="w-full h-8 sm:h-10 py-1 rounded-lg border-gray-500 text-gray-700 text-xs sm:text-sm text-start 
            hover:ring-orange-main hover:border-transparent hover:ring-1"
            value={value !== null && value !== undefined ? value : ''}
            onChange={onChange}
        >
            <option value="">{label}</option>
            {options.map((option, index) => (
                typeof option === 'string' ? (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ) : (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                )
            ))}
        </select>
    );
};

export default DynamicSelect;
