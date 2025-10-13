import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleAcademicRecord/project/projectSlice';

import RecordManagement from '../../../../navbar/management/recordManagement';
import { projectOptions as options } from '../../../../../utils/crudHelpers/options';

const ProjectNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleAcademicRecord.project);

    return (
        <>
            <RecordManagement options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default ProjectNavbar;
