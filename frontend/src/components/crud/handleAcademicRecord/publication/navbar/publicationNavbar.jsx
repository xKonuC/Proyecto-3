import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleAcademicRecord/publication/publicationSlice';

import RecordManagement from '../../../../navbar/management/recordManagement';
import { publicationOptions as options } from '../../../../../utils/crudHelpers/options';

const PublicationNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleAcademicRecord.publication);

    return (
        <>
            <RecordManagement options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default PublicationNavbar;
