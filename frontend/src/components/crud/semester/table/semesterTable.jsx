import React, { useState, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

// Componentes
import PaginationButtons from '../../../button/table/paginationButtons';
import StyledButton from '../../../button/styledButton';
import EnhancedTable from '../../../table/enhancedTable';
import TbodyContent from '../../../table/tableComponent/bodyContent';

// Utilidades
import { getCurrentPageItems } from '../../../../utils/crudHelpers/paginationHelper';
import { handleCheckboxChange, handleSelectAllChange } from '../../../../utils/crudHelpers/handleCheckbox';
import { ActionsCell, CheckboxCell, ItemCell } from '../../../table/tableComponent/tableComponent';
import { formatDateValue, isArray } from '../../../../utils/crudHelpers/utils';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../utils/crudHelpers/constants';

//Estilos
import { theadContentTr, theadContentDiv, tbodyContentTr, tbodyContentButton } from '../../../../utils/style/crud/classes';
import EditIcon from '../../../icon/crud/editIcon';

const options = [
    { label: `ID`, value: 'semesterID' },
    { label: `Año del Semestre`, value: 'year' },
    { label: `Número del Semestre`, value: 'semesterNumber' },
    { label: `Fecha de Inicio`, value: 'startDate' },
    { label: `Fecha de Finalización`, value: 'finishDate' },
];

const SemesterTable = memo((props) => {
    const { isLoading, selectedItems, selectAll, setSelectedItems, setSelectAll, handleEdit } = props;
    const { semester, filteredItems } = useSelector((state) => state.semester);
    const [currentPage, setCurrentPage] = useState(1);

    const currentItems = useMemo(() => {
        // Usar la función para verificar si filteredItems es un array
        const isFiltered = isArray(filteredItems);
        return isFiltered ?
            getCurrentPageItems(ITEMS_PER_PAGE, currentPage, filteredItems) :
            getCurrentPageItems(ITEMS_PER_PAGE, currentPage, semester);
    }, [filteredItems, currentPage, semester]);

    const numberFiltered = useMemo(() => {
        // Usar la función para verificar si filteredItems es un array
        const isFiltered = isArray(filteredItems);
        return isFiltered ? filteredItems.length : semester.length;
    }, [filteredItems, semester]);

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
        <TbodyContent semesterLength={semester.length} isLoading={isLoading} length={options.length}>
            {currentItems.map((item) => (
                <tr key={item.semesterID} className={tbodyContentTr}>
                    <CheckboxCell id={`deleteInput-${item.semesterID}`} checked={selectedItems.some((selectedItem) => selectedItem.semesterID === item.semesterID)} onChange={(e) => handleCheckboxChange(e, setSelectedItems, 'semesterID', item)} />
                    {options.map((option) => (
                        <ItemCell key={option.value} value={formatDateValue(item[option.value], option.value)} />
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
            <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={semester.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={numberFiltered} />
            <EnhancedTable theadContent={theadContent} tbodyContent={tbodyContent} selectAll={selectAll} onChange={(event) => handleSelectAllChange(event, setSelectAll, setSelectedItems, semester)} />
        </>
    )
});

export default SemesterTable;