import React, { useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

// Componentes
import StudentHasSpecializationSection from '../section/studentHasSpecializationSection';

// Utilidades
import { getCurrentPageItemsSorted } from '../../../../../../utils/crudHelpers/helperFilter';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../../../utils/crudHelpers/constants';

const StudentHasSpecializationOverview
    = memo((props) => {
        const { url, permission, itemName, isLoading, showAlert, responseHandler } = props;
        const { studentHasSpecialization } = useSelector((state) => state.handleSpecialization.student.studentHasSpecialization);

        const currentItems = useMemo(
            () => getCurrentPageItemsSorted(ITEMS_PER_PAGE, 1, studentHasSpecialization, 'studentHasSpecializationID', 'desc'),
            [studentHasSpecialization]
        );

        return (
            <>
                <StudentHasSpecializationSection items={currentItems} url={url} permission={permission} isLoading={isLoading} itemName={itemName} showAlert={showAlert} responseHandler={responseHandler} />
            </>
        )
    });

export default StudentHasSpecializationOverview;
