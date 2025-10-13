import React, { useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

// Componentes
import PaginationButtons from '../../../../button/table/paginationButtons';
import StyledButton from '../../../../button/styledButton';
import EnhancedTable from '../../../../table/enhancedTable';
import TbodyContent from '../../../../table/tableComponent/bodyContent';
import RoleCRUD from '../role/roleCRUD';
import PasswordCRUD from '../password/passwordCRUD';

// Utilidades
import { getCurrentPageItems } from '../../../../../utils/crudHelpers/paginationHelper';
import { handleCheckboxChange, handleSelectAllChange } from '../../../../../utils/crudHelpers/handleCheckbox';
import { ActionsCell, CheckboxCell, ItemCell } from '../../../../table/tableComponent/tableComponent';
import { formatDateValue, isArray } from '../../../../../utils/crudHelpers/utils';

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
    { label: 'Email Personal', value: 'personalEmail' },
    { label: `Sexo`, value: 'sex' },
    { label: `Estado Civil`, value: 'civilStatus' },
    { label: `Fecha de Nacimiento`, value: 'birthday' },
    { label: `Dirección`, value: 'address' },
    { label: `Número de Teléfono`, value: 'phone' },
    { label: `Roles`, value: 'roles' },
];

const optionsRow = [
    { value: 'userID' },
    { value: 'rut' },
    { value: 'surname1' },
    { value: 'surname2' },
    { value: 'firstName' },
    { value: 'secondName' },
    { value: 'email' },
    { value: 'personalEmail' },
    { value: 'sex' },
    { value: 'civilStatus' },
    { value: 'birthday' },
    { value: 'address' },
    { value: 'phone' },
];

const getFormattedRoles = (roles) => {
    // Check if roles is a valid string before splitting
    if (roles && typeof roles === 'string') {
        return roles.split(';').map((role) => role.trim());
    } else {
        return [];
    }
};

const UserTable = memo(({ urls, isLoading, currentPage, selectedItems, selectAll, setCurrentPage, setSelectedItems, setSelectAll, handleFetch, handleEdit }) => {
    const { items, filteredItems } = useSelector((state) => state.handleUser.user);

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
            {options.map((option, index) => (
                <th key={option.value}
                    className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 ${index === 2 ? 'sticky left-0 bg-white' : index === 4 ? 'sticky left-32 bg-white' : ''}`}
                >
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
                <tr key={item.userID} className={tbodyContentTr}>
                    <CheckboxCell id={`deleteInput-${item.userID}`} checked={selectedItems.some((selectedItem) => selectedItem.userID === item.userID)} onChange={(e) => handleCheckboxChange(e, setSelectedItems, 'userID', item)} />

                    {optionsRow.map((option, index) => (
                        <td
                            key={option.value}
                            className={`whitespace-nowrap px-2 py-2 ${index === 2 ? 'group-hover:bg-gray-200 sticky left-0 bg-white' : index === 4 ? 'group-hover:bg-gray-200 sticky left-32 bg-white' : ''}`}
                        >
                            {formatDateValue(item[option.value], option.value)}
                        </td>
                    ))}


                    <td className={tbodyContentTd}>
                        {getFormattedRoles(item.roles).map((role, index) => (
                            <span key={index} className={`mr-1 px-2.5 py-0.5 rounded ${role === 'SuperAdministrator' ? 'bg-blue-200 text-blue-800' : role === 'Administrador' ? 'bg-green-200 text-green-800' : (role === 'Académico' || role == 'AcadÃ©mico') ? 'bg-yellow-200 text-yellow-800' : role === 'Estudiante' ? 'bg-sky-200 text-sky-800' : 'bg-gray-100 text-gray-800'}`} >
                                {role}
                            </span>
                        ))}
                    </td>
                    <ActionsCell>
                        <div className={tbodyContentButton}>
                            <StyledButton onClick={() => handleEdit(item)} >
                                <EditIcon />
                                Actualizar Información
                            </StyledButton>
                        </div>
                        <div className={tbodyContentButton}>
                            <RoleCRUD rolesString={item.roles} rolesIdString={item.rolesID} name={'Roles'} urls={[urls[3]]} userID={item.userID} handleFetchItems={handleFetch} />
                        </div>
                        <div className={tbodyContentButton}>
                            <PasswordCRUD urls={[urls[2]]} id={item.userID} />
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

export default UserTable;