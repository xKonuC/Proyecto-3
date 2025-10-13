import React, { useState, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

// Componentes
import SearchWithSelect from '../../../../../search/searchWithSelect';
import StudentHasSemesterSection from '../section/studentHasSemesterSection';

// Utilidades
import { getCurrentPageItems } from '../../../../../../utils/crudHelpers/helperFilter';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../../../utils/crudHelpers/constants';

//Estilos

const StudentHasSemesterOverview
    = memo((props) => {
        const { url, itemName, permission, isLoading, showAlert, responseHandler } = props;
        const { studentHasSemester } = useSelector((state) => state.handleSpecialization.student.studentHasSemester);

        const options = [
            { label: `Tipo de Evaluación`, value: 'evaluationType.name' },
            { label: `Linea de Formación`, value: 'specialization.name' },
            { label: `Número del Semestre`, value: 'semester.semesterNumber' },
            { label: `Año del Semestre`, value: 'semester.year' },
        ];

        const [searchType, setSearchType] = useState('studentHasSemesterID');
        const [searchTerm, setSearchTerm] = useState('');

        const currentItems = useMemo(
            () => getCurrentPageItems(ITEMS_PER_PAGE, 1, studentHasSemester, searchTerm, searchType, 'studentHasSemesterID', 'desc'),
            [studentHasSemester, searchTerm, searchType]
        );

        return (
            <>
                <div className="mx-auto max-w-5xl">
                    <SearchWithSelect selectId={`${searchType}`} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchType={searchType} setSearchType={setSearchType} options={options} />
                </div>
                <StudentHasSemesterSection items={currentItems} url={url} permission={permission} isLoading={isLoading} itemName={itemName} showAlert={showAlert} responseHandler={responseHandler} />
            </>
        )
    });

export default StudentHasSemesterOverview;
