import React from 'react';
import { useSelector } from 'react-redux';
import { setSemester, setFilteredItems, clearFilteredItems } from '../../../../redux/slice/semester/semesterSlice';
import UserManagement from '../../../navbar/management/userManagement';

const options = [
    { label: `ID`, value: 'semesterID' },
    { label: `Año del Semestre`, value: 'year' },
    { label: `Número del Semestre`, value: 'semesterNumber' },
    { label: `Fecha de Inicio`, value: 'startDate' },
    { label: `Fecha de Finalización`, value: 'finishDate' },
];

const SemesterNavbar = () => {
    const { semester, filteredItems } = useSelector((state) => state.semester);
    
    const dateRangeOptions = [
        { label: `Fecha de Inicio`, value: 'startDate' },
        { label: `Fecha de Finalización`, value: 'finishDate' },
      ];
    
      return (
        <>
          <UserManagement
            urls={[]}
            id={""}
            options={options}
            exportOptions={[]}
            dateRangeOptions={dateRangeOptions}
            acceptedFiles={[]}
            name={""}
            label={""}
            items={semester}
            filteredItems={filteredItems}
            setItems={{ setSemester }}
            setFilteredItems={{ setFilteredItems }}
            clearFilteredItems={clearFilteredItems}
          />
        </>
      );
};


export default SemesterNavbar;
