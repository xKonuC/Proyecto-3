import React from 'react';
import Checkbox from '../input/checkbox';

const Table = ({ theadContent, tbodyContent, hasCheckbox, selectAll, onChange }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y-2 divide-gray-200 text-sm'>
        <thead className='ltr:text-left rtl:text-right'>
          <tr>
            {hasCheckbox && (
              <th className='whitespace-nowrap px-4 py-2'>
                <Checkbox id='deleteAllInput' name='deleteAllInput' checked={selectAll} onChange={onChange} />
              </th>
            )}
            {theadContent}
            {hasCheckbox && (
              <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className='ltr:text-left rtl:text-right'>
          {tbodyContent}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
