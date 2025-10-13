import React from 'react';
import Select from 'react-select';

const MultiSelect = ({ selectId, placeholder, options, selectedRoles, setSelectedRoles }) => {
  const handleRoleChange = (selectedValues) => {
    setSelectedRoles(selectedValues);
  };

  return (
    <div className="relative flex items-center">
      <Select
        id={selectId}
        name={selectId}
        className="w-full h-8 sm:h-9 rounded-lg border-gray-500 text-gray-700 text-xs sm:text-sm text-start
        focus:border-b-orange-main focus:border-transparent focus:outline-none 
        focus:ring-2"
        isMulti
        options={options}
        value={selectedRoles}
        onChange={handleRoleChange}
        placeholder={placeholder}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      />
    </div>
  );
};

export default MultiSelect;