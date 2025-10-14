import React, { useState, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import { FaUserGraduate, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

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
import { getStatusColor, getClassificationColor } from '../../../../../utils/statusHelpers';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../../utils/crudHelpers/constants';

//Estilos
import { theadContentTr, theadContentDiv, tbodyContentTr, tbodyContentTd, tbodyContentButton } from '../../../../../utils/style/crud/classes';
import EditIcon from '../../../../icon/crud/editIcon';

const options = [
    { label: `ID`, value: 'userID' },
    { label: `RUT`, value: 'rut' },
    { label: `Primer Apellido`, value: 'surname1' },
    { label: `Segundo Apellido`, value: 'surname2' },
    { label: `Primer Nombre`, value: 'firstName' },
    { label: `Segundo Nombre`, value: 'secondName' },
    { label: `Email`, value: 'email' },
    { label: `Email Personal`, value: 'personalEmail' },
];

const StudentTable = memo((props) => {
    const { selectedItems, selectAll, setSelectedItems, setSelectAll, onUpdate, onRoleChange } = props;
    const { items, filteredItems } = useSelector((state) => state.handleUser.user);
    const [currentPage, setCurrentPage] = useState(1);

    const currentItems = useMemo(() => {
        const isFiltered = isArray(filteredItems);
        return isFiltered ?
            getCurrentPageItems(ITEMS_PER_PAGE, currentPage, filteredItems) :
            getCurrentPageItems(ITEMS_PER_PAGE, currentPage, items);
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
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status || 'Activo')}`}>
                            {item.status || 'Activo'}
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
                            <StyledButton
                                onClick={() => onRoleChange(item)}
                                className={tbodyContentButton}
                                title="Cambiar Rol"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
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
});

export default StudentTable;