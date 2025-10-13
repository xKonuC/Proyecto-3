import React from 'react';
import Checkbox from '../../input/checkbox';

export const CheckboxCell = ({ id, checked, onChange }) => (
    <td className='whitespace-nowrap px-2 py-2'>
        <Checkbox id={id} name={id} checked={checked} onChange={onChange} />
    </td>
);

export const ItemCell = ({ value }) => (
    <td className='whitespace-nowrap px-4 py-2'>{value}</td>
);

export const ActionsCell = ({ children }) => (
    <td className='whitespace-nowrap px-4 py-2'>
        <div className="flex items-center justify-center gap-2">
        {children}
        </div>
    </td>
);