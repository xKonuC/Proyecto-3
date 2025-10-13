import React from 'react';
import SortButton from './sortButton';

const SortOptions = ({ options, sortProperty, setSortProperty, setSortDirection, sortDirection }) => {
    return (
        <ul className="border-t border-gray-200 p-2 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
            {options.map((option) => (
                <li key={option.value} className="inline-flex start-center md:justify-center items-center my-1 md:my-2 gap-2">
                    <SortButton
                        value={option.value}
                        sortProperty={sortProperty}
                        setSortProperty={setSortProperty}
                        setSortDirection={setSortDirection}
                        isActive={sortProperty === option.value}
                        isAscending={sortDirection === 'asc'}
                    />
                    <span className="text-sm font-medium text-gray-700">
                        {option.label}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default SortOptions;
