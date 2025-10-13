import React, { useState, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Componentes
import PaginationButtons from '../../../../button/table/paginationButtons';
import TabNavigation from '../../../../tab/tabNavigation'
import StyledButton from '../../../../button/styledButton';
import StyledLinkButton from '../../../../button/variation/StyledLinkButton';
import ReviewCRUD from '../../academic/review/reviewCRUD';
import SimpleTable from '../../../../table/simpleTable';
import TbodyContent from '../../../../table/tableComponent/bodyContent';
import Checkbox from '../../../../input/checkbox';
import { ActionsCell, CheckboxCell, ItemCell } from '../../../../table/tableComponent/tableComponent';

// Utilidades
import { getCurrentPageItemsMultiple } from '../../../../../utils/crudHelpers/paginationHelper';
import { formatDateValue, isArray } from '../../../../../utils/crudHelpers/utils';
import { handleCheckboxChange, handleSelectAllChange } from '../../../../../utils/crudHelpers/handleCheckbox';
import { LateIndicator } from '../../../../shared/lateIndicator';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../../utils/crudHelpers/constants';

//Estilos
import { theadContentTr, theadContentDiv, tbodyContentTr, tbodyContentButton, tbodyContentTd } from '../../../../../utils/style/crud/classes';
import EditIcon from '../../../../icon/crud/editIcon';

const options_evaluationTypeID_1 = [
    { label: `Fecha de Subida`, value: 'creationDate' },
    { label: `Fecha de Actualización`, value: 'updateDate' },
    { label: `Email del Estudiante`, value: 'email' },
    { label: `Linea de Formación`, value: 'specializationName' },
    { label: `Nombre del Evaluador A`, value: 'academicA_fullName' },
    { label: `Evaluación del Evaluador A`, value: 'academicA_status' },
    { label: `Nombre del Evaluador B`, value: 'academicB_fullName' },
    { label: `Evaluación del Evaluador B`, value: 'academicB_status' },
];

const options_evaluationTypeID_2 = [
    { label: `Fecha de Subida`, value: 'creationDate' },
    { label: `Fecha de Actualización`, value: 'updateDate' },
    { label: `Email del Estudiante`, value: 'email' },
    { label: `Linea de Formación`, value: 'specializationName' },
    { label: `Nombre del Evaluador A`, value: 'academicA_fullName' },
    { label: `Nota del Académico A`, value: 'academicA_grade1' },
    { label: `Nombre del Evaluador B`, value: 'academicB_fullName' },
    { label: `Nota del Evaluador B`, value: 'academicB_grade1' },
    { label: `Nombre del Director de Tesis`, value: 'director_fullName' },
    { label: `Nota del Director de Tesis`, value: 'director_grade1' },
    { label: `Nombre del Co-Director de Tesis`, value: 'codirector_fullName' },
    { label: `Nota del Co-Director de Tesis`, value: 'codirector_grade1' },
    { label: `Nombre del Director de Programa`, value: 'programDirector_fullName' },
];

const EvaluatorAssignmentTable = memo((props) => {
    const {
        urls, semester, isLoading, selectedItems, selectAll, currentPage, currentTab, setSelectedItems, setSelectAll, setCurrentPage, setCurrentTab, handleEdit, handleRubricEdit, handleStatusEdit, handleSCoreEdit
    } = props;

    const { items, filteredItems } = useSelector((state) => state.handleSpecialization.administrative.evaluatorAssignment);
    const { evaluationTypeID } = useParams();
    const parsedEvaluationTypeID = parseInt(evaluationTypeID, 10);
    const options = parsedEvaluationTypeID === 1 ? options_evaluationTypeID_1 : options_evaluationTypeID_2;
    const [searchTerm, setSearchTerm2] = useState('');

    const currentItems = useMemo(() => {
        // Usar la función para verificar si filteredItems es un array
        const isFiltered = isArray(filteredItems);
        const searchParamsArray = [{ searchType: 'semesterID', searchTerm: searchTerm }];
        return isFiltered ?
            getCurrentPageItemsMultiple(ITEMS_PER_PAGE, searchParamsArray, currentPage, filteredItems) :
            getCurrentPageItemsMultiple(ITEMS_PER_PAGE, searchParamsArray, currentPage, items);
    }, [filteredItems, searchTerm, currentPage, items]);

    const numberFiltered = useMemo(() => {
        // Usar la función para verificar si filteredItems es un array
        const isFiltered = isArray(filteredItems);
        return isFiltered ? filteredItems.length : items.length;
    }, [filteredItems, items]);

    const theadContent = (
        <>
            <th className='whitespace-nowrap px-4 py-2'>
                <Checkbox id='deleteAllInput' name='deleteAllInput' checked={selectAll} onChange={(event) => handleSelectAllChange(event, setSelectAll, setSelectedItems, items)} />
            </th>
            <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                Nombre del Estudiante
            </th>
            <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                Estado de la Revisión
            </th>
            <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                Asignación de Evaluadores
            </th>
            <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                Asignación de Rúbrica
            </th>
            <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                Acciones
            </th>
            <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                Subido dentro del Plazo de Entrega
            </th>
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
                <tr key={item.evaluationID} className={tbodyContentTr}>
                    <CheckboxCell id={`deleteInput-${item.evaluationID}`} checked={selectedItems.some((selectedItem) => selectedItem.evaluationID === item.evaluationID)} onChange={(e) => handleCheckboxChange(e, setSelectedItems, 'evaluationID', item)} />
                    <ItemCell value={item.fullName} />
                    <ItemCell value={parsedEvaluationTypeID === 1 ? item.preproject_status : item.thesis_status} />
                    <ActionsCell>
                        <div className={tbodyContentButton}>
                            <StyledButton onClick={() => handleEdit(item, 1)} >
                                <EditIcon />
                                {item.academicA_userID ? '' : ''} Evaluador A y B
                            </StyledButton>
                        </div>
                        {parsedEvaluationTypeID === 2 &&
                            (<>
                                <div className={tbodyContentButton}>
                                    <StyledButton onClick={() => handleEdit(item, 2)} >
                                        <EditIcon />
                                        {item.director_userID ? '' : ''} Director
                                    </StyledButton>
                                </div>
                                <div className={tbodyContentButton}>
                                    <StyledButton onClick={() => handleEdit(item, 3)} >
                                        <EditIcon />
                                        {item.codirector_userID ? '' : ''} Co-Director
                                    </StyledButton>
                                </div>
                                <div className={tbodyContentButton}>
                                    <StyledButton onClick={() => handleEdit(item, 4)} >
                                        <EditIcon />
                                        {item.programDirector_userID ? '' : ''} Director de Programa
                                    </StyledButton>
                                </div>
                            </>)
                        }
                    </ActionsCell>
                    <ActionsCell>
                        <div className={tbodyContentButton}>
                            <StyledButton onClick={() => handleRubricEdit(item)} >
                                <EditIcon />
                                {item.rubricID ? 'Modificar' : 'Asignar'} Rúbrica
                            </StyledButton>
                        </div>
                    </ActionsCell>
                    <ActionsCell>
                        {parsedEvaluationTypeID === 1 ?
                            <>
                                <ReviewCRUD url={urls[9]} matchesAcademicA={true} item={item} />
                                <ReviewCRUD url={urls[9]} matchesAcademicA={false} item={item} />
                            </>
                            :
                            <div className={tbodyContentButton}>
                                <StyledLinkButton url={item.projectURL}>
                                    Ver Tesis
                                </StyledLinkButton>
                            </div>
                        }
                        <div className={tbodyContentButton}>
                            <StyledButton onClick={() => handleStatusEdit(item)} >
                                <EditIcon />
                                Modificar Estado
                            </StyledButton>
                        </div>
                        {parsedEvaluationTypeID === 2 &&
                            <div className={tbodyContentButton}>
                                <StyledButton onClick={() => handleSCoreEdit(item)} >
                                    <EditIcon />
                                    Notas Defensa Oral
                                </StyledButton>
                            </div>
                        }
                    </ActionsCell>
                    <ActionsCell>
                        <div className={tbodyContentTd}>
                            <LateIndicator lateMinutes={item.lateMinutes} />
                        </div>
                    </ActionsCell>
                    {options.map((option) => (
                        <ItemCell key={option.value} value={formatDateValue(item[option.value], option.value)} />
                    ))}
                </tr>
            ))}
        </TbodyContent>
    );

    return (
        <>
            <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={numberFiltered} />
            <TabNavigation setSearchTerm={setSearchTerm2} currentTab={currentTab} setCurrentTab={setCurrentTab} items={semester} itemsPerPage={1} />
            <SimpleTable theadContent={theadContent} tbodyContent={tbodyContent} />
        </>
    )
});

export default EvaluatorAssignmentTable;