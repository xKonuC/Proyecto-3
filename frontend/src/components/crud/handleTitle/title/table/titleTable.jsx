import React, { useState, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

// Componentes
import PaginationButtons from '../../../../button/table/paginationButtons';
import StyledButton from '../../../../button/styledButton';
import EnhancedTable from '../../../../table/enhancedTable';
import TbodyContent from '../../../../table/tableComponent/bodyContent';

// Utilidades
import { getCurrentPageItems } from '../../../../../utils/crudHelpers/paginationHelper';
import { handleCheckboxChange, handleSelectAllChange } from '../../../../../utils/crudHelpers/handleCheckbox';
import { ActionsCell, CheckboxCell, ItemCell } from '../../../../table/tableComponent/tableComponent';
import { isArray } from '../../../../../utils/crudHelpers/utils';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../../utils/crudHelpers/constants';

//Estilos
import { theadContentTr, theadContentDiv, tbodyContentTr, tbodyContentButton } from '../../../../../utils/style/crud/classes';
import EditIcon from '../../../../icon/crud/editIcon';

const options = [
    { label: `ID`, value: 'titleID' },
    { label: `Nombre del Título`, value: 'name' },
    { label: 'Área del Título', value: 'areaName' },
    { label: `Nombre de la Universidad`, value: 'universityName' },
    { label: `País`, value: 'country' },
    { label: `Ciudad`, value: 'city' },
    { label: `Grado`, value: 'degree' },
    { label: `Tipo`, value: 'type' },
];

const TitleTable = memo((props) => {
    const { isLoading, selectedItems, selectAll, setSelectedItems, setSelectAll, handleEdit } = props;
    const { items, filteredItems } = useSelector((state) => state.handleTitle.title);
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
                <tr key={item.titleID} className={tbodyContentTr}>
                    <CheckboxCell id={`deleteInput-${item.titleID}`} checked={selectedItems.some((selectedItem) => selectedItem.titleID === item.titleID)} onChange={(e) => handleCheckboxChange(e, setSelectedItems, 'titleID', item)} />
                    {options.map((option) => (
                        <ItemCell key={option.value} value={item[option.value]} />
                    ))}
                    <ActionsCell>
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

export default TitleTable;