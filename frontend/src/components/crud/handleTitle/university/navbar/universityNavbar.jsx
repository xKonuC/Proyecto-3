import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleTitle/university/universitySlice';

import SearchAndSort from '../../../../navbar/management/searchAndSort';

const options = [
    { label: `ID`, value: 'universityID' },
    { label: `Nombre`, value: 'name' },
    { label: `Ciudad`, value: 'city' },
    { label: `País`, value: 'country' },
];

const UniversityNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleTitle.university);

    return (
        <>
            <SearchAndSort options={options} items={items} filteredItems={filteredItems} setFilteredItems={{setFilteredItems}} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default UniversityNavbar;
