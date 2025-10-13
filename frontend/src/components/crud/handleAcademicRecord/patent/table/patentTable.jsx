import React, { useState, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Componentes
import ViewArticleButton from '../../../../button/viewArticleButton';
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
import { patentOptions as options } from '../../../../../utils/crudHelpers/options';

//Estilos
import { theadContentTr, theadContentDiv, tbodyContentTr, tbodyContentButton } from '../../../../../utils/style/crud/classes';
import EditIcon from '../../../../icon/crud/editIcon';

const PatentTable = memo((props) => {
    const { isLoading, selectedItems, selectAll, setSelectedItems, setSelectAll, handleEdit } = props;
    const { items, filteredItems } = useSelector((state) => state.handleAcademicRecord.patent);
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
                <tr key={item.patentID} className={tbodyContentTr}>
                    <CheckboxCell id={`deleteInput-${item.patentID}`} checked={selectedItems.some((selectedItem) => selectedItem.patentID === item.patentID)} onChange={(e) => handleCheckboxChange(e, setSelectedItems, 'patentID', item)} />
                    {options.map((option) => (
                        option.value === 'patentName' ? (
                            <td key={option.value} className='break-words px-0 py-2 w-auto'>
                                {formatDateValue(item[option.value], option.value)}
                            </td>
                        ) : (
                            <ItemCell key={option.value} value={formatDateValue(item[option.value], option.value)} />
                        )
                    ))}
                    <ActionsCell>
                        <div className={tbodyContentButton}>
                            <ViewArticleButton accessURL={item.accessURL} />
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

export default PatentTable;