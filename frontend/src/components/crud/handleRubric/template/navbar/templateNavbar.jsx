import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleRubric/template/templateSlice';

import SearchAndSort from '../../../../navbar/management/searchAndSort';

const options = [
    { label: `ID`, value: 'templateID' },
    { label: `Nombre`, value: 'name' },
    { label: `Descripción`, value: 'description' },
    { label: `Estado`, value: 'isActive' },
];

const TemplateNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleRubric.template);

    return (
        <>
            <SearchAndSort options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default TemplateNavbar;
