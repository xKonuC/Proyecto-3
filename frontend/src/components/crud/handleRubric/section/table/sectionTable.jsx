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
import { formatDateValue, isArray } from '../../../../../utils/crudHelpers/utils';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../../utils/crudHelpers/constants';

//Estilos
import { theadContentTr, theadContentDiv, tbodyContentTr, tbodyContentButton } from '../../../../../utils/style/crud/classes';
import EditIcon from '../../../../icon/crud/editIcon';

const options = [
    { label: `ID`, value: 'sectionID' },
    { label: `Nombre de la Sección`, value: 'name' },
    { label: `Estado`, value: 'isActive' },
];

const optionsRow = [
    { value: 'sectionID' },
    { value: 'name' },
];

const SectionTable = memo((props) => {
    const { isLoading, selectedItems, selectAll, setSelectedItems, setSelectAll, handleEdit } = props;
    const { items, filteredItems } = useSelector((state) => state.handleRubric.section);
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
        <TbodyContent semesterLength={items.length} isLoading={isLoading} length={options.length}>
            {currentItems.map((item) => (
                <tr key={item.sectionID} className={tbodyContentTr}>
                    <CheckboxCell id={`deleteInput-${item.sectionID}`} checked={selectedItems.some((selectedItem) => selectedItem.sectionID === item.sectionID)} onChange={(e) => handleCheckboxChange(e, setSelectedItems, 'sectionID', item)} />
                    {optionsRow.map((option) => (
                        <ItemCell key={option.value} value={formatDateValue(item[option.value], option.value)} />
                    ))}
                    <ActionsCell>
                        <span className={`px-2.5 py-0.5 font-semibold rounded ${item.isActive === 1 ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`} >
                            {item.isActive === 1 ? 'Habilitado' : 'Deshabilitado'}
                        </span>
                    </ActionsCell>
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

export default SectionTable;