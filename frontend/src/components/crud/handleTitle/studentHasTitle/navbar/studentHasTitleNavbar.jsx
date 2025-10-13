import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleTitle/studentHasTitle/studentHasTitleSlice';

import SearchAndSort from '../../../../navbar/management/searchAndSort';

const options = [
    { label: `Año de Obtención del Título`, value: 'titleYear' },
    { label: `Nombre del Titulo`, value: 'title.name' },
    { label: `Nombre de la Universidad`, value: 'title.universityName' },
    { label: `País`, value: 'title.country' },
    { label: `Ciudad`, value: 'title.city' },
    { label: `Grado`, value: 'title.degree' },
    { label: `Tipo`, value: 'title.type' },
    { label: `Formato`, value: 'format.name' },
];

const StudentHasTitle = () => {
    const { items, filteredItems } = useSelector((state) => state.handleTitle.studentHasTitle);

    return (
        <>
            <SearchAndSort options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default StudentHasTitle;
