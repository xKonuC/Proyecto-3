import React from 'react';
import Select from 'react-select';

const SearchSelect = ({ selectId, placeholder, options, value, onChange }) => {
  const handleSelectChange = (selectedOption) => {
    onChange(selectedOption);
  };

  // Verificar si las Acciones son nulas o indefinidas
  const selectOptions = options || [];

  return (
    <div className="relative flex items-center">
      <Select
        id={selectId}
        name={selectId}
        className="z-10 w-full h-6 sm:h-9 mb-3 sm:mb-1 rounded-lg border-gray-300 text-gray-700 text-xs sm:text-sm text-start"
        options={selectOptions}
        value={value === null ? null : selectOptions.find(option => option.value === value)}
        onChange={handleSelectChange}
        placeholder={placeholder}
        // Renderizar el menú del select en el body del documento
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
      />
    </div>
  );
};

export default SearchSelect;
