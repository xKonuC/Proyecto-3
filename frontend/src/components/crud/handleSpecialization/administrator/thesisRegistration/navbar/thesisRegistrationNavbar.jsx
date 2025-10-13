import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../../redux/slice/handleSpecialization/administrative/thesisRegistrationSlice';

import SearchAndSort from '../../../../../navbar/management/searchAndSort';
import { thesisRegistrationOptions as options } from '../../../../../../utils/crudHelpers/options';

const ThesisRegistrationNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleSpecialization.administrative.thesisRegistration);

    return (
        <>
            <SearchAndSort options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default ThesisRegistrationNavbar;
