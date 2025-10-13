import React from 'react';
import { useSelector } from 'react-redux';
import { setItems, setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleUser/academic/academicSlice';

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
    { label: `Número de Teléfono`, value: 'phone' },
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
    { label: `Número de Teléfono`, value: 'phone' },
    { label: `Títulos`, value: 'titles' },
];

const dateRangeOptions = [
    { label: `Fecha de Nacimiento`, value: 'birthday' },
];

const acceptedFiles = [];

const AcademicNavbar = ({ urls }) => {
    const { items, filteredItems } = useSelector((state) => state.handleUser.academic);

    return (
        <>
            <UserManagement urls={urls} id={'userID'} options={options} exportOptions={exportOptions} dateRangeOptions={dateRangeOptions} acceptedFiles={acceptedFiles} name={'académicosMagister'} label={'Importar Estudiantes'} items={items} filteredItems={filteredItems} setItems={{ setItems }} setFilteredItems={{ setFilteredItems }} clearFilteredItems={clearFilteredItems} />
        </>
    );
};


export default AcademicNavbar;
