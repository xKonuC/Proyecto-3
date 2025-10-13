import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewStudentHasSemester } from '../../../../../../redux/slice/handleSpecialization/student/studentHasSemester/studentHasSemesterSlice';

// Componentes
import SearchSelect from '../../../../../input/searchSelect';
import { evaluationType } from '../../../../../../utils/crudHelpers/constants';

const StudentHasSemesterForm = ({ updateId }) => {

    const dispatch = useDispatch();
    const { newStudentHasSemester } = useSelector((state) => state.handleSpecialization.student.studentHasSemester);
    const { semester } = useSelector((state) => state.semester);

    const handleInputChange = useCallback((field, value) => {
        dispatch(setNewStudentHasSemester({ [field]: value }));
    }, [dispatch]);

    return (
        <>
            <SearchSelect
                selectId='semesterID'
                placeholder="Seleccione el Semestre que Realiza Actualmente"
                options={semester}
                value={newStudentHasSemester.semesterID}
                onChange={(selectedOption) => handleInputChange('semesterID', selectedOption.value)}
            />
            {!updateId && (
                <SearchSelect
                    selectId='evaluationTypeID'
                    placeholder="Seleccione Tipo de Actividad"
                    options={evaluationType}
                    value={newStudentHasSemester.evaluationTypeID}
                    onChange={(selectedOption) => handleInputChange('evaluationTypeID', selectedOption.value)}
                />
            )}
        </>
    );
};

export default StudentHasSemesterForm;
