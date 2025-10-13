import React, { useMemo, memo, useState } from 'react';
import { useSelector } from 'react-redux';

// Componentes
import PaginationButtons from '../../../../button/table/paginationButtons';
import StyledButton from '../../../../button/styledButton';
import EnhancedTable from '../../../../table/enhancedTable';
import TbodyContent from '../../../../table/tableComponent/bodyContent';
import StyledLinkButton from '../../../../button/variation/StyledLinkButton';

// Utilidades
import { getCurrentPageItems } from '../../../../../utils/crudHelpers/paginationHelper';
import { handleCheckboxChange, handleSelectAllChange } from '../../../../../utils/crudHelpers/handleCheckbox';
import { ActionsCell, CheckboxCell, ItemCell } from '../../../../table/tableComponent/tableComponent';
import { getPropertyValue, isArray } from '../../../../../utils/crudHelpers/utils';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../../utils/crudHelpers/constants';

//Estilos
import { theadContentTr, theadContentDiv, tbodyContentTr, tbodyContentTd, tbodyContentButton } from '../../../../../utils/style/crud/classes';
import EditIcon from '../../../../icon/crud/editIcon';
import FileIcon from '../../../../image/fileIcon';
import ViewIcon from '../../../../icon/utils/viewIcon';

const options = [
    { label: `Archivo`, value: 'archiveURL' },
    { label: `ID`, value: 'studentHasTitleID' },
    { label: `Año de Obtención del Título`, value: 'titleYear' },
    { label: `Nombre del Titulo`, value: 'title.name' },
    { label: `Nombre de la Universidad`, value: 'title.universityName' },
    { label: `País`, value: 'title.country' },
    { label: `Ciudad`, value: 'title.city' },
    { label: `Grado`, value: 'title.degree' },
    { label: `Tipo`, value: 'title.type' },
    { label: `Formato`, value: 'format.name' },
];

const optionsRow = [
    { value: 'studentHasTitleID' },
    { value: 'titleYear' },
    { value: 'title.name' },
    { value: 'title.universityName' },
    { value: 'title.country' },
    { value: 'title.city' },
    { value: 'title.degree' },
    { value: 'title.type' },
    { value: 'format.name' },
];

const StudentHasTitleTable = memo(({ isLoading, selectedItems, selectAll, setSelectedItems, setSelectAll, handleEdit }) => {
    const { items, filteredItems } = useSelector((state) => state.handleTitle.studentHasTitle);
    const [currentPage, setCurrentPage] = useState(1);
    const currentItems = useMemo(() => {
        // Usar la función para verificar si filteredItems es un array
        const isFiltered = isArray(filteredItems);
        return isFiltered ?
            getCurrentPageItems(ITEMS_PER_PAGE, currentPage, filteredItems) :
            getCurrentPageItems(ITEMS_PER_PAGE, currentPage, items);
    }, [filteredItems, currentPage, items]);

    const numberFiltered = useMemo(() => {
        // Usar la función para verificar si filteredItems es un array
        const isFiltered = isArray(filteredItems);
        return isFiltered ? filteredItems.length : items.length;
    }, [filteredItems, items]);

    const theadContent = (
        <>
            {options.map((option) => (
                <th key={option.value} className={theadContentTr}>
                    <div className={theadContentDiv}>
                        {option.label}
                    </div>
                </th>
            ))}
        </>
    );

    const tbodyContent = (
        <TbodyContent itemsLength={items.length} isLoading={isLoading} length={options.length}>
            {currentItems.map((item) => (
                <tr key={item.studentHasTitleID} className={tbodyContentTr}>
                    <CheckboxCell id={`deleteInput-${item.studentHasTitleID}`} checked={selectedItems.some((selectedItem) => selectedItem.studentHasTitleID === item.studentHasTitleID)} onChange={(e) => handleCheckboxChange(e, setSelectedItems, 'studentHasTitleID', item)} />
                    <td key={item.archiveURL} className={tbodyContentTd}>
                        <FileIcon format={item.format.name} width={"100"} height={"100"} />
                    </td>
                    {optionsRow.map((option) => (
                        <ItemCell key={option.value} value={getPropertyValue(item, option.value)} />
                    ))}
                    <ActionsCell>
                        <div className={tbodyContentButton}>
                            <StyledLinkButton url={item.archiveURL}>
                                Ver Titulo
                            </StyledLinkButton>
                        </div>
                        <div className={tbodyContentButton}>
                            <StyledButton onClick={() => handleEdit(item)} >
                                <EditIcon />
                                Actualizar Información
                            </StyledButton>
                        </div>
                    </ActionsCell>
                </tr>
            ))}
        </TbodyContent>
    );

    return (
        <>
            <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={numberFiltered} />
            <EnhancedTable theadContent={theadContent} tbodyContent={tbodyContent} selectAll={selectAll} onChange={(event) => handleSelectAllChange(event, setSelectAll, setSelectedItems, items)} />
        </>
    )
});

export default StudentHasTitleTable;