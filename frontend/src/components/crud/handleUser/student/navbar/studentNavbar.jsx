import React from 'react';
import { useSelector } from 'react-redux';
import { setItems, setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleUser/student/studentSlice';

import UserManagement from '../../../../navbar/management/userManagement';
import { validGenders2, validMaritalStatuses } from '../../../../../utils/crudHelpers/constants';

const options = [
    { label: `ID`, value: 'userID' },
    { label: `RUT`, value: 'rut' },
    { label: `Email`, value: 'email' },
    { label: 'Email Personal', value: 'personalEmail' },
    { label: `Primer Nombre`, value: 'firstName' },
    { label: `Segundo Nombre`, value: 'secondName' },
    { label: `Primer Apellido`, value: 'surname1' },
    { label: `Segundo Apellido`, value: 'surname2' },
    { label: `Sexo`, value: 'sex' },
    { label: `Estado Civil`, value: 'civilStatus' },
    { label: `Fecha de Nacimiento`, value: 'birthday' },
    { label: `Dirección`, value: 'address' },
    { label: `Lugar de Trabajo`, value: 'workPlace' },
    { label: `Número de Teléfono`, value: 'phone' },
    { label: `Teléfono de Trabajo`, value: 'phoneWork' },
    { label: `Cargo de Trabajo`, value: 'job' },
    { label: `Linea de Formación`, value: 'specializationName' },
    { label: `1° Electivo`, value: 'electiveName1' },
    { label: `2° Electivo`, value: 'electiveName2' },
    { label: `Cohorte`, value: 'entry' },
    { label: `Grupo`, value: 'group' },
    { label: `Articulación`, value: 'articulation' },
    { label: `Títulos`, value: 'titles' },
];

const exportOptions = [
    { label: `RUT`, value: 'rut' },
    { label: `Email`, value: 'email' },
    { label: 'Email Personal', value: 'personalEmail' },
    { label: `Primer Nombre`, value: 'firstName' },
    { label: `Segundo Nombre`, value: 'secondName' },
    { label: `Primer Apellido`, value: 'surname1' },
    { label: `Segundo Apellido`, value: 'surname2' },
    { label: `Sexo`, value: 'sex' },
    { label: `Estado Civil`, value: 'civilStatus' },
    { label: `Fecha de Nacimiento`, value: 'birthday' },
    { label: `Dirección`, value: 'address' },
    { label: `Lugar de Trabajo`, value: 'workPlace' },
    { label: `Número de Teléfono`, value: 'phone' },
    { label: `Teléfono de Trabajo`, value: 'phoneWork' },
    { label: `Cargo de Trabajo`, value: 'job' },
    { label: `Linea de Formación`, value: 'specializationName' },
    { label: `1° Electivo`, value: 'electiveName1' },
    { label: `2° Electivo`, value: 'electiveName2' },
    { label: `Cohorte`, value: 'entry' },
    { label: `Grupo`, value: 'group' },
    { label: `Articulación`, value: 'articulation' },
    { label: `Títulos`, value: 'titles' },
];

const dateRangeOptions = [
    { label: `Fecha de Nacimiento`, value: 'birthday' },
    { label: `Cohorte`, value: 'entry' },
];

const acceptedFiles = [
    { label: `RUT`, value: 'rut', type: 'string', default: null },
    { label: `Email`, value: 'email', type: 'string', default: null },
    { label: `Email Personal`, value: 'personalEmail', type: 'string', default: '' },
    { label: `Primer Nombre`, value: 'firstName', type: 'string', default: null },
    { label: `Segundo Nombre`, value: 'secondName', type: 'string', default: null },
    { label: `Primer Apellido`,value: 'surname1', type: 'string', default: null },
    { label: `Segundo Apellido`,value: 'surname2', type: 'string', default: null },
    { label: `Sexo`, value: 'sex', type: 'string', default: null, category: validGenders2 },
    { label: `Estado Civil`, value: 'civilStatus', type: 'string', default: null, category: validMaritalStatuses },
    { label: `Fecha de Nacimiento`, value: 'birthday', type: 'date', default: null },
    { label: `Dirección`, value: 'address', type: 'string', default: '' },
    { label: `Lugar de Trabajo`, value: 'workPlace', type: 'string', default: '' },
    { label: `Número de Teléfono`, value: 'phone', type: 'string', default: '' },
    { label: `Teléfono de Trabajo`, value: 'phoneWork', type: 'string', default: '' },
    { label: `Ocupación`, value: 'job', type: 'string', default: '' },
    { label: `Articulación`, value: 'articulation', type: 'int', default: null },
    { label: `Cohorte`, value: 'entry', type: 'year', default: null },
    { label: `Grupo`, value: 'group', type: 'int', default: null },
];

const StudentNavbar = ({ urls }) => {
    const { items, filteredItems } = useSelector((state) => state.handleUser.student);

    return (
        <>
            <UserManagement urls={urls} id={'userID'} options={options} exportOptions={exportOptions} dateRangeOptions={dateRangeOptions} acceptedFiles={acceptedFiles} name={'estudiantesMagister'} label={'Importar Estudiantes'} items={items} filteredItems={filteredItems} setItems={{ setItems }} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default StudentNavbar;
