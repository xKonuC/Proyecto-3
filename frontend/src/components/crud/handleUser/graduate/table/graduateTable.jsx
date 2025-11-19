import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FaUserGraduate } from 'react-icons/fa';

// Componentes
import PaginationButtons from '../../../../button/table/paginationButtons';
import StyledButton from '../../../../button/styledButton';
import EnhancedTable from '../../../../table/enhancedTable';
import TbodyContent from '../../../../table/tableComponent/bodyContent';

// Utilidades
import { getCurrentPageItems } from '../../../../../utils/crudHelpers/paginationHelper';
import { ActionsCell, CheckboxCell, ItemCell } from '../../../../table/tableComponent/tableComponent';
import { isArray } from '../../../../../utils/crudHelpers/utils';
import { getStatusColor, getClassificationColor } from '../../../../../utils/statusHelpers';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../../utils/crudHelpers/constants';

//Estilos
import { theadContentDiv, tbodyContentTr, tbodyContentTd, tbodyContentButton } from '../../../../../utils/style/crud/classes';
import EditIcon from '../../../../icon/crud/editIcon';

const GraduateTable = (props) => {
    const { selectedItems, selectAll, setSelectedItems, setSelectAll, onUpdate } = props;
    const { items, filteredItems } = useSelector((state) => state.handleUser.user);
    const [currentPage, setCurrentPage] = useState(1);

    const currentItems = useMemo(() => {
        const isFiltered = isArray(filteredItems);
        const result = isFiltered ?
            getCurrentPageItems(ITEMS_PER_PAGE, currentPage, filteredItems) :
            getCurrentPageItems(ITEMS_PER_PAGE, currentPage, items);
        return result;
    }, [filteredItems, currentPage, items]);

    const numberFiltered = useMemo(() => {
        const isFiltered = isArray(filteredItems);
        return isFiltered ? filteredItems.length : items.length;
    }, [filteredItems, items]);

    const theadContent = (
        <>
            <th className={theadContentDiv}>RUT</th>
            <th className={`${theadContentDiv} text-left`}>Nombre Completo</th>
            <th className={theadContentDiv}>Estado</th>
            <th className={theadContentDiv}>Clasificación</th>
            <th className={theadContentDiv}>Año Ingreso</th>
        </>
    );

    const tbodyContent = (
        <TbodyContent
            itemsLength={Array.isArray(currentItems) ? currentItems.length : 0}
            length={6}
            isLoading={false}
        >
            {Array.isArray(currentItems) && currentItems.map((item) => (
                <tr key={item.userID} className={tbodyContentTr}>
                    <CheckboxCell
                        id={item.userID}
                        checked={selectedItems.includes(item.userID)}
                        onChange={(e) => {
                            let newSelectedItems;
                            if (e.target.checked) {
                                newSelectedItems = [...selectedItems, item.userID];
                            } else {
                                newSelectedItems = selectedItems.filter(id => id !== item.userID);
                            }
                            setSelectedItems(newSelectedItems);
                            setSelectAll(newSelectedItems.length === currentItems.length);
                        }}
                    />
                    <ItemCell value={item.rut} />
                        <td className={`${tbodyContentTd} text-left`}>
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8">
                                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                                        <FaUserGraduate className="h-4 w-4 text-orange-600" />
                                    </div>
                                </div>
                                <div className="ml-3 flex-1">
                                    <div className="text-sm font-medium text-gray-900">
                                        {item.fullName || `${item.firstName || ''} ${item.surname1 || ''}`.trim() || 'Sin nombre'}
                                    </div>
                                    <div className="text-sm text-gray-500">{item.email || 'Sin email'}</div>
                                </div>
                            </div>
                        </td>
                    <td className={tbodyContentTd}>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status || 'Graduado')}`}>
                            {item.status || 'Graduado'}
                        </span>
                    </td>
                    <td className={tbodyContentTd}>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getClassificationColor(item.classification || 'Sin clasificar')}`}>
                            {item.classification || 'Sin clasificar'}
                        </span>
                    </td>
                    <ItemCell value={item.entry || 'N/A'} />
                    <ActionsCell>
                        <div className="flex gap-1">
                            <StyledButton
                                onClick={() => onUpdate(item.userID)}
                                className={tbodyContentButton}
                                title="Editar"
                            >
                                <EditIcon />
                            </StyledButton>
                        </div>
                    </ActionsCell>
                </tr>
            ))}
        </TbodyContent>
    );

    return (
        <div className="space-y-4">
            <EnhancedTable
                theadContent={theadContent}
                tbodyContent={tbodyContent}
                selectAll={selectAll}
                    onChange={(e) => {
                        setSelectAll(e.target.checked);
                        setSelectedItems(e.target.checked ? currentItems.map(item => item.userID) : []);
                    }}
            />
            <PaginationButtons
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={numberFiltered}
                itemsPerPage={ITEMS_PER_PAGE}
            />
        </div>
    );
};

export default GraduateTable;
