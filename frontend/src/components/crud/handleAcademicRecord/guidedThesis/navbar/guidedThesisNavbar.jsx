import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleAcademicRecord/guidedThesis/guidedThesisSlice';

import RecordManagement from '../../../../navbar/management/recordManagement';
import { guidedThesisOptions as options } from '../../../../../utils/crudHelpers/options';

const GuidedThesisNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleAcademicRecord.guidedThesis);

    return (
        <>
            <RecordManagement options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default GuidedThesisNavbar;
