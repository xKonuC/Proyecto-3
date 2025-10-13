import React from "react";
import { CSVLink } from "react-csv";
import { filterItems } from "../../utils/crudHelpers/searchFilter";
import { sortItems } from "../../utils/crudHelpers/searchFilter";
import StyledButton from "../button/styledButton";

const ExcelExportComponent = ({ items, fileName, searchTerm, searchType, sortProperty, sortDirection }) => {
    if (!items || items.length === 0) {
        return <p>No hay datos disponibles para exportar</p>;
    }

    const exportFilteredAndSortedItems = () => {
        const filteredItems = filterItems(items, searchTerm, searchType);
        return sortItems(filteredItems, sortProperty, sortDirection);
    };

    const dataForCSV = exportFilteredAndSortedItems().map((item) => ({
        userID: item.userID,
        rut: item.rut,
        firstName: item.firstName,
        secondName: item.secondName,
        surname2: item.surname2,
        surname1: item.surname1,
        sex: item.sex,
        civilStatus: item.civilStatus,
        birthday: item.birthday,
        address: item.address,
        email: item.email,
        phone: item.phone,
        entry: item.entry,
        id: item.id,
    }));

    const headersForCSV = [
        { label: "UserID", key: "userID" },
        { label: "Rut", key: "rut" },
        { label: "First Name", key: "firstName" },
        { label: "Second Name", key: "secondName" },
        { label: "Surname F", key: "surname2" },
        { label: "Surname M", key: "surname1" },
        { label: "Sex", key: "sex" },
        { label: "State Civil", key: "civilStatus" },
        { label: "Birthday", key: "birthday" },
        { label: "Address", key: "address" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" },
        { label: "Entry", key: "entry" },
        { label: "ID", key: "id" },
    ];

    return (
        <StyledButton>
            <CSVLink data={dataForCSV} headers={headersForCSV} filename={`${fileName}.csv`}>
                Exportar a CSV
            </CSVLink>
        </StyledButton>
    );
};

export default ExcelExportComponent;