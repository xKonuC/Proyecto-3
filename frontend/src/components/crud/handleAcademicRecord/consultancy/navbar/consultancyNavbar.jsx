import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleAcademicRecord/consultancy/consultancySlice';

import RecordManagement from '../../../../navbar/management/recordManagement';
import { consultancyOptions as options } from '../../../../../utils/crudHelpers/options';

const ConsultancyNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleAcademicRecord.consultancy);

    return (
        <>
            <RecordManagement options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default ConsultancyNavbar;
