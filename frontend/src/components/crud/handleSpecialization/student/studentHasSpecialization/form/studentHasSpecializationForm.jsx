import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewStudentHasSpecialization } from '../../../../../../redux/slice/handleSpecialization/student/studentHasSpecialization/studentHasSpecializationSlice';

// Componentes
import SearchSelect from '../../../../../input/searchSelect';
import { specialization } from '../../../../../../utils/crudHelpers/constants';

const StudentHasSpecializationForm = () => {

    const dispatch = useDispatch();
    const { newStudentHasSpecialization } = useSelector((state) => state.handleSpecialization.student.studentHasSpecialization);
    const { semester } = useSelector((state) => state.semester);

    const handleInputChange = useCallback((field, value) => {
        dispatch(setNewStudentHasSpecialization({ [field]: value }));
    }, [dispatch]);

    return (
        <>
            <SearchSelect
                selectId='semesterID'
                placeholder="Seleccione su Semestre de Ingreso"
                options={semester}
                value={newStudentHasSpecialization.semesterID}
                onChange={(selectedOption) => handleInputChange('semesterID', selectedOption.value)}
            />
            <SearchSelect
                selectId='specializationID'
                placeholder="Seleccione su Linea de Formación"
                options={specialization}
                value={newStudentHasSpecialization.specializationID}
                onChange={(selectedOption) => handleInputChange('specializationID', selectedOption.value)}
            />
        </>
    );
};

export default StudentHasSpecializationForm;
