import React, { useState, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

// Componentes
// import SearchWithSelect from '../../../../../search/searchWithSelect';
import StudentHasElectiveSection from '../section/studentHasElectiveSection';

// Utilidades
import { getCurrentPageItems } from '../../../../../../utils/crudHelpers/helperFilter';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../../../utils/crudHelpers/constants';

//Estilos

const StudentHasElectiveOverview
    = memo((props) => {
        const { url, itemName, permission, isLoading, showAlert, responseHandler } = props;
        const { studentHasElective } = useSelector((state) => state.handleSpecialization.student.studentHasElective);

        const [searchType, setSearchType] = useState('studentHasElectiveID');
        const [searchTerm, setSearchTerm] = useState('');

        const currentItems = useMemo(
            () => getCurrentPageItems(ITEMS_PER_PAGE, 1, studentHasElective, searchTerm, searchType, 'studentHasElectiveID', 'desc'),
            [studentHasElective, searchTerm, searchType]
        );

        return (
            <>
                <div className="mx-auto max-w-5xl">
                    {/* <SearchWithSelect selectId={`${searchType}`} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchType={searchType} setSearchType={setSearchType} options={options} /> */}
                </div>
                <StudentHasElectiveSection items={currentItems} url={url} permission={permission} isLoading={isLoading} itemName={itemName} showAlert={showAlert} responseHandler={responseHandler} />
            </>
        )
    });

export default StudentHasElectiveOverview;
