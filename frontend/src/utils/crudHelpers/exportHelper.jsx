import * as XLSX from "xlsx";
import { sortItems } from "./searchFilter";
import { isArray } from "./utils";

const exportFilteredAndSortedItems = (items, sortProperty, sortDirection) => {
    return sortItems(items, sortProperty, sortDirection);
};

export const handleExport = (options, items, filteredItems, fileName, sortProperty, sortDirection = 'asc') => {
    // Obtener los datos filtrados y ordenados
    const data = isArray(filteredItems) ? filteredItems : exportFilteredAndSortedItems(items, sortProperty, sortDirection);

    // Mapear los datos para cambiar los nombres de las propiedades
    const modifiedData = data.map(item => {
        const modifiedItem = {};
        options.forEach(option => {
            modifiedItem[option.label] = item[option.value];
        });
        return modifiedItem;
    });

    // Crea un nuevo libro de Excel
    const wb = XLSX.utils.book_new();

    // Crea una hoja de trabajo y agrega los datos
    const ws = XLSX.utils.json_to_sheet(modifiedData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Crea un archivo de Excel y lo descarga
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};