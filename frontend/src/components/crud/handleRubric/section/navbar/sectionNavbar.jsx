import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleRubric/section/sectionSlice';

import SearchAndSort from '../../../../navbar/management/searchAndSort';

const options = [
    { label: `ID`, value: 'sectionID' },
    { label: `Nombre de la Sección`, value: 'name' },
    { label: `Estado`, value: 'isActive' },
];

const SectionNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleRubric.section);

    return (
        <>
            <SearchAndSort options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default SectionNavbar;
