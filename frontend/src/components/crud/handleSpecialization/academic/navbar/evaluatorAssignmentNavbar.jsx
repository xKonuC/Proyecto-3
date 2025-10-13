import React from 'react';
import { useSelector } from 'react-redux';
import { setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleSpecialization/administrative/evaluatorAssignmentSlice';

import SearchAndSort from '../../../../navbar/management/searchAndSort';
import { useParams } from 'react-router-dom';

const options_evaluationTypeID_1 = [
    { label: `Nombre del Estudiante`, value: 'fullName' },
    { label: `Estado de la Revisión`, value: 'preproject_status' },
    { label: `Fecha de Subida`, value: 'creationDate' }, 
    { label: `Fecha de Actualización`, value: 'updateDate' },
    { label: `Email del Estudiante`, value: 'email' },
    { label: `Linea de Formación`, value: 'specializationName' },
    { label: `Nombre del Evaluador A`, value: 'academicA_fullName' },
    { label: `Evaluación del Evaluador A`, value: 'academicA_status' },
    { label: `Nombre del Evaluador B`, value: 'academicB_fullName' },
    { label: `Evaluación del Evaluador B`, value: 'academicB_status' },
];

const options_evaluationTypeID_2 = [
    { label: `Nombre del Estudiante`, value: 'fullName' },
    { label: `Estado de la Revisión`, value: 'thesis_status' },
    { label: `Fecha de Subida`, value: 'creationDate' },
    { label: `Fecha de Actualización`, value: 'updateDate' },
    { label: `Email del Estudiante`, value: 'email' },
    { label: `Linea de Formación`, value: 'specializationName' },
    { label: `Nombre del Evaluador A`, value: 'academicA_fullName' },
    { label: `Evaluación del Evaluador A`, value: 'academicA_status' },
    { label: `Nombre del Evaluador B`, value: 'academicB_fullName' },
    { label: `Evaluación del Académico B`, value: 'academicB_status' },
    { label: `Nombre del Director de Tesis`, value: 'director_fullName' },
    { label: `Evaluación del Director de Tesis`, value: 'director_status' },
    { label: `Nombre del Co-Director de Tesis`, value: 'codirector_fullName' },
    { label: `Evaluación del Co-Director de Tesis`, value: 'codirector_status' },
    { label: `Nombre del Director de Programa`, value: 'programDirector_fullName' },
];

const EvaluatorAssignmentNavbar = () => {
    const { items, filteredItems } = useSelector((state) => state.handleSpecialization.administrative.evaluatorAssignment);
    const { evaluationTypeID } = useParams();
    const parsedEvaluationTypeID = parseInt(evaluationTypeID, 10);
    const options = parsedEvaluationTypeID === 1 ? options_evaluationTypeID_1 : options_evaluationTypeID_2;

    return (
        <>
            <SearchAndSort options={options} items={items} filteredItems={filteredItems} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default EvaluatorAssignmentNavbar;
