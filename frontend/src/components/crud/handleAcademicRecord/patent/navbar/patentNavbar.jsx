import React from "react";
import { useSelector } from "react-redux";
import {
  setItems, setFilteredItems, clearFilteredItems
} from "../../../../../redux/slice/handleAcademicRecord/patent/patentSlice";

import UserManagement from "../../../../navbar/management/userManagement";
import { patentOptions as options } from "../../../../../utils/crudHelpers/options";

const PatentNavbar = () => {
  const { items, filteredItems } = useSelector(
    (state) => state.handleAcademicRecord.patent
  );

  const dateRangeOptions = [
    { label: 'Fecha de Solicitud', value: 'applicationDate' },
    { label: 'Fecha de Publicación', value: 'publicationDate' },
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
        items={items}
        filteredItems={filteredItems}
        setItems={{ setItems }}
        setFilteredItems={{ setFilteredItems }}
        clearFilteredItems={clearFilteredItems}
      />
    </>
  );
};

export default PatentNavbar;
