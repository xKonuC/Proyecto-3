import React from 'react';
import Checkbox from '../../input/checkbox';

export const CheckboxCell = ({ id, checked, onChange }) => (
    <div className="absolute top-0 left-0">
        <Checkbox id={id} name={id} checked={checked} onChange={onChange} />
    </div>
);

export const ItemCell = ({ value }) => (
    <td className='whitespace-nowrap px-4 py-2'>{value}</td>
);

export const ActionsCell = ({ children }) => (
    <td className='whitespace-nowrap px-4 py-2 flex gap-2'>
        {children}
    </td>
);