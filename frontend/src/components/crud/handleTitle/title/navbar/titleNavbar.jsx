import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleTitle/title/titleSlice';

import SearchAndSort from '../../../../navbar/management/searchAndSort';

const options = [
    { label: `ID`, value: 'titleID' },
    { label: `Nombre del Titulo`, value: 'name' },
    { label: 'Área del Título', value: 'areaName' },
    { label: `Nombre de la Universidad`, value: 'universityName' },
    { label: `País`, value: 'country' },
    { label: `Ciudad`, value: 'city' },
    { label: `Grado`, value: 'degree' },
    { label: `Tipo`, value: 'type' },
];

const TitleNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleTitle.title);

    return (
        <>
            <SearchAndSort options={options} items={items} filteredItems={filteredItems} setFilteredItems={{setFilteredItems}} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default TitleNavbar;
