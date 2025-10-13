// Checkbox.js

import React from 'react';

const Checkbox = ({ id, name, checked, onChange }) => {
  return (
    <>
      <input
        id={id}
        name={name}
        type="checkbox"
        className="form-checkbox h-5 w-5 rounded border-orange-main text-orange-main transition duration-300 hover:ring-2 hover:ring-orange-main ease-in-out"
        checked={checked}
        onChange={onChange}
      />
    </>
  );
};

export default Checkbox;
