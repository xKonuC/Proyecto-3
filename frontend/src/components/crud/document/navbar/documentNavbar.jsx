import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../redux/slice/document/documentSlice';

import SearchAndSort from '../../../navbar/management/searchAndSort';

const options = [
    { label: `Categoría del Documento`, value: 'category' },
    { label: `Formato del Documento`, value: 'format.name' },
];

const DocumentNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.document);

    return (
        <>
            <SearchAndSort options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default DocumentNavbar;
