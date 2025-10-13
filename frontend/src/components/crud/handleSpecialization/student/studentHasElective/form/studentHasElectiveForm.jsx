import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewStudentHasElective } from '../../../../../../redux/slice/handleSpecialization/student/studentHasElective/studentHasElectiveSlice';

// Componentes
import SearchSelect from '../../../../../input/searchSelect';
import { elective, elective1, elective2 } from '../../../../../../utils/crudHelpers/constants';

const StudentHasElectiveForm = () => {
    const dispatch = useDispatch();
    const { newStudentHasElective } = useSelector((state) => state.handleSpecialization.student.studentHasElective);
    const { semester } = useSelector((state) => state.semester);

    const [electiveList, setElectiveList] = useState([]);

    useEffect(() => {
        // Lógica para seleccionar la lista de electivos correcta
        let selectedElectiveList = [];
        if (newStudentHasElective.number === 1) {
            selectedElectiveList = elective1.filter(elective => elective.specializationID === newStudentHasElective.specializationID);
        } else if (newStudentHasElective.number === 2) {
            selectedElectiveList = elective2.filter(elective => elective.specializationID === newStudentHasElective.specializationID);
        }

        setElectiveList(selectedElectiveList);
    }, [dispatch, newStudentHasElective.number, newStudentHasElective.specializationID, newStudentHasElective.electiveID]);

    const handleInputChange = useCallback((field, value) => {
        dispatch(setNewStudentHasElective({ [field]: value }));
    }, [dispatch]);

    return (
        <>
            <SearchSelect
                selectId='semesterID'
                placeholder="Seleccione el Semestre que Realiza Actualmente"
                options={semester}
                value={newStudentHasElective.semesterID}
                onChange={(selectedOption) => handleInputChange('semesterID', selectedOption.value)}
            />
            <SearchSelect
                selectId='number'
                placeholder="Seleccione el Tipo de Electivo"
                options={elective}
                value={newStudentHasElective.number}
                onChange={(selectedOption) => handleInputChange('number', selectedOption.value)}
            />
            <SearchSelect
                selectId='electiveID'
                placeholder="Seleccione el Electivo"
                options={electiveList.map(elective => ({ value: elective.electiveID, label: elective.label }))}
                value={newStudentHasElective.electiveID}
                onChange={(selectedOption) => handleInputChange('electiveID', selectedOption.value)}
            />
        </>
    );
};

export default StudentHasElectiveForm;
