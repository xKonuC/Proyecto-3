import React from 'react';
import { useSelector } from 'react-redux';
import { setItems, setFilteredItems, clearFilteredItems } from '../../../../../redux/slice/handleUser/user/userSlice';

import SearchAndSort from '../../../../navbar/management/searchAndSort';

const options = [
    { label: `ID`, value: 'userID' },
    { label: `RUT`, value: 'rut' },
    { label: `Email`, value: 'email' },
    { label: 'Email Personal', value: 'personalEmail' },
    { label: `Primer Nombre`, value: 'firstName' },
    { label: `Segundo Nombre`, value: 'secondName' },
    { label: `Primer Apellido`, value: 'surname1' },
    { label: `Segundo Apellido`, value: 'surname2' },
    { label: `Teléfono`, value: 'phone' },
    { label: `Año de Ingreso`, value: 'entry' },
    { label: `Grupo`, value: 'group' },
    { label: `Estado`, value: 'status' },
    { label: `Clasificación`, value: 'classification' },
];

const StudentNavbar = ({ urls }) => {
    const { items, filteredItems } = useSelector((state) => state.handleUser.user);

    return (
        <>
            <SearchAndSort 
                options={options} 
                items={items} 
                filteredItems={filteredItems} 
                setFilteredItems={{ setFilteredItems }} 
                clearFilteredItems={clearFilteredItems} 
            />
        </>
    );
};

export default StudentNavbar;