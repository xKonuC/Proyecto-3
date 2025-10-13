import React, { useMemo, memo } from 'react';
import { Link, useLocation } from "react-router-dom";
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
import { theadContentTr, theadContentDiv, tbodyContentTr, tbodyContentTd, tbodyContentButton } from '../../../../../utils/style/crud/classes';
import EditIcon from '../../../../icon/crud/editIcon';
import TitleIcon from '../../../../icon/utils/titleIcon';
import { FaBook, FaChalkboardTeacher, FaLightbulb, FaProjectDiagram, FaFileAlt, FaUserGraduate, FaTasks } from "react-icons/fa";

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
    { label: `Títulos`, value: 'titlesName' },
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

const sectionsData = [
    {
        title: 'Información Académica',
        link: '/Administrative/Administrator/HandleAcademicRecord/AcademicInfo',
        icon: <FaUserGraduate size={20} />,
    },
    {
        title: 'Tesis Dirigidas',
        link: '/Administrative/Administrator/HandleAcademicRecord/GuidedThesis',
        icon: <FaLightbulb size={20} />,
    },
    {
        title: 'Libros y Capitulos de Libro',
        link: '/Administrative/Administrator/HandleAcademicRecord/BookChapter',
        icon: <FaBook size={20} />,
    },
    {
        title: 'Publicaciones',
        link: '/Administrative/Administrator/HandleAcademicRecord/publication',
        icon: <FaTasks size={20} />,
    },
    {
        title: 'Patentes',
        link: '/Administrative/Administrator/HandleAcademicRecord/Patent',
        icon: <FaFileAlt size={20} />,
    },
    {
        title: 'Proyectos',
        link: '/Administrative/Administrator/HandleAcademicRecord/Project',
        icon: <FaProjectDiagram size={20} />,
    },
    {
        title: 'Consultorías y Asistencias',
        link: '/Administrative/Administrator/HandleAcademicRecord/Consultancy',
        icon: <FaChalkboardTeacher size={20} />,
    },
];

const renderTitles = (titlesName) => {
    if (titlesName == null) {
        return null;
    }

    const titlesArray = titlesName.split(';').map((title) => title.trim());

    const groups = [];
    for (let i = 0; i < titlesArray.length; i += 3) {
        groups.push(titlesArray.slice(i, i + 3));
    }

    return groups.map((group, index) => (
        <div key={index} className="flex gap-1.5 whitespace-normal items-center justify-center">
            {group.map((title, index) => (
                <div key={index} className="break-words whitespace-nowrap text-xs font-medium w-max h-max px-2 py-1.5 rounded-lg bg-orange-main text-white mb-1">
                    {title}
                </div>
            ))}
        </div>
    ));
};

const AcademicTable = memo((props) => {
    const { urls, isLoading, currentPage, selectedItems, selectAll, setCurrentPage, setSelectedItems, setSelectAll, handleEdit } = props;
    const { items, filteredItems } = useSelector((state) => state.handleUser.academic);
    const location = useLocation();

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
                        {renderTitles(item.titles)}
                    </td>
                    <ActionsCell>
                        <div className={tbodyContentButton}>
                            <StyledButton onClick={() => handleEdit(item)} >
                                <EditIcon />
                                Actualizar Información
                            </StyledButton>
                        </div>
                        <div className={tbodyContentButton}>
                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                to={`${urls[2]}${item.userID}`}
                            >
                                <StyledButton >
                                    <TitleIcon />
                                    Gestionar Titulación
                                </StyledButton>
                            </Link>
                        </div>
                        {location.pathname.includes('/Administrator/') && (
                            <>
                                {sectionsData.map((section, index) => (
                                    <div key={index} className={tbodyContentButton}>
                                        <Link
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            to={`${section.link}/${item.userID}`}
                                        >
                                            <StyledButton>
                                                {section.icon}
                                                {section.title}
                                            </StyledButton>
                                        </Link>
                                    </div>
                                ))}
                            </>
                        )}
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

export default AcademicTable;